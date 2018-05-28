// ==UserScript==
// @name         Liferay Dark Theme
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  shows how to use babel compiler
// @author       You
// @match        https://www.liferay.com/*
// @match        https://www-uat.liferay.com/*
// @match        https://www-nightly.liferay.com/*
// @grant        GM_addStyle
// ==/UserScript==

;(function launchUserScript() {
	/* inject:js */

	GM_addStyle(`/* inject:css */`)
})()
