import { apiQuery } from 'next-dato-utils/api';
import { NewsDocument, AllNewsDocument } from '@/graphql';
import { Article, BackButton } from '@/components';

export type Props = {
	news: NewsRecord;
};

export default async function News({ params }) {
	const { news: slug } = await params;
	const { news } = await apiQuery(NewsDocument, { variables: { slug } });
	const { intro, title, content, image, city } = news;
	return (
		<>
			<Article title={title} image={image as FileField} intro={intro} content={content} city={city} />
			<BackButton href='/pa-gang'>Visa alla</BackButton>
		</>
	);
}

export async function generateStaticParams() {
	const { allNews } = await apiQuery(AllNewsDocument, { all: true });
	return allNews.map(({ slug: news }) => ({ news }));
}
