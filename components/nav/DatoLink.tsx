import Link from 'next/link';
import config from '@/datocms.config';
import * as changeCase from 'change-case';

export type Props = {
	link: ExternalLinkRecord | InternalLinkRecord;
	titel?: string;
	className?: string;
	children?: React.ReactNode;
};

export default async function DatoLink({ link, className, children }: Props) {
	if (!link) return <a className={className}>{children}</a>;

	const t = link.__typename;
	const slug = t === 'ExternalLinkRecord' ? link.url : await getInteranlRoute(link);
	const title =
		t === 'ExternalLinkRecord'
			? link.title
			: link.record.__typename === 'ParticipantRecord'
				? link.record.name
				: link.record.title;

	if (!slug) return <a className={className}>{children}</a>;

	return link.__typename === 'ExternalLinkRecord' ? (
		<a href={slug} className={className}>
			{children ?? title}
		</a>
	) : (
		<Link href={slug} className={className}>
			{children ?? title}
		</Link>
	);
}

async function getInteranlRoute(link: InternalLinkRecord) {
	const apiKey = changeCase.kebabCase(link.record.__typename.replace('Record', ''));
	console.log(apiKey);
	const route = await config.routes[apiKey]?.(link.record);
	console.log(route);
	return route?.[0];
}
