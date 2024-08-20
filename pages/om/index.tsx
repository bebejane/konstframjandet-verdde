import s from './[about].module.scss'
import withGlobalProps from "/lib/withGlobalProps";
import { apiQuery } from 'dato-nextjs-utils/api';
import { MainAboutDocument } from "/graphql";

export { default } from './[about]'

export const getStaticProps = withGlobalProps({ queries: [] }, async ({ props, revalidate, context }: any) => {

  const { abouts } = await apiQuery(MainAboutDocument, { variables: {}, preview: context.preview })
  const about = abouts[0] ?? null

  if (!about)
    return { notFound: true }

  return {
    props: {
      ...props,
      about,
      page: {
        section: 'about',
        title: about.title,
      } as PageProps
    },
    revalidate
  };
});