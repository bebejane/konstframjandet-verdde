import s from "./index.module.scss";
import withGlobalProps from "/lib/withGlobalProps";
import { AllPartersDocument, AllParticipantsDocument, AllProgramsDocument, AllShortTextsDocument } from "/graphql";
import { CardContainer, Card, Thumbnail, PageHeader } from "/components";
import { useRouter } from "next/router";
import { DatoSEO } from "dato-nextjs-utils/components";
import { pageSlugs } from "/lib/i18n";
import { apiQueryAll } from "dato-nextjs-utils/api";
import { useState } from "react";
import { categories } from '/lib/constant';

export type Props = {
  participants: ParticipantRecord[]
  programs: ProgramRecord[]
  partners: PartnerRecord[]
  posts: (ParticipantRecord | ProgramRecord | PartnerRecord | ShortTextRecord)[]
  general: GeneralRecord
}

export default function WhatWeDo({ posts = [], general }: Props) {

  const { asPath } = useRouter()
  const [filter, setFilter] = useState<string | null>(null)

  return (
    <>
      <DatoSEO title={'Vad vi gör'} />
      <PageHeader header={general.whatSv} headerSmi={general.whatSmi} content={general.whatIntro} />
      <ul className={s.filter}>
        {categories.map(({ id, title, slug, __typename }) =>
          <li
            className={__typename === filter ? s.active : undefined}
            key={slug}
            onClick={() => setFilter(filter === __typename ? null : __typename)}
          >{title}</li>
        )}
      </ul>
      <CardContainer key={`${asPath}-${filter ? JSON.stringify(filter) : ''}`}>
        {posts.filter(item => !filter || item.__typename === filter).map(item =>
          <Card key={item.id}>
            <Thumbnail
              className={item.__typename === 'ShortTextRecord' ? 'textBox' : ''}
              title={item.__typename === 'ParticipantRecord' ? item.name : item.__typename !== 'ShortTextRecord' ? item.title : null}
              category={categories.find(c => c.__typename === item.__typename)?.title}
              date={item.__typename === 'ProgramRecord' ? item.startDate : null}
              image={item.image}
              city={item.__typename === 'PartnerRecord' ? item.city : undefined}
              slug={item.__typename !== 'ShortTextRecord' ? `/vad-vi-gor/${categories.find(c => c.__typename === item.__typename)?.slug}/${item.slug}` : null}
              titleRows={1}
            />
          </Card>
        )}
      </CardContainer>
    </>
  );
}

export const getStaticProps = withGlobalProps({ queries: [] }, async ({ props, revalidate }: any) => {

  const [{ participants }, { programs }, { partners }, { shortTexts }] = await Promise.all([
    apiQueryAll(AllParticipantsDocument),
    apiQueryAll(AllProgramsDocument),
    apiQueryAll(AllPartersDocument),
    apiQueryAll(AllShortTextsDocument)
  ])

  return {
    props: {
      ...props,
      posts: [...participants, ...programs, ...partners, ...shortTexts].sort((a, b) => new Date(b._createdAt).getTime() > new Date(a._createdAt).getTime() ? 1 : -1),
      page: {
        section: 'what',
        slugs: pageSlugs('what')
      } as PageProps
    },
    revalidate
  };
});