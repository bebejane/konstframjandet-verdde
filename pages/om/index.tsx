import s from './index.module.scss'
import withGlobalProps from "/lib/withGlobalProps";
import { apiQueryAll } from 'dato-nextjs-utils/api';
import { AllAboutsDocument, AllAboutShortTextsDocument } from "/graphql";
import { DatoSEO } from 'dato-nextjs-utils/components';
import { Card, CardContainer, PageHeader, Thumbnail } from '../../components';
import { useRouter } from 'next/router';

export type Props = {
  abouts: AboutRecord[]
  general: GeneralRecord
}

export default function Abouts({ abouts, general }: Props) {

  const { asPath } = useRouter()

  return (
    <>
      <DatoSEO title={'Vad vi gör'} />
      <PageHeader header={general.aboutSv} headerSmi={general.aboutSmi} content={general.aboutIntro} />
      <CardContainer key={asPath}>
        {abouts.map(({ id, title, intro, _publishedAt, image, slug }) =>
          <Card key={id} className={s.margin}>
            <Thumbnail
              title={title}
              image={image}
              intro={intro}
              titleRows={1}
              slug={`/om/${slug}`}
            />
          </Card>
        )}
      </CardContainer>
    </>
  );
}

export const getStaticProps = withGlobalProps({ queries: [] }, async ({ props, revalidate, context }: any) => {

  const [{ abouts }, { aboutShortTexts }] = await Promise.all([
    apiQueryAll(AllAboutsDocument, { variables: {}, preview: context.preview }),
    apiQueryAll(AllAboutShortTextsDocument, { variables: {}, preview: context.preview })
  ])

  return {
    props: {
      ...props,
      abouts: [...abouts, ...aboutShortTexts].sort((a, b) => new Date(b._createdAt).getTime() > new Date(a._createdAt).getTime() ? 1 : -1),
      page: {
        section: 'about',
        title: 'Detta är Verdde',
      } as PageProps
    },
    revalidate
  };
});