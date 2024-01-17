import Markdown from 'react-markdown';

const ArticleParagraph = ({ paragraph }) => {
	return <Markdown className='copy article-paragraph'>{paragraph.paragraph}</Markdown>;
};

export default ArticleParagraph;
