import initTranslator from '$lib/utils/translation';

export const prerender = true;

export const load = () => {
	initTranslator();
};
