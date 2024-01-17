import { formatDate } from '@/utils/strapi.utils';
import Link from 'next/link';

const BlogPreviewItem = ({ article }) => {
	const { headline, featuredImage, publishedAt, slug } = article;
	return (
		<Link href={`/blog/${slug}`} className='blog-preview__item'>
			<div className='blog-preview__image'>
				<img src={featuredImage} alt='' />
			</div>
			<h5 className='blog-preview__title'>{headline}</h5>
			<p className='copy-small'>{formatDate(publishedAt)}</p>
		</Link>
	);
};

export default BlogPreviewItem;
