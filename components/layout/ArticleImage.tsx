'use client';

import s from './ArticleImage.module.scss';
import cn from 'classnames';
import React, { useEffect, useRef } from 'react';
import { Image } from 'react-datocms';
import useStore from '@/lib/store';

export type ArticleImageProps = {
	image?: FileField;
	imageSize?: 'small' | 'medium' | 'large';
	content?: any;
};

export default function ArticleImage({ image, imageSize, content }: ArticleImageProps) {
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
		</>
	);
}
