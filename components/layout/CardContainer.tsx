'use client';

import React from 'react';
import dynamic from 'next/dynamic';

const ResponsiveMasonry = dynamic(() => import('react-responsive-masonry').then((mod) => mod.ResponsiveMasonry), {
	loading: () => <></>,
	ssr: false,
});
const Masonry = dynamic(() => import('react-responsive-masonry').then((mod) => mod.default), {
	loading: () => <></>,
	ssr: false,
});

export type Props = {
	children?: React.ReactNode | React.ReactNode[];
	className?: string;
};

export default function CardContainer({ children, className }: Props) {
	return (
		<ResponsiveMasonry columnsCountBreakPoints={{ 320: 1, 980: 3 }}>
			<Masonry>{children}</Masonry>
		</ResponsiveMasonry>
	);
}
