import s from './CardContainer.module.scss';
import cn from 'classnames';
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
	columns?: 2 | 3;
	className?: string;
	hideLastOnDesktop?: boolean;
	hideLastOnMobile?: boolean;
};

export default function CardContainer({ children, className }: Props) {
	const cards = Array.isArray(children) ? children : [children];

	return (
		<ResponsiveMasonry className={cn(s.masonry, className)} columnsCountBreakPoints={{ 320: 1, 980: 3 }}>
			<Masonry>{cards}</Masonry>
		</ResponsiveMasonry>
	);
}
