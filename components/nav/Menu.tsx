'use client';

import s from './Menu.module.scss';
import cn from 'classnames';
import { usePathname } from 'next/navigation';
import { useState, useRef, useEffect } from 'react';
import type { Menu, MenuItem } from '@/lib/menu';
import Link from 'next/link';

export type MenuProps = { items: Menu };

export default function MenuMobile({ items }: MenuProps) {
	const pathname = usePathname();
	const menuRef = useRef<HTMLUListElement | null>(null);
	const [selected, setSelected] = useState<MenuItem | undefined>();

	useEffect(() => {
		// Find selected item from pathname recursively
		const findSelected = (path: string, item: MenuItem): MenuItem | undefined => {
			if (item.slug === path) return item;
			if (item.sub?.length) {
				for (let i = 0; i < item.sub.length; i++) {
					const selected = findSelected(path, item.sub[i]);
					if (selected) return selected;
				}
			}
		};
		for (let i = 0; i < items.length; i++) {
			const selected = findSelected(pathname, items[i]);
			if (selected) {
				return setSelected(selected);
			}
		}
	}, [pathname]);

	return (
		<>
			<nav className={s.menu}>
				<Link href={'/'}>
					<img className={s.logo} src='/images/logo.png' />
				</Link>
				<ul ref={menuRef}>
					{items.slice(1).map((item, idx) => (
						<li key={idx}>
							<Link
								href={item.slug}
								className={cn(
									(item.slug !== '/' && pathname.startsWith(item.slug)) || (pathname === '/' && item.slug === '/')
										? s.active
										: null
								)}
							>
								<span>{item.altLabel}</span>
								<br />
								{item.label}
							</Link>
						</li>
					))}
				</ul>
				<div className={s.lang}>
					<Link href={'/om/in-english-verdde'}>EN</Link>
					<Link href={'/om/samegillii-verdde'}>Sá</Link>
				</div>
			</nav>
		</>
	);
}
