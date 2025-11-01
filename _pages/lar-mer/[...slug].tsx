import { apiQuery } from 'next-dato-utils/api';
import { LearnMoreDocument, AllLearnMoreDocument } from '@/graphql';
import { Article, BackButton, Content, Related, Content } from '@/components';
import { DatoSEO } from 'next-dato-utils/components';
import { pageSlugs } from '@/lib/i18n';
import { categories } from '@/lib/constant';
import s from './[...slug].module.scss';

export type Props = {
	post: LearnMoreRecord;
};

export default function WhatWeDo({ post }: Props) {
	const { __typename, id, intro, name, content, image, _seoMetaTags } = post;

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
				category={categories.find((c) => c.__typename === __typename)?.id}
				onClick={(imageId) => {}}
			></Article>
			<BackButton href='/lar-mer'>Visa alla</BackButton>
		</>
	);
}

export async function generateStaticParams() {
	const { learns } = await apiQuery(AllLearnMoreDocument);
	const paths = learns.map(({ slug, __typename }) => ({
		params: { slug: [slug] },
	}));

	return {
		paths,
		fallback: 'blocking',
	};
}

export const getStaticProps = withGlobalProps({ queries: [] }, async ({ props, revalidate, context }: any) => {
	const slug = context.params.slug[0];
	console.log(context.params.slug);
	const { learnMore } = await apiQuery(LearnMoreDocument, { variables: { slug }, preview: context.preview });

	if (!learnMore) return { notFound: true };

	return {
		props: {
			...props,
			post: learnMore,
			page: {
				section: 'learnMore',
				parent: true,
				title: learnMore.name,
				slugs: pageSlugs('learnMore'),
			} as PageProps,
		},
		revalidate,
	};
});
