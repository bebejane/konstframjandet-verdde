'use client';

import { StructuredContent } from 'next-dato-utils/components';
import * as Blocks from './blocks/index';

export type Props = {
	id?: string;
	content: any;
	styles?: any;
	className?: string;
	blocks?: any;
	onClick?: (id: string) => void;
	options?: {
		unwrapParagraphs?: boolean;
	};
};

export default function Content({ content, styles, blocks, className, onClick, options = {} }: Props) {
	if (!content) return null;
	return (
		<StructuredContent
			blocks={{ ...Blocks, ...blocks }}
			className={className}
			styles={{ ...styles }}
			content={content}
			options={options}
		/>
	);
}
