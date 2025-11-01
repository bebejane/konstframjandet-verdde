import s from './page.module.scss';

import { apiQuery } from 'next-dato-utils/api';
import { AllAboutsDocument, AllAboutShortTextsDocument } from '@/graphql';
import { DatoSEO } from 'next-dato-utils/components';
import { Card, CardContainer, PageHeader, Thumbnail } from '../..@/components';
import { usePathname } from 'next/navigation';

export type Props = {
	abouts: (AboutRecord | AboutShortTextRecord)[];
	general: GeneralRecord;
};

export default function Abouts({ abouts, general }: Props) {
	const pathname = usePathname();

	return (
		<>
			<DatoSEO title={'Vad vi gör'} />
			<PageHeader header={general.aboutSv} headerSmi={general.aboutSmi} content={general.aboutIntro} />
			<CardContainer key={pathname}>
				{abouts.map((item) => (
					<Card key={item.id} className={s.margin}>
						<Thumbnail
							className={item.__typename === 'AboutShortTextRecord' ? 'textBox' : ''}
							title={item.__typename === 'AboutRecord' ? item.title : null}
							image={item.image}
							intro={item.__typename === 'AboutRecord' ? item.intro : null}
							slug={`/om/${item.__typename === 'AboutRecord' ? item.slug : null}`}
							titleRows={1}
						/>
					</Card>
				))}
			</CardContainer>
		</>
	);
}

export const getStaticProps = withGlobalProps({ queries: [] }, async ({ props, revalidate, context }: any) => {
	const [{ abouts }, { aboutShortTexts }] = await Promise.all([
		apiQuery(AllAboutsDocument, { variables: {}, preview: context.preview }),
		apiQuery(AllAboutShortTextsDocument, { variables: {}, preview: context.preview }),
	]);

	return {
		props: {
			...props,
			abouts: [...abouts, ...aboutShortTexts].sort((a, b) =>
				new Date(b._createdAt).getTime() > new Date(a._createdAt).getTime() ? 1 : -1
			),
			page: {
				section: 'about',
				title: 'Detta är Verdde',
			} as PageProps,
		},
		revalidate,
	};
});
