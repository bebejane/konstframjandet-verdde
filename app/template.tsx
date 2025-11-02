'use client';

import useStore from '@/lib/store';
import s from './template.module.scss';
import cn from 'classnames';
import { usePathname } from 'next/navigation';
import { useEffect } from 'react';

export default function Template({ children }: { children: React.ReactNode }) {
	const pathname = usePathname();
	const [showMenu] = useStore((state) => [state.showMenu]);

	useEffect(() => {
		// Preload background images
		const sectionIds = ['om', 'kontakt', 'pa-gang', 'vad-vi-gor', 'lar-mer'];
		sectionIds.forEach((sectionId) => {
			const img = new Image();
			img.src = `${process.env.NEXT_PUBLIC_SITE_URL}/images/sections/${sectionId}.svg`;
			img.onload = () => {};
		});
	}, []);

	useEffect(() => {
		const sectionId = pathname.split('/')?.[1];
		document.body.style.backgroundImage = sectionId ? `url(/images/sections/${sectionId}.svg)` : 'none';
	}, [pathname]);

	//

	return (
		<main id='content' className={cn(s.main, !showMenu && s.full)}>
			<article>{children}</article>
		</main>
	);
}
