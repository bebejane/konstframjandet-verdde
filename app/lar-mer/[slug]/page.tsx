import { apiQuery } from 'next-dato-utils/api';
import { LearnMoreDocument, AllLearnMoreDocument } from '@/graphql';
import { Article, BackButton } from '@/components';

export default async function WhatWeDo({ params }) {
	const { slug } = await params;
	const { learnMore } = await apiQuery(LearnMoreDocument, { variables: { slug } });
	const { intro, name, content, image } = learnMore;
	return (
		<>
			<Article title={name} image={image as FileField} intro={intro} content={content} />
			<BackButton href='/lar-mer'>Visa alla</BackButton>
		</>
	);
}

export async function generateStaticParams() {
	const { allLearnMores } = await apiQuery(AllLearnMoreDocument, { all: true });
	return allLearnMores.map(({ slug }) => ({ slug }));
}
