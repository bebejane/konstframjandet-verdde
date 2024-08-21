type SiteLocale = 'sv'

type PageSlug = {
  value: string
  parent: string

}

type PageProps = {
  title?: string
  isHome: boolean
  slugs?: PageSlugs[]
  section: SectionId
  parent?: boolean
  overview?: string
  general?: GeneralRecord
}

type YearExtendedRecord = YearRecord & {
  isArchive: boolean
}

type SectionId = 'home' | 'contact' | 'what' | 'news' | 'about' | 'search'

type ThumbnailImage = {
  thumb: FileField
}

type Messages = typeof import('../lib/i18n/en.json');
declare interface IntlMessages extends Messages { }


