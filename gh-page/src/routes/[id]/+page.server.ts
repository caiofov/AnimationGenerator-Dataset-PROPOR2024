import { readFileSync, readdirSync } from 'fs';
import type { PageServerLoad } from './$types';

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

	return { images };
};
