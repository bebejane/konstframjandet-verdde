'use client';

import s from './MenuMobile.module.scss';
import cn from 'classnames';
import { usePathname } from 'next/navigation';
import { useState, useRef, useEffect } from 'react';
import type { Menu, MenuItem } from '@/lib/menu';
import Link from 'next/link';
import { Hamburger } from '@/components';
import useStore from '@/lib/store';
import { useScrollInfo } from 'next-dato-utils/hooks';
import { useWindowSize } from 'usehooks-ts';
import useDevice from '@/lib/hooks/useDevice';

export type MenuProps = { items: Menu };

export default function MenuMobile({ items }: MenuProps) {
	const pathname = usePathname();
	const menuRef = useRef<HTMLUListElement | null>(null);
	const [showMenu, setShowMenu] = useStore((state) => [state.showMenu, state.setShowMenu]);
	const [selected, setSelected] = useState<MenuItem | undefined>();
	const [footerScrollPosition, setFooterScrollPosition] = useState(0);
	const { scrolledPosition, documentHeight, viewportHeight } = useScrollInfo();
	const { width, height } = useWindowSize();
	const { isDesktop, isMobile } = useDevice();

	useEffect(() => {
		!isDesktop && setShowMenu(false);
	}, [pathname, isDesktop]);

	useEffect(() => {
		const footerHeight = document.getElementById('footer').clientHeight - 1;
		const footerScrollPosition =
			scrolledPosition + viewportHeight < documentHeight - footerHeight
				? 0
				: footerHeight - (documentHeight - (scrolledPosition + viewportHeight));

		setFooterScrollPosition(footerScrollPosition);
	}, [menuRef, selected, scrolledPosition, documentHeight, viewportHeight, width, height, isMobile]);

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
			<Hamburger />
			<div className={s.logo}>
				<Link href={`/`}>
					<img src={'/images/logo.png'} alt={'logo'} />
				</Link>
			</div>
			<nav
				className={cn(s.menu, !showMenu && s.hide)}
				style={{ minHeight: `calc(100vh - ${footerScrollPosition}px - 1px)` }}
			>
				<ul data-level={0} ref={menuRef} style={{ maxHeight: `calc(100vh - 1rem)` }}>
					{items.map((item, idx) => (
						<li
							key={item.id}
							data-parent={item.id}
							className={cn(
								(item.slug !== '/' && pathname.startsWith(item.slug)) || (pathname === '/' && item.slug === '/')
									? s.active
									: null
							)}
						>
							<Link href={item.slug}>
								{item.altLabel}
								{item.label !== item.altLabel && (
									<>
										<br />
										<span>{item.label}</span>
									</>
								)}
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
