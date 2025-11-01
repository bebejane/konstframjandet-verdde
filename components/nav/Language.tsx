'use client';

import s from './Language.module.scss';
import cn from 'classnames';
import Link from 'next/link';
import { capitalize } from '@/lib/utils';
import { usePathname } from 'next/navigation';
import { Menu } from '@/lib/menu';
import { locales } from '@/lib/i18n';

export type Props = {
	menu: Menu;
};

export default function Language({ menu }: Props) {
	if (locales.length <= 1) return null;
	const locale = 'en';
	const slugs = ['/om/in-english-verdde', '/om/samegillii-verdde'];

	return (
		<nav className={s.language}>
			{/*slugs.map((item, idx) => (
				<Link key={idx} href={item.value} locale={item.locale} className={cn(locale === item.locale && s.selected)}>
					{capitalize(item.locale)}
				</Link>
			))*/}
		</nav>
	);
}
