import React from 'react';
import HighlightArticle from '../_components/Blog/HighlightArticle';
import SubscribeToNewsletter from '../_components/Blog/SubscribeToNewsletter';
import FeaturedItems from '../_components/FeaturedItems/FeaturedItems';
import { fetchBlogArticles } from '@/utils/strapi.utils';

const Page = async () => {
	const data = await fetchBlogArticles();

	const highlightArticleData = data.find(article => article.isHighlightArticle) || data[0];
	const featuredArticlesData = data.filter(article => !article.isHighlightArticle);

	return (
		<main className='blog-page'>
			<HighlightArticle data={highlightArticleData} />
			<SubscribeToNewsletter />
			<FeaturedItems items={featuredArticlesData} />
		</main>
	);
};

export default Page;

export const revalidate = 300;
