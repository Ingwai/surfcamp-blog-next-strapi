import { fetchDataFromStrapi, processInfoBlocks } from '@/utils/strapi.utils';
import HeroSection from '../_components/HeroSection';
import InfoBlock from '../_components/InfoBlock';

export default async function Home() {
	const data = await fetchDataFromStrapi('infoblocks-experience?populate=deep');
	const infoBlockData = processInfoBlocks(data);
	const heroHeadline = (
		<>
			<h1>discover.</h1>
			<h1>your.</h1>
			<h1>spirit.</h1>
		</>
	);

	return (
		<main>
			<HeroSection imgSrc='/assets/hero-experience.png' headline={heroHeadline} theme='orange' />
			{infoBlockData.map(data => (
				<InfoBlock key={data.id} data={data} />
			))}
		</main>
	);
}

export const revalidate = 300;
