import { PUBLIC_IGNORE_STORY } from '$env/static/public';
import DatasetItems from '$lib/assets/dataset/dataset.json';
import { groupBy } from '@fxts/core';

type StoryType = 'Ala' | 'ChVe' | 'PePr' | 'PePa' | 'ViTe';
type GeneratorType = 'Bard' | 'ChatGPT' | 'LuzIA';

export interface DatasetItem {
	id: keyof typeof DatasetItems;
	story: StoryType;
	generator: GeneratorType;
	promptNumber: number;
	resultNumber: number;
	prompt: string;
	generatedText: string;
}

export type GroupedGeneratorItems = Record<GeneratorType, DatasetItem[]>;
export type GroupedPromptItems = Record<string, GroupedGeneratorItems>;
export type GroupedStoryItems = Record<StoryType, GroupedPromptItems>; //grouped by prompt (id is prompt number) and generator

export function splitId(id: keyof typeof DatasetItems) {
	const [story, generator, prompt, result] = id.split('_');

	return {
		story,
		generator: generator.replace('g', ''),
		promptNumber: Number(prompt.replace('p', '')),
		resultNumber: Number(result.replace('p', ''))
	};
}

export function getDataset() {
	const dataset: DatasetItem[] = [];
	for (const [id, content] of Object.entries(DatasetItems)) {
		if (id.startsWith(PUBLIC_IGNORE_STORY)) continue;
		dataset.push({
			id,
			...content,
			...splitId(id)
		});
	}

	return dataset;
}

export function getGroupedDataset() {
	const groupedByStory: Record<StoryType, DatasetItem[]> = groupBy((i) => i.story, getDataset());
	const storyOrganized: GroupedStoryItems = {};

	for (const [story, items] of Object.entries(groupedByStory)) {
		const groupedByPrompt = groupBy((i) => i.promptNumber, items);
		const promptOrganized: Record<string, Record<GeneratorType, DatasetItem[]>> = {};

		for (const [prompt, pItems] of Object.entries(groupedByPrompt)) {
			const groupedByGenerator = groupBy((i) => i.generator, pItems);
			promptOrganized[prompt] = groupedByGenerator;
		}

		storyOrganized[story] = promptOrganized;
	}

	return storyOrganized;
}
