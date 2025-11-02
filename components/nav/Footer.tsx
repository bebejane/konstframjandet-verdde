'use client';

import s from './Footer.module.scss';
import cn from 'classnames';
import type { MenuItem } from '@/lib/menu';
import { usePathname } from 'next/navigation';
import Link from 'next/link';

export type FooterProps = {
	menu: MenuItem[];
	footer: FooterQuery['footer'];
};

export default function Footer({}: FooterProps) {
	const isHome = usePathname() === '/';

	return (
		<footer className={cn(s.footer, isHome && s.home)} id='footer'>
			<section>
				<div>
					<Link href='https://www.instagram.com/verddekonst/' target='_blank' rel='noopener noreferrer'>
						<img className={s.logo} src='/images/instagram.svg' alt='Instagram' />
					</Link>
					<Link href='https://www.facebook.com/profile.php?id=61556115250072' target='_blank' rel='noopener noreferrer'>
						<img className={s.logo} src='/images/facebook.svg' alt='Facebook' />
					</Link>
				</div>
			</section>
		</footer>
	);
}
