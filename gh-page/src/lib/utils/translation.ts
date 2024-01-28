import en from '../assets/locales/en.json';
import { addMessages, init, locale, getLocaleFromNavigator } from 'svelte-i18n';

const DEFAULT_LOCALE = 'en';
const LOCALES = { en };

export const LOCALE_KEYS = Object.keys(LOCALES);

export function changeLocale(newLocale: string | null = null) {
	locale.set(newLocale ?? getLocaleFromNavigator());
}

export default function initTranslator() {
	init({ initialLocale: getLocaleFromNavigator(), fallbackLocale: DEFAULT_LOCALE });
	for (const [locale, content] of Object.entries(LOCALES)) addMessages(locale, content);
}
