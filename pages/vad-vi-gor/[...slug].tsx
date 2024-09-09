import withGlobalProps from "/lib/withGlobalProps";
import { apiQuery } from 'dato-nextjs-utils/api';
import { apiQueryAll } from '/lib/utils';
import { AllParticipantsDocument, AllPartersDocument, AllProgramsDocument, WhatWeDoDocument } from "/graphql";
import { Article, BackButton, Content, Related, StructuredContent } from '/components';
import { DatoSEO } from "dato-nextjs-utils/components";
import { pageSlugs } from "/lib/i18n";
import { categories } from '/lib/constant';
import s from "./[...slug].module.scss";


export type Props = {
  post: ParticipantRecord | ProgramRecord | PartnerRecord
}

export default function WhatWeDo({ post }: Props) {

  const { __typename, id, intro, content, image, _seoMetaTags } = post
  const title = __typename === 'ParticipantRecord' ? post.name : post.title
  const participants = __typename === 'ProgramRecord' ? post.partipants : []
  const programs = __typename === 'PartnerRecord' ? post._allReferencingPrograms : __typename === 'ParticipantRecord' ? post._allReferencingPrograms : []
  const partners = __typename === 'ProgramRecord' ? post.partner : []

  return (
    <>
      <DatoSEO title={title} description={intro} seo={_seoMetaTags} />
      <Article
        id={id}
        key={id}
        title={title}
        image={image}
        intro={intro}
        content={content}
        category={categories.find(c => c.__typename === __typename)?.id}
        onClick={(imageId) => { }}
      >
        {post.__typename === 'ParticipantRecord' &&
          <div className={s.works}>
            <div class="works small">
              <StructuredContent id={id} record={post} content={post.works} />
            </div>
          </div>
        }
      </Article>
      {participants.length > 0 && <Related header='Utövare' items={participants} />}
      {programs.length > 0 && <Related header='Aktivitet' items={programs} />}
      {partners.length > 0 && <Related header='Samverkan' items={partners} />}

      <BackButton href="/vad-vi-gor">Visa alla</BackButton>
    </>
  );
}

export async function getStaticPaths() {

  const [{ participants }, { programs }, { partners }] = await Promise.all([apiQueryAll(AllParticipantsDocument), apiQueryAll(AllProgramsDocument), apiQueryAll(AllPartersDocument)])
  const paths = [...participants, ...programs, ...partners].map(({ slug, __typename }) => ({
    params: { slug: [categories.find(c => c.__typename === __typename).slug, slug] }
  }))

  return {
    paths,
    fallback: 'blocking'
  }
}

export const getStaticProps = withGlobalProps({ queries: [] }, async ({ props, revalidate, context }: any) => {

  const slug = context.params.slug[1];
  const { program, partner, participant } = await apiQuery(WhatWeDoDocument, { variables: { slug }, preview: context.preview })

  if (!participant && !program && !partner)
    return { notFound: true }

  const post = participant || program || partner


  return {
    props: {
      ...props,
      post,
      page: {
        section: 'what',
        parent: true,
        title: post.title ?? post.name,
        slugs: pageSlugs('what')
      } as PageProps
    },
    revalidate
  };
});
