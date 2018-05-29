// ==UserScript==
// @name         Liferay Dark Theme
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Liferay Admin Dark Theme for 6.2 admin modes and is based on the beautiful dracula color palette: https://draculatheme.com
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
