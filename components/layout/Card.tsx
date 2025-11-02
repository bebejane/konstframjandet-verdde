import s from './Card.module.scss';
import cn from 'classnames';
import React from 'react';

export type CardProps = {
	children: React.ReactNode | React.ReactNode[];
	className?: string;
	textCard?: boolean;
};

export default function Card({ children, className, textCard }: CardProps) {
	return (
		<div className={cn(s.card, className, textCard && s.text)}>
			<div className={s.box}>{children}</div>
		</div>
	);
}
