import s from './page.module.scss';
import {
	AllLearnMoreDocument,
	AllLearnMoreCategoriesDocument,
	AllLearnMoreShortTextsDocument,
	GlobalDocument,
} from '@/graphql';
import { CardContainer, Card, Thumbnail, PageHeader } from '@/components';
import { apiQuery } from 'next-dato-utils/api';
import { loadSearchParams } from './searchParams';
import Link from 'next/link';

export default async function LearnMore({ searchParams }) {
	const { filter } = await loadSearchParams(searchParams);
	const { allLearnMoreCategories } = await apiQuery(AllLearnMoreCategoriesDocument);
	const { allLearnMores } = await apiQuery(AllLearnMoreDocument);
	const { allLearnMoreShortTexts } = await apiQuery(AllLearnMoreShortTextsDocument);
	const { general } = await apiQuery(GlobalDocument);
	const _learns = [...allLearnMores, ...allLearnMoreShortTexts];
	const learns = [...allLearnMores, ...allLearnMoreShortTexts]
		.sort((a, b) => (new Date(b._createdAt).getTime() > new Date(a._createdAt).getTime() ? 1 : -1))
		.filter((item) => !filter || (item.__typename === 'LearnMoreRecord' && item.learnMoreCategory?.id === filter));

	console.log(filter, learns);

	return (
		<>
			<PageHeader header={general.learnMoreSv} headerSmi={general.learnMoreSmi} content={general.learnMoreIntro} />
			<ul className={s.filter}>
				{allLearnMoreCategories.map(({ id, title }) => (
					<li className={id === filter ? s.active : undefined} key={id}>
						<Link href={`/lar-mer${id !== filter ? `?filter=${id}` : ''}`}>{title}</Link>
					</li>
				))}
			</ul>
			<CardContainer key={filter}>
				{learns.map((item) => (
					<Card key={item.id}>
						<Thumbnail
							className={item.__typename === 'LearnMoreShortTextRecord' ? 'textBox' : ''}
							title={item.__typename === 'LearnMoreRecord' ? item.name : null}
							category={
								item.__typename === 'LearnMoreRecord'
									? allLearnMoreCategories.find((c) => c.id === item.learnMoreCategory?.id)?.title
									: null
							}
							image={item.image as FileField}
							slug={`/lar-mer/${item.__typename === 'LearnMoreRecord' ? item.slug : null}`}
						/>
					</Card>
				))}
			</CardContainer>
		</>
	);
}
