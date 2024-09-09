import s from './MenuMobile.module.scss'
import cn from 'classnames'
import { useRouter } from 'next/router'
import { useState, useRef, useEffect } from 'react'
import type { Menu, MenuItem } from '/lib/menu'
import Link from 'next/link'
import { Hamburger } from '/components'
import useStore from '/lib/store'
import { useScrollInfo } from 'dato-nextjs-utils/hooks'
import { useWindowSize } from 'usehooks-ts'
import i18nPaths from '/lib/i18n/paths.json'
import useDevice from '/lib/hooks/useDevice'

export type MenuProps = { items: Menu }

export default function MenuMobile({ items }: MenuProps) {

	const router = useRouter()
	const { locale, defaultLocale, asPath } = router
	const menuRef = useRef<HTMLUListElement | null>(null);
	const [showMenu, setShowMenu, searchQuery, setSearchQuery] = useStore((state) => [state.showMenu, state.setShowMenu, state.searchQuery, state.setSearchQuery])
	const [selected, setSelected] = useState<MenuItem | undefined>()
	const [searchFocus, setSearchFocus] = useState(false)
	const [path, setPath] = useState(router.asPath)
	const [menuPadding, setMenuPadding] = useState(0)
	const [footerScrollPosition, setFooterScrollPosition] = useState(0)
	const { scrolledPosition, documentHeight, viewportHeight } = useScrollInfo()
	const { width, height } = useWindowSize()
	const { isDesktop, isMobile } = useDevice()

	const onSubmitSearch = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()

		const segment = i18nPaths['search'][locale];
		const path = `/${locale === defaultLocale ? segment : `${locale}/${segment}`}`
		router.push(path, undefined, { shallow: true, scroll: true })
		setSearchFocus(false)

	}

	useEffect(() => {
		const handleRouteChangeStart = (path: string) => {
			setPath(path)
			!isDesktop && setShowMenu(false)
		}
		router.events.on('routeChangeStart', handleRouteChangeStart)
		return () => router.events.off('routeChangeStart', handleRouteChangeStart)
	}, [isDesktop])

	useEffect(() => {

		const footerHeight = document.getElementById('footer').clientHeight - 1
		const menuOffset = menuRef.current.offsetTop
		const footerScrollPosition = (scrolledPosition + viewportHeight) < documentHeight - footerHeight ? 0 : footerHeight - (documentHeight - (scrolledPosition + viewportHeight))
		const menuPadding = isMobile ? (menuOffset + footerScrollPosition) : footerScrollPosition ? menuOffset + footerScrollPosition : 0

		//setMenuPadding(menuPadding)
		setFooterScrollPosition(footerScrollPosition)

	}, [menuRef, selected, scrolledPosition, documentHeight, viewportHeight, width, height, isMobile])

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
			<Hamburger />
			<Link href={`/`} className={s.logo}>
				<img src={'/images/logo.png'} alt={'logo'} />
			</Link>
			<nav
				className={cn(s.menu, !showMenu && s.hide)}
				style={{ minHeight: `calc(100vh - ${footerScrollPosition}px - 1px)` }}
			>
				<ul
					data-level={0}
					ref={menuRef}
					style={{ maxHeight: `calc(100vh - ${menuPadding}px - 1rem)` }}
				>
					{items.map((item, idx) =>
						<li
							key={item.id}
							data-parent={item.id}
							className={cn((item.slug !== '/' && asPath.startsWith(item.slug)) || asPath === '/' && item.slug === '/' ? s.active : null)}
						>
							<Link href={item.slug}>
								{item.altLabel}
								{item.label !== item.altLabel &&
									<><br /><span>{item.label}</span></>
								}
							</Link>
						</li>
					)}
				</ul>
			</nav>
		</>
	)
}
