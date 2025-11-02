'use client';

import s from './Menu.module.scss';
import cn from 'classnames';
import { usePathname } from 'next/navigation';
import type { Menu } from '@/lib/menu';
import Link from 'next/link';

export type MenuProps = { items: Menu };

export default function Menu({ items }: MenuProps) {
	const pathname = usePathname();

	return (
		<>
			<nav className={s.menu}>
				<Link href={'/'}>
					<img className={s.logo} src='/images/logo.png' />
				</Link>
				<ul>
					{items.slice(1).map((item, idx) => (
						<li key={idx}>
							{item.slug && (
								<Link
									href={item.slug}
									prefetch={true}
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
							)}
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
