'use client';

import s from './Image.module.scss';
import cn from 'classnames';
import React from 'react';
import { SRCImage } from 'react-datocms';
import { Markdown } from 'next-dato-utils/components';
import useStore from '@/lib/store';

export type ImageBlockProps = {
	id: string;
	data: ImageRecord;
};

export default function Image({ data: { image, layout } }: ImageBlockProps) {
	const [setImageId] = useStore((state) => [state.setImageId]);
	return (
		<figure
			className={cn(s.figure, s[layout], image.height > image.width && s.portrait)}
			onClick={() => setImageId(image.id)}
		>
			<SRCImage data={image.responsiveImage} imgClassName={s.image} />
			{image.title && (
				<figcaption>
					<Markdown allowedElements={['em', 'p']} content={image.title} />
				</figcaption>
			)}
		</figure>
	);
}
