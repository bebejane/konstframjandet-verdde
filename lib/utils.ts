export const randomInt = (min, max) => {
	min = Math.ceil(min);
	max = Math.floor(max);
	return Math.floor(Math.random() * (max - min + 1)) + min;
};

export const truncateWords = (text: string, minLength: number): string => {
	if (text.length <= minLength) {
		return text;
	}
	var truncatedText = text.substr(0, minLength);
	var lastSpaceIndex = truncatedText.lastIndexOf(' ');
	if (lastSpaceIndex !== -1) {
		truncatedText = truncatedText.substr(0, lastSpaceIndex);
	}
	return truncatedText + '...';
};
