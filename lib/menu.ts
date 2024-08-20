import { apiQuery } from 'dato-nextjs-utils/api';
import { MenuDocument } from "/graphql";

const base: Menu = [
  { id: 'home', label: 'Hem', slug: '/', general: true },
  { id: 'what', label: 'Vad vi gör', slug: '/vad-vi-gor' },
  { id: 'about', label: 'Detta är Verdde', slug: '/om', virtual: true, sub: [] },
  { id: 'news', label: 'På gång', slug: '/pa-gang', virtual: true, sub: [] },
  { id: 'contact', label: 'Kontakt', slug: '/kontakt', general: true }
]

export const buildMenu = async () => {

  const res = await apiQuery(MenuDocument)

  base.forEach((item, idx) => {
    base[idx].altLabel = res.general[`${item.id}Smi`] ?? item.label
  })

  const menu = base.map(item => {
    let sub: MenuItem[];

    switch (item.id) {
      case 'about':
        //@ts-ignore
        sub = res.abouts.map(el => ({
          id: `about-${el.slug}`,
          label: el.title,
          slug: `/om/${el.slug}`
        }))
        if (res.abouts.length) {
          item.slug = `/om/${res.abouts[0].slug}`
        }
        break;
      default:
        break;
    }
    return {
      ...item,
      sub: sub || item.sub || null,
      count: res[`${item.id}Meta`]?.count ?? null
    }
  })

  return menu.filter(({ count }) => count || count === null);

}


export type Menu = MenuItem[]
export type MenuQueryResponse = {
  abouts: (AboutRecord & { altSlug: string })[]
  aboutMeta: { count: number }
  tipsMeta: { count: number }
  youthsMeta: { count: number }
}

export type MenuItem = {
  id: SectionId
  label: string
  altLabel?: string
  slug?: string
  sub?: MenuItem[]
  count?: number
  general?: boolean
  virtual?: boolean
}
