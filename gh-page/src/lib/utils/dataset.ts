import { PUBLIC_IGNORE_STORY } from '$env/static/public';
import DatasetItems from '$lib/assets/dataset/dataset.json';

export interface DatasetItem {
	id: keyof typeof DatasetItems;
	story: string;
	generator: number;
	promptNumber: number;
	resultNumber: number;
	prompt: string;
	generated_text: string;
}

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
