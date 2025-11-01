import s from './page.module.scss';

import {
	AllPartersDocument,
	AllParticipantsDocument,
	AllProgramsDocument,
	AllShortTextsDocument,
	GlobalDocument,
} from '@/graphql';
import { CardContainer, Card, Thumbnail, PageHeader } from '@/components';
import { apiQuery } from 'next-dato-utils/api';
import { categories } from '@/lib/constant';
import { loadSearchParams } from './searchParams';
import Link from 'next/link';

export default async function WhatWeDo({ searchParams }) {
	const { filter } = await loadSearchParams(searchParams);
	const [{ allParticipants }, { allPrograms }, { allPartners }, { allShortTexts }, { general }] = await Promise.all([
		apiQuery(AllParticipantsDocument, { all: true }),
		apiQuery(AllProgramsDocument, { all: true }),
		apiQuery(AllPartersDocument, { all: true }),
		apiQuery(AllShortTextsDocument, { all: true }),
		apiQuery(GlobalDocument),
	]);

	const posts = [...allParticipants, ...allPrograms, ...allPartners, ...allShortTexts].sort((a, b) =>
		new Date(b._createdAt).getTime() > new Date(a._createdAt).getTime() ? 1 : -1
	);

	return (
		<>
			<PageHeader header={general.whatSv} headerSmi={general.whatSmi} content={general.whatIntro} />
			<ul className={s.filter}>
				{categories.map(({ id, title, slug, __typename }) => (
					<li className={__typename === filter ? s.active : undefined} key={slug}>
						<Link href={`/vad-vi-gor${id !== filter ? `?filter=${id}` : ''}`}>{title}</Link>
					</li>
				))}
			</ul>
			<CardContainer key={filter}>
				{posts
					.filter((item) => !filter || item.__typename === filter)
					.map((item) => (
						<Card key={item.id}>
							<Thumbnail
								className={item.__typename === 'ShortTextRecord' ? 'textBox' : ''}
								title={
									item.__typename === 'ParticipantRecord'
										? item.name
										: item.__typename !== 'ShortTextRecord'
											? item.title
											: null
								}
								category={categories.find((c) => c.__typename === item.__typename)?.title}
								date={item.__typename === 'ProgramRecord' ? item.startDate : null}
								image={item.image as FileField}
								city={item.__typename === 'PartnerRecord' ? item.city : undefined}
								slug={
									item.__typename !== 'ShortTextRecord'
										? `/vad-vi-gor/${categories.find((c) => c.__typename === item.__typename)?.slug}/${item.slug}`
										: null
								}
								titleRows={1}
							/>
						</Card>
					))}
			</CardContainer>
		</>
	);
}
