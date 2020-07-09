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
 | - .js-click-to-copy
 |  The js-click-to-copy is the classname which is targeted on the element
 |  that can be clicked.
 | - data-click-to-copy attribute
 |  The attribute which contains the data to copy. The object consist out of:
 |
 |	{
 |		data: 'actual data to copy',
 |		backgroundColor: 'optional -> background-color for the messages',
 |		additionalCSS: 'optional -> CSS class name, for positioning the copySucceedMessages'
 |	}
 |
 | HTML EXAMPLE:
 | <div class="js-click-to-copy" data-click-to-copy="#AABBCC">
 | </div>
 |
 |*/

import forEach from 'lodash/forEach';
import isElement from 'lodash/isElement';
import merge from 'lodash/merge';

import { copyTextToClipboard } from '4-utilities/copy-to-clipboard';

const moduleName = 'click-to-copy',
	attributeNames = {
		dataClickToCopy: 'data-click-to-copy'
	},
	CSSClasses = {
		fadeOut: 'fade-out',
		hidden: 'hidden',
		colorContent: 'c-color-tile__color-content'
	},
	selectors = {
		base: `.js-${moduleName}`,
	},
	propertyNames = {
		baseElement: Symbol('baseElement'),
		copySucceedElement: Symbol('copySucceedElement'),
	},
	defaultConfig = {
		silentCopy: false,
		copySucceedMessages: 'Copied!',
	};

function bindEvents() {
	this[propertyNames.baseElement].addEventListener(
		'click',
		handleOnclick.bind(this)
	);
}

function createCopyMessageElement() {
	this[propertyNames.copySucceedElement] = document.createElement('span');
	this[propertyNames.copySucceedElement].innerText = this.config.copySucceedMessages;
	this[propertyNames.copySucceedElement].className = CSSClasses.hidden;
	this[propertyNames.copySucceedElement].addEventListener('animationend', onAnimationEnd.bind(this));
	this[propertyNames.baseElement].appendChild(this[propertyNames.copySucceedElement]);

	if(this.copyProperties.additionalCSS) {
		this[propertyNames.copySucceedElement].classList.add(this.copyProperties.additionalCSS);
	}

	if(this.copyProperties.backgroundColor) {
		this[propertyNames.copySucceedElement].style.backgroundColor = this.copyProperties.backgroundColor;
	}
}

async function handleOnclick(event) {
	if (event.currentTarget === this[propertyNames.baseElement]) {
		if (await copyTextToClipboard(this.dataToCopy) && !this.config.silentCopy) {
			showCopySucceedElement.call(this);
		}
	}
}

function onAnimationEnd() {
	this[propertyNames.copySucceedElement].classList.add(CSSClasses.hidden);
}

function setup() {
	if (!this.config.silentCopy) {
		createCopyMessageElement.call(this);
	}

	bindEvents.call(this);
}

function showCopySucceedElement() {
	this[propertyNames.copySucceedElement].classList.add(CSSClasses.fadeOut);
	this[propertyNames.copySucceedElement].classList.remove(CSSClasses.hidden);
}

export class ClickToCopy {
	constructor(baseElement, config = {}) {
		if (!isElement(baseElement)) {
			throw `Unable to create instance of '${moduleName}', no base element has been provided.`;
		}
		this[propertyNames.baseElement] = baseElement;

		this.copyProperties = JSON.parse(this[propertyNames.baseElement].getAttribute(attributeNames.dataClickToCopy));
		this.dataToCopy = this.copyProperties.data;
		if(!this.dataToCopy) {
			throw `Unable to create instance of '${moduleName}', there is no data provided to copy.`;
		}
		this.config = merge({}, defaultConfig, config);
		setup.call(this);
	}
}

const initClickToCopy = (
	elements = document.querySelectorAll(selectors.base)
) => {
	forEach(elements, (element) => new ClickToCopy(element));
};

initClickToCopy();
