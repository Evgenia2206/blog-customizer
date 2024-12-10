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
	ArticleStateType,
	OptionType,
} from 'src/constants/articleProps';

import styles from './ArticleParamsForm.module.scss';
import { useState, SyntheticEvent, useRef, useEffect } from 'react';
import clsx from 'clsx';

interface IArticleParamsForm {
	applyingSettings: (settings: ArticleStateType) => void;
}

export const ArticleParamsForm = ({ applyingSettings }: IArticleParamsForm) => {
	const [articleSettings, setArticleSettings] = useState(defaultArticleState);
	const handleOnChange = (field: keyof ArticleStateType) => {
		return (value: OptionType) => {
			setArticleSettings((prevState) => ({ ...prevState, [field]: value }));
		};
	};

	const [isSidebarOpen, setIsSidebarOpen] = useState(false);
	const sidebarRef = useRef<HTMLElement>(null);

	const arrowClickHandle = () => {
		setIsSidebarOpen(!isSidebarOpen);
	};

	function applyBtnHandle(e: SyntheticEvent) {
		e.preventDefault();
		applyingSettings(articleSettings);
	}

	function resetBtnHandle() {
		setArticleSettings(defaultArticleState);
		applyingSettings(articleSettings);
	}

	useEffect(() => {
		const overlayClickHandle = (event: MouseEvent) => {
			if (
				sidebarRef.current &&
				!sidebarRef.current.contains(event.target as Node)
			) {
				setIsSidebarOpen(false);
			}
		};
		if (isSidebarOpen) {
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
			<ArrowButton isOpen={isSidebarOpen} onClick={arrowClickHandle} />
			<aside
				ref={sidebarRef}
				className={`${clsx(styles.container)} ${
					isSidebarOpen && styles.container_open
				}`}>
				<form className={clsx(styles.form)} onSubmit={applyBtnHandle}>
					<Text as={'h1'} weight={800} size={31} uppercase={true}>
						Задайте параметры
					</Text>
					<Select
						title={'шрифт'}
						onChange={handleOnChange('fontFamilyOption')}
						selected={articleSettings.fontFamilyOption}
						options={fontFamilyOptions}
					/>
					<RadioGroup
						title='Размер шрифта'
						name={articleSettings.fontSizeOption.value}
						onChange={handleOnChange('fontSizeOption')}
						selected={articleSettings.fontSizeOption}
						options={fontSizeOptions}
					/>
					<Select
						title='Цвет шрифта'
						onChange={handleOnChange('fontColor')}
						selected={articleSettings.fontColor}
						options={fontColors}
					/>
					<Separator />
					<Select
						title='Цвет фона'
						onChange={handleOnChange('backgroundColor')}
						selected={articleSettings.backgroundColor}
						options={backgroundColors}
					/>
					<Select
						title='Ширина контента'
						onChange={handleOnChange('contentWidth')}
						selected={articleSettings.contentWidth}
						options={contentWidthArr}
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
