import s from 'index.module.scss'
import withGlobalProps from "/lib/withGlobalProps";
import { apiQueryAll } from 'dato-nextjs-utils/api';
import { AllAboutsDocument, MainAboutDocument } from "/graphql";
import { DatoSEO } from 'dato-nextjs-utils/components';
import { Card, CardContainer, PageHeader, Thumbnail } from '../../components';
import { useRouter } from 'next/router';
import { useState } from 'react';

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
          <Card key={id}>
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

  const { abouts } = await apiQueryAll(AllAboutsDocument, { variables: {}, preview: context.preview })

  return {
    props: {
      ...props,
      abouts,
      page: {
        section: 'about',
        title: 'Detta är Verdde',
      } as PageProps
    },
    revalidate
  };
});