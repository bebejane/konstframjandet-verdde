import { apiQuery } from 'next-dato-utils/api';
import { AboutDocument, AllAboutsDocument } from '@/graphql';
import { Article, BackButton } from '@/components';

export type Props = {
	about: AboutRecord;
};

export default async function AboutItem({ params }) {
	const { about: slug } = await params;
	const { about } = await apiQuery(AboutDocument, { variables: { slug } });
	const { intro, title, content, image } = about;

	return (
		<>
			<Article title={title} image={image as FileField} intro={intro} content={content} />
			<BackButton href='/om'>Visa alla</BackButton>
		</>
	);
}

export async function generateStaticParams() {
	const { allAbouts } = await apiQuery(AllAboutsDocument);
	return allAbouts.map(({ slug: about }) => ({ about }));
}
