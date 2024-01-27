import { readdirSync } from 'fs';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params }) => {
	return { avaibleImages: readdirSync(`src/lib/assets/dataset/frames/`) };
};
