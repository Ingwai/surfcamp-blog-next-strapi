import SignupForm from '@/app/_components/Events/SignupForm';
import FeaturedItems from '@/app/_components/FeaturedItems/FeaturedItems';
import { fetchAllEvents, fetchDataFromStrapi, fetchIndividualEvent } from '@/utils/strapi.utils';
import Markdown from 'react-markdown';

const Page = async ({ params }) => {
	const { eventId } = params;
	const event = await fetchIndividualEvent(eventId);
	const otherEvents = await fetchAllEvents(eventId);

	const descriptionMarkdown = <Markdown className='copy'>{event.description}</Markdown>;
	const pricing = {
		singlePrice: event.singlePrice,
		sharedPrice: event.sharedPrice,
	};
	return (
		<main className='events-page'>
			<SignupForm
				headline={event.name}
				infoText={descriptionMarkdown}
				buttonLabel='Sign Up'
				pricing={pricing}
				eventId={eventId}
			/>
			<FeaturedItems items={otherEvents} itemType='event' headline='Explore other events' />
		</main>
	);
};

export default Page;

export async function generateStaticParams() {
	try {
		const events = await fetchDataFromStrapi('events');
		const slugs = events.map(event => ({
			eventId: String(event.id),
		}));

		return slugs;
	} catch (error) {
		console.log('Error fetching slugs for events', error);
	}
}

export const revalidate = 300;
