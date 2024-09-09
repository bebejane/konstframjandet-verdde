import s from "./index.module.scss";
import withGlobalProps from "/lib/withGlobalProps";
import { AllNewsDocument } from "/graphql";
import { DatoSEO } from "dato-nextjs-utils/components";
import { pageSlugs } from "/lib/i18n";
import { Card, CardContainer, PageHeader, Thumbnail } from "/components";
import { useRouter } from "next/router";
import { apiQueryAll } from "dato-nextjs-utils/api";

export type Props = {
  news: (NewsRecord & ThumbnailImage)[]
  general: GeneralRecord
}

export default function News({ news, general }: Props) {

  const { asPath } = useRouter()

  return (
    <>
      <DatoSEO title={'Vad vi gör'} />
      <PageHeader header={general.newsSv} headerSmi={general.newsSmi} content={general.newsIntro} />
      <CardContainer key={asPath}>
        {news.map(({ id, title, _publishedAt, image, slug, intro, city }) =>
          <Card key={id}>
            <Thumbnail
              title={title}
              image={image}
              city={city}
              date={_publishedAt}
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

  return {
    props: {
      ...props,
      news,
      page: {
        section: 'news',
        slugs: pageSlugs('news')
      } as PageProps
    },
    revalidate
  }
});