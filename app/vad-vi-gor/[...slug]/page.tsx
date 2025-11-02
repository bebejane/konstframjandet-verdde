import s from './page.module.scss';
import { apiQuery } from 'next-dato-utils/api';
import { AllParticipantsDocument, AllPartnersDocument, AllProgramsDocument, WhatWeDoDocument } from '@/graphql';
import { Article, BackButton, Related, Content } from '@/components';
import { categories } from '@/lib/constant';
import { notFound } from 'next/navigation';
import { RelatedItem } from '@/components/common/Related';

export default async function WhatWeDo({ params }) {
	const {
		slug: [category, slug],
	} = await params;
	const { program, partner, participant } = await apiQuery(WhatWeDoDocument, {
		variables: { slug },
	});

	if (!participant && !program && !partner) return notFound();

	const post = participant || program || partner;
	const { __typename, id, intro, content, image, _seoMetaTags } = post;
	const title = __typename === 'ParticipantRecord' ? post.name : post.title;
	const participants = __typename === 'ProgramRecord' ? post.partipants : [];
	const programs =
		__typename === 'PartnerRecord'
			? post._allReferencingPrograms
			: __typename === 'ParticipantRecord'
				? post._allReferencingPrograms
				: [];

	const partners = __typename === 'ProgramRecord' ? post.partner : [];

	return (
		<>
			<Article key={id} title={title} image={image as FileField} intro={intro} content={content}>
				{post.__typename === 'ParticipantRecord' && (
					<div className={s.works}>
						<div className='works small'>
							<Content id={id} content={post.works} />
						</div>
					</div>
				)}
			</Article>
			{participants.length > 0 && <Related header='Utövare' items={participants as RelatedItem[]} />}
			{programs.length > 0 && <Related header='Aktivitet' items={programs as RelatedItem[]} />}
			{partners.length > 0 && <Related header='Samverkan' items={partners as RelatedItem[]} />}
			<BackButton href='/vad-vi-gor'>Visa alla</BackButton>
		</>
	);
}

export async function generateStaticParams() {
	const [{ allParticipants }, { allPrograms }, { allPartners }] = await Promise.all([
		apiQuery(AllParticipantsDocument, { all: true }),
		apiQuery(AllProgramsDocument, { all: true }),
		apiQuery(AllPartnersDocument, { all: true }),
	]);

	return [...allParticipants, ...allPrograms, ...allPartners].map(({ slug, __typename }) => ({
		slug: [categories.find((c) => c.__typename === __typename).slug, slug],
	}));
}
