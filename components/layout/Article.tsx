'use client';

import s from './Article.module.scss';
import cn from 'classnames';
import React, { useEffect, useRef } from 'react';
import { Content } from '@/components';
import { Image } from 'react-datocms';
import useStore from '@/lib/store';
import { Markdown } from 'next-dato-utils/components';
import BalanceText from 'react-balance-text';
import { format } from 'date-fns';

export type ArticleProps = {
	children?: React.ReactNode | React.ReactNode[] | undefined;
	title?: string;
	city?: string;
	subtitle?: string;
	intro?: string;
	image?: FileField;
	imageSize?: 'small' | 'medium' | 'large';
	content?: any;
	record?: any;
	date?: string;
};

export default function Article({ children, title, city, content, image, imageSize, intro, date }: ArticleProps) {
	const [setImageId, setImages] = useStore((state) => [state.setImageId, state.setImages]);
	const captionRef = useRef<HTMLElement | null>(null);
	const figureRef = useRef<HTMLElement | null>(null);

	useEffect(() => {
		const images = [image];
		content?.blocks.forEach((el) => {
			el.__typename === 'ImageRecord' && images.push(el.image);
			el.__typename === 'ImageGalleryRecord' && images.push.apply(images, el.images);
		});
		setImages(images.filter((el) => el));
	}, []);

	return (
		<>
			<div className={cn(s.article, 'article', !title && s.noTitle)}>
				{title && (
					<h1>
						<BalanceText>{title}</BalanceText>
					</h1>
				)}
				{image?.responsiveImage && (
					<figure
						className={cn(s.mainImage, imageSize && s[imageSize], image.height > image.width && s.portrait)}
						onClick={() => setImageId(image?.id)}
						ref={figureRef}
					>
						<Image data={image.responsiveImage} className={s.picture} />
						<figcaption ref={captionRef}>{image.title}</figcaption>
					</figure>
				)}

				<section className='intro'>
					{date && (
						<div className={s.date}>
							<span className='small'>{format(new Date(date), 'MMM').replace('.', '')}</span>
							<span>{format(new Date(date), 'dd').replace('.', '')}</span>
						</div>
					)}
					{city && <div className={s.city}>{city}</div>}
					<Markdown className={s.intro} content={intro} />
				</section>

				{content && (
					<>
						<div className={cn('structured')}>
							<Content content={content} onClick={(imageId) => setImageId(imageId)} />
						</div>
					</>
				)}
				{children}
			</div>
		</>
	);
}
