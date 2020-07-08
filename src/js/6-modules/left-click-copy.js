/*
 |------------------------------------------------------------------------------
 | LEFT CLICK COPY
 |------------------------------------------------------------------------------
 |
 | This module provides the vistor to copy data from a attribute with left click
 | of the mouse.
 |
 | ---------------------------------------------------------------------------
 |
 | CONFIGURATION:
 | - .js-left-click-copy
 |  The js-left-click-copy is the classname which is targeted on the element
 |  that can be clicked.
 | - data-left-click-copy attribute
 |  The attribute which contains the data to copy.
 |
 | HTML EXAMPLE:
 | <div class="js-left-click-copy" data-left-click-copy="#AABBCC">
 | </div>
 |
 |*/

import forEach from 'lodash/forEach';
import isElement from 'lodash/isElement';
import merge from 'lodash/merge';

import { copyTextToClipboard } from '4-utilities/copy-to-clipboard';

const moduleName = 'left-click-copy',
	attributeNames = {
		dataLeftClickCopy: 'data-left-click-copy',
	},
	selectors = {
		base: `.js-${moduleName}`,
	},
	propertyNames = {
		baseElement: Symbol('baseElement'),
	},
	defaultConfig = {};

function bindEvents() {
	this[propertyNames.baseElement].addEventListener(
		'click',
		handleOnclick.bind(this)
	);
}

function handleOnclick(event) {
	if (event.currentTarget === this[propertyNames.baseElement]) {
		console.log('handleOnClick');
		if(copyTextToClipboard(this.dataToCopy)){
			console.log(`copied '${this.dataToCopy}' to clipboard`);
		}
	}
}

function init() {
	if (!this.dataToCopy) {
		return;
	}

	bindEvents.call(this);
}

export class LeftClickCopy {
	constructor(baseElement, config = {}) {
		if (!isElement(baseElement)) {
			throw `Unable to create instance of ${moduleName} , no base element has been provided.`;
		}
		this[propertyNames.baseElement] = baseElement;
		this.dataToCopy = this[propertyNames.baseElement].getAttribute(
			attributeNames.dataLeftClickCopy
		);
		this.config = merge({}, defaultConfig, config);

		init.call(this);
	}
}

const initLeftClickCopy = (
	elements = document.querySelectorAll(selectors.base)
) => {
	forEach(elements, (element) => new LeftClickCopy(element));
};

initLeftClickCopy();
