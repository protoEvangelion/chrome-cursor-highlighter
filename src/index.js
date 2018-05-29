const doc = document

const query = window.location.search

function isInAdminMode(string) {
	return query.includes(string)
}

const adminModes = ['edit_template', 'edit_article']

if (adminModes.some(isInAdminMode)) {
	console.log('adminMode')

	doc.querySelector('html').classList.add('admin-mode')

	const adminForm = doc.querySelector('.form-navigator')

	if (adminForm) {
		const footer = doc.getElementById('footer')
		console.log('footer', footer)

		const toolbar = doc.createElement('div')
		const scrollBottomBtn = doc.createElement('button')
		const scrollTopBtn = doc.createElement('button')

		scrollBottomBtn.classList.add('btn', 'go-to-bottom')
		scrollBottomBtn.innerText = '⬇'
		scrollBottomBtn.addEventListener('click', () => window.scrollTo(0, doc.body.scrollHeight))
		scrollBottomBtn.setAttribute('type', 'button')

		scrollTopBtn.classList.add('btn', 'go-to-top')
		scrollTopBtn.innerText = '⬆'
		scrollTopBtn.addEventListener('click', () => (document.documentElement.scrollTop = 0))
		scrollTopBtn.setAttribute('type', 'button')

		doc.querySelector('body').appendChild(toolbar)
		toolbar.appendChild(scrollTopBtn)
		toolbar.appendChild(scrollBottomBtn)
		toolbar.classList.add('super-toolbar')
	}
}
