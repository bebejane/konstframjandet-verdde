import s from "./index.module.scss";
import withGlobalProps from "/lib/withGlobalProps";
import { AllPartersDocument, AllParticipantsDocument, AllProgramsDocument } from "/graphql";
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
  general: GeneralRecord
}

export default function WhatWeDo({ participants = [], programs = [], partners = [], general }: Props) {

  const { asPath } = useRouter()
  const [filter, setFilter] = useState<string | null>(null)
  const posts = [...participants, ...programs, ...partners]

  return (
    <>
      <DatoSEO title={'Vad vi gör'} />
      <PageHeader header={general.whatSv} headerSmi={general.whatSmi} content={general.whatIntro} />
      <ul className={s.filter}>
        {categories.map(({ id, title, slug, __typename }) =>
          <li
            className={__typename === filter && s.active}
            key={slug}
            onClick={() => setFilter(filter === __typename ? null : __typename)}
          >{title}</li>
        )}
      </ul>
      <CardContainer key={`${asPath}-${JSON.stringify(filter)}`}>
        {posts.filter(item => !filter || item.__typename === filter).map(item =>
          <Card key={item.id}>
            <Thumbnail
              title={item.__typename === 'ParticipantRecord' ? item.name : item.title}
              category={categories.find(c => c.__typename === item.__typename)?.title}
              date={item.__typename === 'ProgramRecord' ? item.startDate : undefined}
              image={item.image}
              titleRows={1}
              city={item.__typename === 'PartnerRecord' ? item.city : undefined}
              slug={`/vad-vi-gor/${categories.find(c => c.__typename === item.__typename).slug}/${item.slug}`}
            />
          </Card>
        )}
      </CardContainer>
    </>
  );
}

export const getStaticProps = withGlobalProps({ queries: [] }, async ({ props, revalidate }: any) => {

  const [{ participants }, { programs }, { partners }] = await Promise.all([apiQueryAll(AllParticipantsDocument), apiQueryAll(AllProgramsDocument), apiQueryAll(AllPartersDocument)])

  return {
    props: {
      ...props,
      participants,
      programs,
      partners,
      page: {
        section: 'what',
        slugs: pageSlugs('what')
      } as PageProps
    },
    revalidate
  };
});