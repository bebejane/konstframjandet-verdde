import withGlobalProps from "/lib/withGlobalProps";
import { ContactDocument } from "/graphql";
import { Article, PageHeader } from "/components";
import { apiQuery } from "dato-nextjs-utils/api";
import { pageSlugs } from "/lib/i18n";
import { DatoSEO } from "dato-nextjs-utils/components";

export type Props = {
  contact: ContactRecord
  general: GeneralRecord
}

export default function Contact({ contact: { id, title, image, intro, content, _seoMetaTags }, general }: Props) {

  return (
    <>
      <DatoSEO title={title} description={intro} seo={_seoMetaTags} />
      <PageHeader header={general.contactSv} headerSmi={general.contactSmi} content={intro} />
      <Article
        id={id}
        key={id}
        image={image}
        imageSize="small"
        content={content}
        onClick={(imageId) => { }}
      />
    </>
  );
}

export const getStaticProps = withGlobalProps({ queries: [] }, async ({ props, revalidate, context }: any) => {
  const { contact } = await apiQuery(ContactDocument, { variables: { locale: context.locale } })

  return {
    props: {
      ...props,
      contact,
      page: {
        section: 'contact',
        slugs: pageSlugs('contact')
      } as PageProps
    },
    revalidate
  };
});