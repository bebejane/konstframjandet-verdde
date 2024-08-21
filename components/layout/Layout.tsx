import s from './Layout.module.scss'
import React, { useEffect, useState } from 'react'
import { Content, Footer, Grid, MenuMobile, Menu, FullscreenGallery } from '/components'
import type { MenuItem } from '/lib/menu'
import { buildMenu } from '/lib/menu'
import { useStore } from '/lib/store'
import { useRouter } from 'next/router'

export type LayoutProps = {
	children: React.ReactNode,
	menu: MenuItem[],
	footer: GeneralRecord
	title: string
}

export default function Layout({ children, menu: menuFromProps, footer, title }: LayoutProps) {

	const router = useRouter()
	const [menu, setMenu] = useState(menuFromProps)
	const [images, imageId, setImageId] = useStore((state) => [state.images, state.imageId, state.setImageId])

	useEffect(() => { // Refresh menu on load.
		buildMenu().then(res => setMenu(res)).catch(err => console.error(err))
	}, [])

	useEffect(() => {
		const sectionId = router.asPath.split('/')?.[1]
		document.body.style.backgroundImage = sectionId ? `url(/images/sections/${sectionId}.svg)` : 'none'
	}, [router.asPath])

	if (!menuFromProps || !footer) return null

	return (
		<>
			<div className={s.layout}>
				<Content menu={menu}>
					{children}
				</Content>
			</div>
			<Menu items={menu} />
			<MenuMobile items={menu} />
			<Footer menu={menu} footer={footer} />
			<FullscreenGallery
				index={images?.findIndex((image) => image?.id === imageId)}
				images={images}
				show={imageId !== undefined}
				onClose={() => setImageId(undefined)}
			/>
			<Grid />
		</>
	)
}