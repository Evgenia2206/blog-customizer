import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import { RadioGroup } from 'src/ui/radio-group';
import { Select } from 'src/ui/select';
import { Separator } from 'src/ui/separator';
import { Text } from 'src/ui/text';
import {
	backgroundColors,
	contentWidthArr,
	fontFamilyOptions,
	fontColors,
	fontSizeOptions,
	defaultArticleState,
} from 'src/constants/articleProps';

import styles from './ArticleParamsForm.module.scss';
import { useState, SyntheticEvent, useEffect, useRef } from 'react';

interface IArticleParamsForm {
	applyingSettings: (settings: {
		fontFamily: string;
		fontSize: string;
		fontColor: string;
		containerWidth: string;
		bgColor: string;
	}) => void;
}

export const ArticleParamsForm = ({ applyingSettings }: IArticleParamsForm) => {
	const [articleFont, setFont] = useState(defaultArticleState.fontFamilyOption);
	const [articleFontSize, setFontSize] = useState(
		defaultArticleState.fontSizeOption
	);
	const [articleFontColor, setFontColor] = useState(
		defaultArticleState.fontColor
	);
	const [articleBgColor, setBgColor] = useState(
		defaultArticleState.backgroundColor
	);
	const [articleContainerWidth, setContentainerWidth] = useState(
		defaultArticleState.contentWidth
	);

	const [sidebarOpen, setSidebarOpen] = useState(false);
	const sidebarRef = useRef<HTMLElement>(null);

	const arrowClickHandle = () => {
		setSidebarOpen(!sidebarOpen);
	};

	function applyBtnHandle(e: SyntheticEvent) {
		e.preventDefault();
		applyingSettings({
			fontFamily: articleFont.value,
			fontSize: articleFontSize.value,
			fontColor: articleFontColor.value,
			containerWidth: articleContainerWidth.value,
			bgColor: articleBgColor.value,
		});
	}

	function resetBtnHandle() {
		setFont(defaultArticleState.fontFamilyOption);
		setFontSize(defaultArticleState.fontSizeOption);
		setFontColor(defaultArticleState.fontColor);
		setBgColor(defaultArticleState.backgroundColor);
		setContentainerWidth(defaultArticleState.contentWidth);
		applyingSettings({
			fontFamily: defaultArticleState.fontFamilyOption.value,
			fontSize: defaultArticleState.fontSizeOption.value,
			fontColor: defaultArticleState.fontColor.value,
			containerWidth: defaultArticleState.contentWidth.value,
			bgColor: defaultArticleState.backgroundColor.value,
		});
	}

	const overlayClickHandle = (event: MouseEvent) => {
		if (
			sidebarRef.current &&
			!sidebarRef.current.contains(event.target as Node)
		) {
			setSidebarOpen(false);
		}
	};

	useEffect(() => {
		if (sidebarOpen) {
			document.addEventListener('mousedown', overlayClickHandle);
		} else {
			document.removeEventListener('mousedown', overlayClickHandle);
		}
		return () => {
			document.removeEventListener('mousedown', overlayClickHandle);
		};
	});

	return (
		<>
			<ArrowButton isOpen={sidebarOpen} onClick={arrowClickHandle} />
			<aside
				ref={sidebarRef}
				className={`${styles.container} ${
					sidebarOpen && styles.container_open
				}`}>
				<form className={styles.form} onSubmit={applyBtnHandle}>
					<Text as={'h1'} weight={800} size={31} uppercase={true}>
						Задайте параметры
					</Text>
					<Select
						title='Шрифт'
						options={fontFamilyOptions}
						selected={articleFont}
						onChange={(selected) => setFont(selected)}
					/>
					<RadioGroup
						title='Размер шрифта'
						name='fontSize'
						options={fontSizeOptions}
						selected={articleFontSize}
						onChange={(selected) => setFontSize(selected)}
					/>
					<Select
						title='Цвет шрифта'
						options={fontColors}
						selected={articleFontColor}
						onChange={(selected) => setFontColor(selected)}
					/>
					<Separator />
					<Select
						title='Цвет фона'
						options={backgroundColors}
						selected={articleBgColor}
						onChange={(selected) => setBgColor(selected)}
					/>
					<Select
						title='Ширина контента'
						options={contentWidthArr}
						selected={articleContainerWidth}
						onChange={(selected) => setContentainerWidth(selected)}
					/>
					<div className={styles.bottomContainer}>
						<Button
							title='Сбросить'
							htmlType='reset'
							type='clear'
							onClick={resetBtnHandle}
						/>
						<Button title='Применить' htmlType='submit' type='apply' />
					</div>
				</form>
			</aside>
		</>
	);
};
