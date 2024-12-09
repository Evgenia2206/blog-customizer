import { createRoot } from 'react-dom/client';
import { StrictMode, CSSProperties, useState } from 'react';
import clsx from 'clsx';

import { Article } from './components/article/Article';
import { ArticleParamsForm } from './components/article-params-form/ArticleParamsForm';
import { defaultArticleState } from './constants/articleProps';

import './styles/index.scss';
import styles from './styles/index.module.scss';

const domNode = document.getElementById('root') as HTMLDivElement;
const root = createRoot(domNode);

const App = () => {
	const [settings, setSettings] = useState({
		fontFamily: defaultArticleState.fontFamilyOption.value,
		fontSize: defaultArticleState.fontSizeOption.value,
		fontColor: defaultArticleState.fontColor.value,
		containerWidth: defaultArticleState.contentWidth.value,
		bgColor: defaultArticleState.backgroundColor.value,
	});
	return (
		<main
			className={clsx(styles.main)}
			style={
				{
					'--font-family': settings.fontFamily,
					'--font-size': settings.fontSize,
					'--font-color': settings.fontColor,
					'--container-width': settings.containerWidth,
					'--bg-color': settings.bgColor,
				} as CSSProperties
			}>
			<ArticleParamsForm applyingSettings={setSettings} />
			<Article />
		</main>
	);
};

root.render(
	<StrictMode>
		<App />
	</StrictMode>
);
