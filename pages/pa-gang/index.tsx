import s from "./index.module.scss";
import withGlobalProps from "/lib/withGlobalProps";
import { AllNewsDocument } from "/graphql";
import Link from '/components/nav/Link'
import { DatoMarkdown as Markdown } from "dato-nextjs-utils/components";
import format from "date-fns/format";
import { DatoSEO } from "dato-nextjs-utils/components";
import { pageSlugs } from "/lib/i18n";
import { Button } from "/components";

export type Props = {
  news: (NewsRecord & ThumbnailImage)[]
}

export default function News({ news }: Props) {

  return (
    <>
      <DatoSEO title={'På gång'} />
      <section className={s.news}>
        <ul>
          {news.map(({ id, image, thumb, title, intro, _createdAt, slug }) =>
            <li key={id}>
              <h3 className="small">
                {format(new Date(_createdAt), 'dd MMMM, yyyy')}
              </h3>
              <h1>
                <Link href={`/nyheter/${slug}`} transformHref={false}>
                  {title}
                </Link>
              </h1>
              <div className="intro">
                <Markdown className={s.intro}>
                  {intro}
                </Markdown>
              </div>
              <Link href={`/pa-gang/${slug}`} transformHref={false}>
                <Button>Läs mer</Button>
              </Link>
            </li>
          )}
        </ul>
      </section>
    </>
  )
}

export const getStaticProps = withGlobalProps({ queries: [AllNewsDocument] }, async ({ props, revalidate }: any) => {

  return {
    props: {
      ...props,
      page: {
        section: 'news',
        slugs: pageSlugs('news')
      } as PageProps
    },
    revalidate
  }
});