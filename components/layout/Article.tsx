import s from './Article.module.scss';
import cn from 'classnames';
import { Content } from '@/components';
import { Markdown } from 'next-dato-utils/components';
import { format } from 'date-fns';
import Balancer from 'react-wrap-balancer';
import ArticleImage from './ArticleImage';

export type ArticleProps = {
	children?: React.ReactNode | React.ReactNode[] | undefined;
	title?: string;
	city?: string;
	subtitle?: string;
	intro?: string;
	image?: FileField;
	imageSize?: 'small' | 'medium' | 'large';
	content?: any;
	record?: any;
	date?: string;
};

export default function Article({ children, title, city, content, image, imageSize, intro, date }: ArticleProps) {
	return (
		<>
			<div className={cn(s.article, 'article', !title && s.noTitle)}>
				{title && (
					<h1>
						<Balancer>{title}</Balancer>
					</h1>
				)}
				<ArticleImage image={image} imageSize={imageSize} content={content} />
				<section className='intro'>
					{date && (
						<div className={s.date}>
							<span className='small'>{format(new Date(date), 'MMM').replace('.', '')}</span>
							<span>{format(new Date(date), 'dd').replace('.', '')}</span>
						</div>
					)}
					{city && <div className={s.city}>{city}</div>}
					<Markdown className={s.intro} content={intro} />
				</section>
				{content && (
					<div className={cn('structured')}>
						<Content content={content} />
					</div>
				)}
				{children}
			</div>
		</>
	);
}
