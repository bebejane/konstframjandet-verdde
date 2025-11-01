'use client';

import s from './Sound.module.scss';
import { useRef } from 'react';

export type Props = {
	data: SoundRecord;
};

export default function Sound({ data }: Props) {
	if (!data) return null;

	const { html } = data.data?.oEmbed;

	return <div className={s.sound} dangerouslySetInnerHTML={{ __html: html }} />;
}
