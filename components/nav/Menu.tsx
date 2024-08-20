import s from './Menu.module.scss'
import cn from 'classnames'
import { useRouter } from 'next/router'
import { useState, useRef, useEffect } from 'react'
import type { Menu, MenuItem } from '/lib/menu'
import Link from 'next/link'
import useStore from '/lib/store'
import { useScrollInfo } from 'dato-nextjs-utils/hooks'
import { useWindowSize } from 'usehooks-ts'
import useDevice from '/lib/hooks/useDevice'
import Logo from '../layout/Logo'

export type MenuProps = { items: Menu }

export default function MenuMobile({ items }: MenuProps) {

	const router = useRouter()
	const { locale, defaultLocale, asPath } = router
	const menuRef = useRef<HTMLUListElement | null>(null);
	const [showMenu, setShowMenu, searchQuery, setSearchQuery] = useStore((state) => [state.showMenu, state.setShowMenu, state.searchQuery, state.setSearchQuery])
	const [selected, setSelected] = useState<MenuItem | undefined>()
	const { scrolledPosition, documentHeight, viewportHeight } = useScrollInfo()
	const { width, height } = useWindowSize()
	const { isDesktop, isMobile } = useDevice()

	useEffect(() => {

		// Find selected item from asPath recursively
		const findSelected = (path: string, item: MenuItem): MenuItem | undefined => {
			if (item.slug === path) return item
			if (item.sub?.length) {
				for (let i = 0; i < item.sub.length; i++) {
					const selected = findSelected(path, item.sub[i])
					if (selected) return selected
				}
			}
		}
		for (let i = 0; i < items.length; i++) {
			const selected = findSelected(asPath, items[i]);
			if (selected) {
				return setSelected(selected)
			}
		}

	}, [asPath])

	return (
		<>
			<nav className={s.menu}>
				<img className={s.logo} src="/images/logo.png" />
				<ul ref={menuRef}>
					{items.slice(1).map((item, idx) =>
						<li key={idx}>
							<Link href={item.slug}>
								{item.label}
							</Link>
						</li>
					)}
				</ul>
			</nav>
		</>
	)
}

