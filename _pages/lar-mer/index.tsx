import s from './page.module.scss';

import { AllLearnMoreDocument, AllLearnMoreCategoriesDocument, AllLearnMoreShortTextsDocument } from '@/graphql';
import { CardContainer, Card, Thumbnail, PageHeader } from '@/components';
import { usePathname } from 'next/navigation';
import { DatoSEO } from 'next-dato-utils/components';
import { pageSlugs } from '@/lib/i18n';
import { apiQuery } from 'next-dato-utils/api';
import { useState } from 'react';

export type Props = {
	learns: (LearnMoreRecord | LearnMoreShortTextRecord)[];
	learnMoreCategories: LearnMoreCategoryRecord[];
	general: GeneralRecord;
};

export default function LearnMore({ learns = [], learnMoreCategories, general }: Props) {
	const pathname = usePathname();
	const [filter, setFilter] = useState<string | null>(null);

	return (
		<>
			<DatoSEO title={'Lär mer'} />
			<PageHeader header={general.learnMoreSv} headerSmi={general.learnMoreSmi} content={general.learnMoreIntro} />
			<ul className={s.filter}>
				{learnMoreCategories.map(({ id, title }) => (
					<li
						className={id === filter ? s.active : undefined}
						key={id}
						onClick={() => setFilter(filter === id ? null : id)}
					>
						{title}
					</li>
				))}
			</ul>
			<CardContainer key={`${pathname}-${filter ? JSON.stringify(filter) : ''}`}>
				{learns
					.filter((item) => !filter || (item.__typename === 'LearnMoreRecord' && item.learnMoreCategory?.id === filter))
					.map((item) => (
						<Card key={item.id}>
							<Thumbnail
								className={item.__typename === 'LearnMoreShortTextRecord' ? 'textBox' : ''}
								title={item.__typename === 'LearnMoreRecord' ? item.name : null}
								category={
									item.__typename === 'LearnMoreRecord'
										? learnMoreCategories.find((c) => c.id === item.learnMoreCategory?.id)?.title
										: null
								}
								image={item.image}
								slug={`/lar-mer/${item.__typename === 'LearnMoreRecord' ? item.slug : null}`}
							/>
						</Card>
					))}
			</CardContainer>
		</>
	);
}

export const getStaticProps = withGlobalProps({ queries: [] }, async ({ props, revalidate, context }: any) => {
	const [{ learns }, { learnMoreShortTexts }, { learnMoreCategories }] = await Promise.all([
		apiQuery(AllLearnMoreDocument, { variables: {}, preview: context.preview }),
		apiQuery(AllLearnMoreShortTextsDocument, { variables: {}, preview: context.preview }),
		apiQuery(AllLearnMoreCategoriesDocument),
	]);

	return {
		props: {
			...props,
			learns: [...learns, ...learnMoreShortTexts].sort((a, b) =>
				new Date(b._createdAt).getTime() > new Date(a._createdAt).getTime() ? 1 : -1
			),
			learnMoreCategories,
			page: {
				section: 'learnMore',
				slugs: pageSlugs('learnMore'),
			} as PageProps,
		},
		revalidate,
	};
});
