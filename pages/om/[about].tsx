import s from './[about].module.scss'
import withGlobalProps from "/lib/withGlobalProps";
import { apiQuery } from 'dato-nextjs-utils/api';
import { apiQueryAll } from '/lib/utils';
import { AboutDocument, AllAboutsDocument } from "/graphql";
import { Article } from '/components';
import { DatoSEO } from "dato-nextjs-utils/components";


export type Props = {
  about: AboutRecord
}

export default function AboutItem({ about: { id, image, title, intro, content, _seoMetaTags } }: Props) {

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
      />
    </>
  );
}

export async function getStaticPaths() {
  const { abouts } = await apiQueryAll(AllAboutsDocument)
  const paths = abouts.map(({ slug }) => ({ params: { about: slug } }))

  return {
    paths,
    fallback: 'blocking'
  }
}

//AboutItem.page = { crumbs: [{ slug: 'nyheter', title: 'Nyheter' }], regional: true } as PageProps

export const getStaticProps = withGlobalProps({ queries: [] }, async ({ props, revalidate, context }: any) => {

  const slug = context.params.about;
  const { about } = await apiQuery(AboutDocument, { variables: { slug }, preview: context.preview })

  if (!about)
    return { notFound: true }

  return {
    props: {
      ...props,
      about,
      page: {
        section: 'about',
        parent: false,
        title: about.title,
      } as PageProps
    },
    revalidate
  };
});