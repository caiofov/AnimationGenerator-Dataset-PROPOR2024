import { readFileSync, readdirSync } from 'fs';
import type { PageServerLoad } from './$types';
import { getDataset } from '$lib/utils/dataset';

export const load: PageServerLoad = async ({ params }) => {
	const files = readdirSync(`src/lib/assets/dataset/frames/${params.id}`).sort();
	const images: Record<string, string> = {};
	for (const file of files) {
		images[file] =
			'data:image/png;base64,' +
			readFileSync(`src/lib/assets/dataset/frames/${params.id}/${file}`, {
				encoding: 'base64'
			});
	}

	return { images, item: getDataset().filter(({ id }) => id == params.id)[0] };
};
