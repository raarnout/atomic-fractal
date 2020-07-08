import isUndefined from 'lodash/isUndefined';

/**
 * Returns whether the user agent supports placing data on the clipboard by
 * using the Clipboard API
 *
 * @returns {boolean} True when the Clipboard API is supported; otherwise
 *          the result is false.
 */
const userAgentSupportsNavigatorClipboard = () =>
	!isUndefined(navigator.clipboard);

/**
 * Returns whether the user agent supports placing data on the clipboard by
 * using the clipboardData API.
 *
 * @returns {boolean} True when the clipboardData API is supported; otherwise
 *          the result is false.
 */
const userAgentSupportsSetData = () =>
	window.clipboardData && window.clipboardData.setData;

const copyTextToClipboard = async (text) => {
	try {
		if (userAgentSupportsNavigatorClipboard()) {
			console.log('Clipboard API');
			await navigator.clipboard.writeText(text);
		}

		if (userAgentSupportsSetData()) {
			console.log('clipboardData API');
			window.clipboardData.setData('Text', text);
		}

		return true;
	} catch (err) {
		console.error('Failed to copy text to Clipboard: ', err);
		return false;
	}
};

export { copyTextToClipboard };
