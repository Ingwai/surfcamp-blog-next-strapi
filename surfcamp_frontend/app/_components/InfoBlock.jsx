import { createInfoBlockButton } from '@/utils/strapi.utils';
import ReactMarkdown from 'react-markdown';

const InfoBlock = ({ data }) => {
	const { headline, text, button, showImageRight, imageSrc } = data;
	return (
		<div className={`info ${showImageRight ? 'info--reversed' : ''}`}>
			<img className='info__image' src={imageSrc || '/assets/info-blocks/rectangle.png'} alt='' />
			<div className='info__text'>
				<h2 className='info__headline'>{headline}</h2>
				<ReactMarkdown className='copy'>{text}</ReactMarkdown>
				{button}
			</div>
		</div>
	);
};

export default InfoBlock;