import isUndefined from 'lodash/isUndefined';

/**
 * Returns whether the user agent supports placing data on the clipboard by
 * using the clipboardData API
 *
 * @returns {boolean} True when the navigator API is supported; otherwise
 *          the result is false.
 */
const userAgentSupportsNavigatorClipboard = () =>
	!isUndefined(navigator.clipboard);

const copyTextToClipboard = async (text) => {
	try {
		if (userAgentSupportsNavigatorClipboard()) {
			await navigator.clipboard.writeText(text);
			return true;
		} 
	} catch (err) {
		console.error('Failed to copy text to Clipboard: ', err);
		return false;
	}
};

export {
	copyTextToClipboard
}