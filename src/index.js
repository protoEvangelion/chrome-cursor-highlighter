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
	const doc = document

	const query = window.location.search

	function isInAdminMode(string) {
		return query.includes(string)
	}

	const adminModes = ['edit_template', 'edit_article']

	if (adminModes.some(isInAdminMode)) {
		console.log('adminMode')
		doc.querySelector('html').classList.add('admin-mode')
	}

	const adminForm = doc.querySelector('.form-navigator')

	if (adminForm) {
		const footer = doc.getElementById('footer')
		const toolbar = doc.querySelector('.toolbar')

		if (toolbar) {
			const scrollBottomBtn = doc.createElement('button')
			const scrollTopBtn = doc.createElement('button')

			scrollBottomBtn.classList.add('btn', 'go-to-bottom')
			scrollBottomBtn.innerText = '⬇'
			scrollBottomBtn.addEventListener('click', () => footer.scrollIntoView())
			scrollBottomBtn.setAttribute('type', 'button')

			scrollTopBtn.classList.add('btn', 'go-to-top')
			scrollTopBtn.innerText = '⬆'
			scrollTopBtn.addEventListener('click', () => (document.documentElement.scrollTop = 0))
			scrollTopBtn.setAttribute('type', 'button')

			toolbar.appendChild(scrollTopBtn)
			toolbar.appendChild(scrollBottomBtn)
		}
	}

	GM_addStyle(`
	.admin-mode {
		font-family: 'Source Sans Pro' !important;
		font-size: 14px !important; }
		.admin-mode .button-holder.journal-article-button-row,
		.admin-mode .form-navigator,
		.admin-mode .journal-article-wrapper-content > .toolbar {
		  background: #282a36 !important;
		  border: none !important;
		  position: sticky !important;
		  z-index: 999 !important; }
		.admin-mode .btn {
		  background: #6272a4 !important;
		  border: none !important;
		  color: #f8f8f2 !important;
		  margin: 0 10px !important;
		  padding: 0.5rem 1rem !important;
		  text-shadow: none !important;
		  transform: none !important; }
		.admin-mode .btn-primary {
		  background: #50fa7b !important;
		  color: #44475a !important; }
		.admin-mode .btn-cancel {
		  background: #ff5555 !important; }
		.admin-mode .btn-warning {
		  background: #f1fa8c !important; }
		.admin-mode .button-holder.journal-article-button-row {
		  align-items: center !important;
		  display: flex !important;
		  padding: 0.5rem !important;
		  position: fixed !important;
		  top: -15px !important; }
		  .admin-mode .button-holder.journal-article-button-row .btn {
			margin: 0.5rem !important; }
		.admin-mode .form-navigator {
		  top: 72px !important; }
		  .admin-mode .form-navigator .article-name {
			color: #f8f8f2 !important; }
		  .admin-mode .form-navigator .button-holder {
			position: static !important; }
		  .admin-mode .form-navigator .tab-label {
			color: #8be9fd !important;
			text-shadow: none !important; }
		.admin-mode .journal-article-wrapper-content > .toolbar {
		  margin-left: -20px !important;
		  padding: 20px !important;
		  top: 55px !important; }
		  .admin-mode .journal-article-wrapper-content > .toolbar .go-to-bottom,
		  .admin-mode .journal-article-wrapper-content > .toolbar .go-to-top {
			background: #bd93f9 !important;
			color: #f8f8f2 !important;
			font-weight: 700 !important; }

	`)
})()
