'use client';

import s from './Logo.module.scss';
import cn from 'classnames';
import { usePathname } from 'next/navigation';
import Link from 'next/link';

export default function Logo() {
	const isHome = usePathname() === '/';

	return (
		<div className={cn(s.container, isHome && s.home)}>
			<Link href={'/'}>
				<img src='/images/logo.png'></img>
			</Link>
		</div>
	);
}
