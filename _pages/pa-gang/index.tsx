import { AllNewsDocument, AllShortTextsDocument } from '@/graphql';
import { DatoSEO } from 'next-dato-utils/components';
import { pageSlugs } from '@/lib/i18n';
import { Card, CardContainer, PageHeader, Thumbnail } from '@/components';
import { usePathname } from 'next/navigation';
import { apiQuery } from 'next-dato-utils/api';
import { isSameDay } from 'date-fns';
import s from './page.module.scss';

export type Props = {
	news: (NewsRecord & ThumbnailImage)[];
	pastNews: (NewsRecord & ThumbnailImage)[];
	general: GeneralRecord;
};

export default function News({ news, pastNews, general }: Props) {
	const pathname = usePathname();

	return (
		<>
			<DatoSEO title={'Vad vi gör'} />
			<PageHeader header={general.newsSv} headerSmi={general.newsSmi} content={general.newsIntro} />
			<CardContainer key={`${pathname}-news`}>
				{news.map(({ id, title, date, endDate, image, slug, intro, city }) => (
					<Card key={id}>
						<Thumbnail
							title={title}
							image={image}
							city={city}
							date={date}
							endDate={endDate}
							titleRows={1}
							slug={`/pa-gang/${slug}`}
						/>
					</Card>
				))}
			</CardContainer>

			<h1 className={s.past}>Genomfört</h1>
			<CardContainer key={`${pathname}-past-news`}>
				{pastNews.map(({ id, title, date, endDate, image, slug, city }) => (
					<Card key={id}>
						<Thumbnail
							title={title}
							image={image}
							city={city}
							date={date}
							endDate={endDate}
							titleRows={1}
							slug={`/pa-gang/${slug}`}
						/>
					</Card>
				))}
			</CardContainer>
		</>
	);
}

export const getStaticProps = withGlobalProps({ queries: [] }, async ({ props, revalidate, context }: any) => {
	const { news } = await apiQuery(AllNewsDocument, { variables: {}, preview: context.preview });
	const currentNews = news
		.filter(({ title, date, endDate }) => {
			const t = new Date();
			const s = new Date(date);
			const e = new Date(endDate);
			t.setHours(0, 0, 0, 0);
			s.setHours(0, 0, 0, 0);
			e.setHours(23, 59, 59, 999);
			return endDate ? e >= t : isSameDay(t, s) || s > t;
		})
		.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

	const pastNews = news
		.filter(({ id }) => !currentNews.find(({ id: currentId }) => currentId === id))
		.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

	return {
		props: {
			...props,
			news: currentNews,
			pastNews,
			page: {
				section: 'news',
				slugs: pageSlugs('news'),
			} as PageProps,
		},
		revalidate,
	};
});
