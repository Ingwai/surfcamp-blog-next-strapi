import axios from 'axios';
import Link from 'next/link';
import qs from 'qs';

const BASE_URL = process.env.STRAPI_URL || 'http://127.0.0.1:1337';
// zamiast localhost wpisywać nr portu bo od wersji 18 node nie akceptuje localhosta

export async function fetchDataFromStrapi(route) {
	const url = `${BASE_URL}/api/${route}`;

	try {
		const response = await axios.get(url);
		return response.data.data;
	} catch (err) {
		console.log(err);
		throw new Error(`Could not fetch data from ${url}`);
	}
}

export function processInfoBlocks(data) {
	const infoBlockRaw = data.attributes.info_blocks.data;

	return infoBlockRaw.map(infoBlock => ({
		...infoBlock.attributes,
		imageSrc: BASE_URL + infoBlock.attributes?.image?.data?.attributes?.url,
		id: infoBlock.id,
		button: createInfoBlockButton(infoBlock.attributes.button),
	}));
}

export function createInfoBlockButton(buttonData) {
	if (!buttonData) {
		return null;
	}

	return (
		<Link href={`/${buttonData.slug}`} className={`btn btn--medium btn--${buttonData.colour}`}>
			{buttonData.text}
		</Link>
	);
}

export async function fetchBlogArticles() {
	const blogData = await fetchDataFromStrapi('blog-articles?populate=deep');

	const processedBlogArticles = blogData.map(processBlogArticle);

	processedBlogArticles.sort((a, z) => {
		new Date(z.publishedAt) - new Date(a.publishedAt);
	});
	return processedBlogArticles;
}

function processBlogArticle(article) {
	return {
		...article.attributes,
		id: article.id,
		featuredImage: BASE_URL + article?.attributes?.featuredImage?.data?.attributes?.url,
	};
}

export function formatDate(dateString) {
	const date = new Date(dateString);
	return date.toLocaleDateString('en-Us', {
		day: '2-digit',
		weekday: 'long',
		month: 'long',
		year: 'numeric',
	});
}

export function extractImageUrl(imageData) {
	return BASE_URL + imageData.data[0].attributes?.url;
}

export async function fetchIndividualEvent(eventId) {
	const response = await axios.get(`${BASE_URL}/api/events/${eventId}`);
	return processEventData(response.data.data);
}

function processEventData(event) {
	return {
		...event.attributes,
		image: BASE_URL + event.attributes?.image?.data?.attributes?.url,
		id: event.id,
	};
}

export function generateSignupPayload(formData, eventId) {
	if (!eventId) {
		return {
			data: { ...formData, isGeneralInterest: true },
		};
	} else {
		return {
			data: {
				...formData,
				event: {
					connect: [eventId],
				},
			},
		};
	}
}

function createEventQuery(eventIdToExclude) {
	const queryObject = {
		pagination: {
			start: 0,
			limit: 12,
		},
		sort: ['startingDate:asc'],
		filters: {
			startingDate: {
				$gt: new Date(),
			},
		},
		populate: {
			image: {
				populate: '*',
			},
		},
	};
	if (eventIdToExclude) {
		queryObject.filters.id = {
			$ne: eventIdToExclude,
		};
	}
	return qs.stringify(queryObject, { encodeValuesOnly: true });
}

export async function fetchAllEvents(eventIdToExclude = null) {
	const query = createEventQuery(eventIdToExclude);
	const response = await axios.get(`${BASE_URL}/api/events?${query}`);
	return response.data.data.map(event => processEventData(event));
}
