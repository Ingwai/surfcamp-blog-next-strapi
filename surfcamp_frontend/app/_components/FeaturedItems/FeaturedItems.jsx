'use client';

import React, { useState } from 'react';
import FeaturedArticle from './FeaturedArticle';
import FeaturedEvent from './FeaturedEvent';

const FeaturedItems = ({ headline, items, itemType = 'article' }) => {
	const [itemNumber, setItemNumber] = useState(3);

	const handleShowMore = () => {
		if (itemNumber + 3 > items.length) {
			return setItemNumber(items.length);
		} else {
			return setItemNumber(itemNumber + 3);
		}
	};
	return (
		<section className='featured-items'>
			<h3 className='featured-items__headline'>{headline || 'Our featured articles'}</h3>
			<div className='featured-items__container'>
				{items.slice(0, itemNumber).map(item => {
					if (itemType === 'article') {
						return <FeaturedArticle key={item.slug} article={item} />;
					} else {
						return <FeaturedEvent key={item.id} event={item} />;
					}
				})}
			</div>
			{itemNumber < items.length && (
				<button className='bn btn--medium btn--turquoise' onClick={handleShowMore}>
					See more
				</button>
			)}
		</section>
	);
};

export default FeaturedItems;
