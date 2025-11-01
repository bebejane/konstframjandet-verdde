'use client';

import s from './template.module.scss';
import cn from 'classnames';
import { usePathname } from 'next/navigation';

export default function Template({ children }: { children: React.ReactNode }) {
	const pathname = usePathname();
	return (
		<main id='content' className={cn(s.main, s.full)}>
			<article>{children}</article>
		</main>
	);
}
