import s from './LinkButton.module.scss';
import React from 'react';
import { Button } from '@/components';
import DatoLink from '@/components/nav/DatoLink';

export type LinkButtonBlockProps = { data: LinkButtonRecord; onClick: Function };

export default async function LinkButton({ data: { link } }: LinkButtonBlockProps) {
	const title =
		link.__typename === 'ExternalLinkRecord'
			? link.title
			: link.title || (link.record.__typename === 'ParticipantRecord' ? link.record.name : link.record.title);

	return (
		<DatoLink link={link} className={s.button}>
			<Button>{title}</Button>
		</DatoLink>
	);
}
