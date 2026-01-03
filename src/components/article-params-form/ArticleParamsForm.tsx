import { useState, useRef, useEffect } from 'react';
import clsx from 'clsx';

import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import { Select } from 'src/ui/select';
import { RadioGroup } from 'src/ui/radio-group';
import { Separator } from 'src/ui/separator';
import {
	ArticleStateType,
	fontFamilyOptions,
	fontSizeOptions,
	fontColors,
	backgroundColors,
	contentWidthArr,
} from 'src/constants/articleProps';
import { useOutsideClickClose } from 'src/ui/select/hooks/useOutsideClickClose';

import styles from './ArticleParamsForm.module.scss';

type ArticleParamsFormProps = {
	appliedState: ArticleStateType;
	onApply: (state: ArticleStateType) => void;
	defaultState: ArticleStateType;
};

export const ArticleParamsForm = ({
	appliedState,
	onApply,
	defaultState,
}: ArticleParamsFormProps) => {
	const [isOpen, setIsOpen] = useState(false);
	const [formState, setFormState] = useState<ArticleStateType>(appliedState);
	const sidebarRef = useRef<HTMLDivElement>(null);

	useOutsideClickClose({
		isOpen,
		rootRef: sidebarRef,
		onClose: () => setIsOpen(false),
		onChange: setIsOpen,
	});

	useEffect(() => {
		if (isOpen) {
			setFormState(appliedState);
		}
	}, [isOpen, appliedState]);

	const handleToggle = () => {
		setIsOpen((prev) => !prev);
	};

	const handleApply = (e: React.FormEvent) => {
		e.preventDefault();
		onApply(formState);
		setIsOpen(false);
	};

	const handleReset = () => {
		setFormState(defaultState);
		onApply(defaultState);
		setIsOpen(false);
	};

	const handleFontFamilyChange = (option: (typeof fontFamilyOptions)[0]) => {
		setFormState((prev) => ({
			...prev,
			fontFamilyOption: option,
		}));
	};

	const handleFontSizeChange = (option: (typeof fontSizeOptions)[0]) => {
		setFormState((prev) => ({
			...prev,
			fontSizeOption: option,
		}));
	};

	const handleFontColorChange = (option: (typeof fontColors)[0]) => {
		setFormState((prev) => ({
			...prev,
			fontColor: option,
		}));
	};

	const handleBackgroundColorChange = (
		option: (typeof backgroundColors)[0]
	) => {
		setFormState((prev) => ({
			...prev,
			backgroundColor: option,
		}));
	};

	const handleContentWidthChange = (option: (typeof contentWidthArr)[0]) => {
		setFormState((prev) => ({
			...prev,
			contentWidth: option,
		}));
	};

	return (
		<div ref={sidebarRef}>
			<ArrowButton isOpen={isOpen} onClick={handleToggle} />
			<aside
				className={clsx(styles.container, {
					[styles.container_open]: isOpen,
				})}>
				<form
					className={styles.form}
					onSubmit={handleApply}
					onReset={(e) => {
						e.preventDefault();
						handleReset();
					}}>
					<Select
						selected={formState.fontFamilyOption}
						options={fontFamilyOptions}
						onChange={handleFontFamilyChange}
						title='Шрифт'
					/>
					<Separator />
					<RadioGroup
						name='font-size'
						options={fontSizeOptions}
						selected={formState.fontSizeOption}
						onChange={handleFontSizeChange}
						title='Размер шрифта'
					/>
					<Separator />
					<Select
						selected={formState.fontColor}
						options={fontColors}
						onChange={handleFontColorChange}
						title='Цвет шрифта'
					/>
					<Separator />
					<Select
						selected={formState.backgroundColor}
						options={backgroundColors}
						onChange={handleBackgroundColorChange}
						title='Цвет фона'
					/>
					<Separator />
					<RadioGroup
						name='content-width'
						options={contentWidthArr}
						selected={formState.contentWidth}
						onChange={handleContentWidthChange}
						title='Ширина контента'
					/>
					<div className={styles.bottomContainer}>
						<Button title='Сбросить' htmlType='reset' type='clear' />
						<Button title='Применить' htmlType='submit' type='apply' />
					</div>
				</form>
			</aside>
		</div>
	);
};
