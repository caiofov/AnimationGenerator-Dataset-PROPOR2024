export function concatenateText(text: string, size: number, endChar = '...') {
	if (text.length < size) return text;
	return text.slice(0, size) + endChar;
}
