import s from './Related.module.scss';
import React from 'react';
import { Image } from 'react-datocms';
import Link from 'next/link';
import { recordToSlug } from '@/lib/routes';

export type RelatedItem = ParticipantRecord | PartnerRecord | ProgramRecord;

export type Props = {
	header: string;
	items: RelatedItem[];
};

export default async function Related({ header, items }: Props) {
	console.log(items);
	if (!items?.length) return null;

	return (
		<section className={s.related}>
			<h2>{header}</h2>
			<ul>
				{items.map((item, idx) => (
					<li key={item.id}>
						<Link href={recordToSlug(items[idx])}>
							<figure>
								{item.image && <Image data={item.image.responsiveImage} />}
								<div className={s.border}></div>
							</figure>
							<figcaption>{item.__typename === 'ParticipantRecord' ? item.name : item.title}</figcaption>
						</Link>
					</li>
				))}
			</ul>
		</section>
	);
}
