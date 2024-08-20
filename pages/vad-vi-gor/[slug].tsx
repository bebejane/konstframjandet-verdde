import withGlobalProps from "/lib/withGlobalProps";
import { apiQuery } from 'dato-nextjs-utils/api';
import { apiQueryAll } from '/lib/utils';
import { AllParticipantsDocument, AllPartersDocument, AllProgramsDocument, WhatWeDoDocument } from "/graphql";
import { Article, Related, BackButton } from '/components';
import { DatoSEO } from "dato-nextjs-utils/components";
import { pageSlugs } from "/lib/i18n";

export type Props = {
  post: ParticipantRecord | ProgramRecord | PartnerRecord
}

export default function WhatWeDo({ post }: Props) {
  const { __typename, id, intro, content, image, _seoMetaTags } = post
  const title = __typename === 'ParticipantRecord' ? post.name : post.title
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
        onClick={(imageId) => { }}
      />

      <BackButton>Visa alla</BackButton>
    </>
  );
}

export async function getStaticPaths() {
  const { participants } = await apiQueryAll(AllParticipantsDocument)
  const { programs } = await apiQueryAll(AllProgramsDocument)
  const { partners } = await apiQueryAll(AllPartersDocument)

  const paths = [...participants, ...programs, ...partners].map(({ slug }) => ({ params: { slug } }))

  return {
    paths,
    fallback: 'blocking'
  }
}

export const getStaticProps = withGlobalProps({ queries: [] }, async ({ props, revalidate, context }: any) => {

  const slug = context.params.slug;
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
