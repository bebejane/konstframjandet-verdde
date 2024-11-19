import withGlobalProps from "/lib/withGlobalProps";
import { apiQuery } from 'dato-nextjs-utils/api';
import { apiQueryAll } from '/lib/utils';
import { LearnMoreDocument, AllLearnMoreDocument } from "/graphql";
import { Article, BackButton, Content, Related, StructuredContent } from '/components';
import { DatoSEO } from "dato-nextjs-utils/components";
import { pageSlugs } from "/lib/i18n";
import { categories } from '/lib/constant';
import s from "./[...slug].module.scss";


export type Props = {
  post: LearnMoreRecord
}

export default function WhatWeDo({ post }: Props) {

  const { __typename, id, intro, name, content, image, _seoMetaTags } = post

  return (
    <>
      <DatoSEO title={name} description={intro} seo={_seoMetaTags} />
      <Article
        id={id}
        key={id}
        title={name}
        image={image}
        intro={intro}
        content={content}
        category={categories.find(c => c.__typename === __typename)?.id}
        onClick={(imageId) => { }}
      >
      </Article>
      <BackButton href="/lar-mer">Visa alla</BackButton>
    </>
  );
}

export async function getStaticPaths() {

  const { learns } = await apiQueryAll(AllLearnMoreDocument)
  const paths = learns.map(({ slug, __typename }) => ({
    params: { slug: [slug] }
  }))

  return {
    paths,
    fallback: 'blocking'
  }
}

export const getStaticProps = withGlobalProps({ queries: [] }, async ({ props, revalidate, context }: any) => {

  const slug = context.params.slug[0];
  console.log(context.params.slug)
  const { learnMore } = await apiQuery(LearnMoreDocument, { variables: { slug }, preview: context.preview })

  if (!learnMore)
    return { notFound: true }

  return {
    props: {
      ...props,
      post: learnMore,
      page: {
        section: 'learn-more',
        parent: true,
        title: learnMore.name,
        slugs: pageSlugs('learn-more')
      } as PageProps
    },
    revalidate
  };
});
