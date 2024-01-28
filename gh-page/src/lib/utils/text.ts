export function concatenateText(text: string, size: number | null, endChar = '...') {
	if (size == null || text.length < size) return text;
	return text.slice(0, size) + endChar;
}
