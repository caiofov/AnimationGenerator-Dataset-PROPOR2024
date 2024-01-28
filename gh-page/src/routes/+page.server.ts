import { readdirSync } from 'fs';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params }) => {
	return { availableImages: readdirSync(`src/lib/assets/dataset/frames/`) };
};
