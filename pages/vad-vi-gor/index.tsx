import s from "./index.module.scss";
import withGlobalProps from "/lib/withGlobalProps";
import { AllPartersDocument, AllParticipantsDocument, AllProgramsDocument } from "/graphql";
import { CardContainer, Card, Thumbnail } from "/components";
import { useRouter } from "next/router";
import { DatoSEO } from "dato-nextjs-utils/components";
import { pageSlugs } from "/lib/i18n";
import { apiQueryAll } from "dato-nextjs-utils/api";
import { useState } from "react";

export type Props = {
  participants: ParticipantRecord[]
  programs: ProgramRecord[]
  partners: PartnerRecord[]
}

const categories = [{
  id: 'participants',
  title: 'Utövare',
  slug: 'utovare',
  __typename: 'ParticipantRecord'
}, {
  id: 'programs',
  title: 'Aktivitet',
  slug: 'aktiviteter',
  __typename: 'ProgramRecord'
}, {
  id: 'partners',
  title: 'Samverkan',
  slug: 'samverkan',
  __typename: 'PartnerRecord'
}]


export default function WhatWeDo({ participants = [], programs = [], partners = [] }: Props) {

  const { asPath } = useRouter()
  const [filter, setFilter] = useState({ participants: true, programs: true, partners: true })
  const posts = [...participants, ...programs, ...partners]

  const filterPosts = (post: ParticipantRecord | ProgramRecord | PartnerRecord) => {
    if (post.__typename === 'ParticipantRecord') return filter.participants
    if (post.__typename === 'ProgramRecord') return filter.programs
    if (post.__typename === 'PartnerRecord') return filter.partners
    return false
  }

  return (
    <>
      <DatoSEO title={'Vad vi gör'} />
      <ul className={s.filter}>
        {categories.map(({ id, title, slug }) =>
          <li
            className={filter[id] && s.active}
            key={slug}
            onClick={() => setFilter(f => ({ ...f, [id]: !f[id] }))}
          >{title}</li>
        )}
      </ul>
      <CardContainer key={`${asPath}-${JSON.stringify(filter)}`}>
        {posts.filter(item => filter[categories.find(el => el.__typename === item.__typename)?.id]).map(item =>
          <Card key={item.id}>
            <Thumbnail
              title={item.__typename === 'ParticipantRecord' ? item.name : item.title}
              category={categories.find(c => c.__typename === item.__typename)?.title}
              date={item.__typename === 'ProgramRecord' ? item._publishedAt : undefined}
              image={item.image}
              titleRows={1}
              slug={`/vad-vi-gor/${item.slug}`}
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