import withGlobalProps from "/lib/withGlobalProps";
import { AllNewsDocument, AllShortTextsDocument } from "/graphql";
import { DatoSEO } from "dato-nextjs-utils/components";
import { pageSlugs } from "/lib/i18n";
import { Card, CardContainer, PageHeader, Thumbnail } from "/components";
import { useRouter } from "next/router";
import { apiQueryAll } from "dato-nextjs-utils/api";
import s from "./index.module.scss";


export type Props = {
  news: (NewsRecord & ThumbnailImage)[]
  pastNews: (NewsRecord & ThumbnailImage)[]
  general: GeneralRecord
}

export default function News({ news, pastNews, general }: Props) {

  const { asPath } = useRouter()

  return (
    <>
      <DatoSEO title={'Vad vi gör'} />
      <PageHeader header={general.newsSv} headerSmi={general.newsSmi} content={general.newsIntro} />
      <CardContainer key={asPath}>
        {news.map(({ id, title, date, endDate, image, slug, intro, city }) =>
          <Card key={id}>
            <Thumbnail
              title={title}
              image={image}
              city={city}
              date={date}
              endDate={endDate}
              titleRows={1}
              slug={`/pa-gang/${slug}`}
            />
          </Card>
        )}
      </CardContainer>
      <h1 className={s.past}>Avslutat</h1>
      <CardContainer key={asPath}>
        {pastNews.map(({ id, title, date, endDate, image, slug, city }) =>
          <Card key={id}>
            <Thumbnail
              title={title}
              image={image}
              city={city}
              date={date}
              endDate={endDate}
              titleRows={1}
              slug={`/pa-gang/${slug}`}
            />
          </Card>
        )}
      </CardContainer>
    </>
  );
}

export const getStaticProps = withGlobalProps({ queries: [] }, async ({ props, revalidate, context }: any) => {

  const { news } = await apiQueryAll(AllNewsDocument, { variables: {}, preview: context.preview })
  const currentNews = news.filter(({ date, endDate }) => endDate ? new Date(endDate) >= new Date() : new Date(date) >= new Date())
  const pastNews = news.filter(({ id }) => !currentNews.find(({ id: currentId }) => currentId === id))

  return {
    props: {
      ...props,
      news: currentNews,
      pastNews,
      page: {
        section: 'news',
        slugs: pageSlugs('news')
      } as PageProps
    },
    revalidate
  }
});