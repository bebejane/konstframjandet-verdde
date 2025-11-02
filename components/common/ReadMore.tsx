import s from './ReadMore.module.scss';
import cn from 'classnames';
import Link from 'next/link';

type Props = {
	message?: string;
	link: string;
	invert?: boolean;
	regional?: boolean;
	external?: boolean;
};

export default function ReadMore({ message, link }: Props) {
	if (!link) return null;

	return (
		<Link href={link} className={s.more}>
			{message}
		</Link>
	);
}
