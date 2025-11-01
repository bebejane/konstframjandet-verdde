import { apiQuery } from 'next-dato-utils/api';
import { NewsDocument, AllNewsDocument } from '@/graphql';
import { Article, BackButton } from '@/components';
import { DatoSEO } from 'next-dato-utils/components';
import { pageSlugs } from '@/lib/i18n';

export type Props = {
	news: NewsRecord;
};

export default function News({ news: { id, image, title, intro, city, content, _seoMetaTags } }: Props) {
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
				city={city}
				onClick={(imageId) => {}}
			/>
			<BackButton href='/pa-gang'>Visa alla</BackButton>
		</>
	);
}

export async function generateStaticParams() {
	const { news } = await apiQuery(AllNewsDocument);
	const paths = news.map(({ slug }) => ({ params: { news: slug } }));

	return {
		paths,
		fallback: 'blocking',
	};
}

export const getStaticProps = withGlobalProps({ queries: [] }, async ({ props, revalidate, context }: any) => {
	const slug = context.params.news;
	const { news } = await apiQuery(NewsDocument, {
		variables: { slug, locale: context.locale },
		preview: context.preview,
	});

	if (!news) return { notFound: true };

	return {
		props: {
			...props,
			news,
			page: {
				section: 'news',
				parent: true,
				overview: `/news`,
				title: news.title,
				slugs: pageSlugs('news', news._allSlugLocales),
			} as PageProps,
		},
		revalidate,
	};
});
