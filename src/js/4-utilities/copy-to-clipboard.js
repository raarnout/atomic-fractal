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

/**
 * Returns whether or not the user agent support the queryCommand copy.
 *
 * @returns {boolean} True when the queryCommand copy is supported; otherwise
 *          the result is false.
 */
const userAgentSupportsCopyCommand = () =>
	document.queryCommandSupported &&
	document.queryCommandSupported(copyCommand);

const copyTextToClipboard = async (text) => {
	if (userAgentSupportsNavigatorClipboard()) {
		return await navigatorClipboard(text);
	}

	if (userAgentSupportsSetData()) {
		return await setData(text);
	}

	return false;
};

async function navigatorClipboard(text) {
	try {
		await window.navigator.clipboard.writeText(text);
		return true;
	} catch (error) {
		console.error('failed trying to copy text to clipboard via navigatorClipboard. ', error)
	}
	return false;
}

async function setData(text) {
	try {
		await window.clipboardData.setData('Text', text);
		return true;
	} catch (error) {
		console.error('failed trying to copy text to clipboard via setData. ', error)
	}
	return false;
}


export { copyTextToClipboard };
