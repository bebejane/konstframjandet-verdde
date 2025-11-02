import s from './Thumbnail.module.scss';
import cn from 'classnames';
import React from 'react';
import { Image, SRCImage } from 'react-datocms';
import Link from 'next/link';
import { truncateWords } from '@/lib/utils';
import { format } from 'date-fns';
import { Markdown } from 'next-dato-utils/components';
import Balancer from 'react-wrap-balancer';

export type Props = {
	image?: FileField;
	slug?: string;
	date?: string;
	endDate?: string;
	title?: string;
	intro?: string;
	category?: string | null;
	titleLength?: number;
	titleRows?: number;
	city?: string | null;
	className?: string;
};

export default function Thumbnail({
	image,
	slug,
	title,
	titleLength,
	titleRows = 3,
	category,
	date,
	endDate,
	intro,
	city,
	className,
}: Props) {
	const isTextOnly = !title && !image && !slug;

	const content = (
		<>
			{category && <div className='tag'>{category}</div>}
			{title && (
				<h3>
					<Balancer>{titleLength ? truncateWords(title, titleLength) : title}</Balancer>
				</h3>
			)}
			{date && !endDate && <h4>{format(new Date(date), 'dd MMM yyyy').replaceAll('.', '')}</h4>}
			{date && endDate && (
				<h4>
					{format(new Date(date), 'd MMM').replaceAll('.', '')} —{' '}
					{format(new Date(endDate), 'dd MMM yyyy').replaceAll('.', '')}
				</h4>
			)}
			{city && <h5 className='small'>{city}</h5>}
			{image && (
				<div className={s.imageWrap}>
					{image?.responsiveImage && <SRCImage data={image.responsiveImage} imgClassName={s.image} />}
				</div>
			)}
			{intro && <Markdown className={cn(s.intro, isTextOnly && s.text, isTextOnly && 'headline')} content={intro} />}
		</>
	);

	return slug ? (
		<Link href={slug} className={cn(s.thumbnail, className)}>
			{content}
		</Link>
	) : (
		<div className={cn(s.thumbnail, className)}>{content}</div>
	);
}
