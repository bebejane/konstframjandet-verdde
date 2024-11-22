import s from "./index.module.scss";
import withGlobalProps from "/lib/withGlobalProps";
import { AllLearnMoreDocument, AllLearnMoreCategoriesDocument } from "/graphql";
import { CardContainer, Card, Thumbnail, PageHeader } from "/components";
import { useRouter } from "next/router";
import { DatoSEO } from "dato-nextjs-utils/components";
import { pageSlugs } from "/lib/i18n";
import { apiQueryAll } from "dato-nextjs-utils/api";
import { useState } from "react";

export type Props = {
  learns: LearnMoreRecord[]
  learnMoreCategories: LearnMoreCategoryRecord[]
  general: GeneralRecord
}

export default function LearnMore({ learns = [], learnMoreCategories, general }: Props) {

  const { asPath } = useRouter()
  const [filter, setFilter] = useState<string | null>(null)

  return (
    <>
      <DatoSEO title={'Lär mer'} />
      <PageHeader header={general.learnMoreSv} headerSmi={general.learnMoreSmi} content={general.learnMoreIntro} />
      <ul className={s.filter}>
        {learnMoreCategories.map(({ id, title }) =>
          <li
            className={id === filter ? s.active : undefined}
            key={id}
            onClick={() => setFilter(filter === id ? null : id)}
          >{title}</li>
        )}
      </ul>
      <CardContainer key={`${asPath}-${filter ? JSON.stringify(filter) : ''}`}>
        {learns.filter(item => !filter || item.learnMoreCategory?.id === filter).map(item =>
          <Card key={item.id}>
            <Thumbnail
              title={item.name}
              category={learnMoreCategories.find(c => c.id === item.learnMoreCategory?.id)?.title}
              image={item.image}
              slug={`/lar-mer/${item.slug}`}
            />
          </Card>
        )}
      </CardContainer>
    </>
  );
}

export const getStaticProps = withGlobalProps({ queries: [] }, async ({ props, revalidate }: any) => {

  const { learns } = await apiQueryAll(AllLearnMoreDocument)
  const { learnMoreCategories } = await apiQueryAll(AllLearnMoreCategoriesDocument)

  return {
    props: {
      ...props,
      learns,
      learnMoreCategories,
      page: {
        section: 'learnMore',
        slugs: pageSlugs('learnMore')
      } as PageProps
    },
    revalidate
  };
});