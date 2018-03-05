const agendaNode = document.querySelector('.event-agenda');
const eventAgendaWrapperNode = document.querySelector('#eventAgenda');
const filterJson = JSON.parse(JSON.stringify(window.filterJson));
const sessionNodes = document.querySelectorAll('.event-agenda-session');
const sessionsWrapperNode = document.querySelector('.event-agenda-sessions');

let activeFilters = [];
let filtersVisible = false;

/* ---------- Compact View ---------- */

function toggleCompactFilters() {
	filtersVisible = !filtersVisible;

	agendaNode.classList.toggle('show-compact-filters', filtersVisible);

	if (filtersVisible) {
		sessionsWrapperNode.scrollIntoView();
	}
}

/* ---------- Date Toggling ---------- */

const eventAgendaDateTogglerNode = document.querySelector('#eventAgendaDateToggler');

let activeDateSelectNode = document.querySelector('.event-agenda-date.active');
let activeDayNode = document.querySelector('.event-agenda-day.active');

function toggleActiveDate(e) {
	const currentTarget = e.currentTarget;
	const eventAgendaDateTogglerTextNode = eventAgendaDateTogglerNode.querySelector('span');
	const eventDaySelector = currentTarget.getAttribute('data-event-day');
	const eventDayTab = document.querySelector(eventDaySelector);

	activeDayNode.classList.remove('active');
	activeDayNode.style.display = 'none';
	activeDateSelectNode.classList.remove('active');

	activeDayNode = eventDayTab;
	activeDateSelectNode = e.target;

	currentTarget.classList.add('active');
	e.target.classList.add('active');

	console.log(currentTarget, e.target);

	eventDayTab.style.display = 'block';
	eventDayTab.classList.remove('hide');
	eventDayTab.classList.add('active');

	eventAgendaDateTogglerTextNode.textContent = currentTarget.innerText;
}

/* ---------- Filtering ---------- */

const eventDayNodes = document.querySelectorAll('.event-agenda-day');
const filterNodes = document.querySelectorAll('.event-agenda-filter');
const timeSlotNodes = document.querySelectorAll('.event-agenda-time-slot');

function adjustFilters(event) {
	const checkedArray = [].slice.call(filterNodes).map(function(node) {
		return node.checked;
	});

	if (!checkedArray.includes(true)) {
		clearFilters();

		return;
	}

	timeSlotNodes.forEach(function(node) {
		node.classList.remove('active-filter');
		setDisplay(node, 'none');
	});

	sessionNodes.forEach(function(node) {
		node.classList.remove('active-filter');
		setDisplay(node, 'none');
	});

	const currentTarget = event.currentTarget;
	const targetFilter = currentTarget.getAttribute('data-category-id');

	if (currentTarget.checked) {
		activeFilters.push(targetFilter);
	} else {
		activeFilters.splice(activeFilters.indexOf(targetFilter), 1);
	}

	activeFilters.forEach(function(item) {
		toggleFilter(item);
	});

	eventDayNodes.forEach(function(node) {
		checkEmptyResults(node);
	});

	sessionsWrapperNode.scrollIntoView();
}

function checkEmptyResults(eventDay) {
	const activeFilter = eventDay.querySelector('.active-filter');
	const noResultsNode = eventDay.querySelector('.no-results');

	if (noResultsNode) {
		setDisplay(noResultsNode, 'none');

		if (!activeFilter) {
			setDisplay(noResultsNode, 'block');
		}
	}
}

function clearFilters() {
	const noResultsNodes = document.querySelectorAll('.no-results');

	activeFilters = [];

	filterNodes.forEach(function(node) {
		node.checked = false;
	});

	noResultsNodes.forEach(function(node) {
		setDisplay(node, 'none');
	});

	sessionNodes.forEach(function(node) {
		node.classList.remove('active-filter');
		setDisplay(node, 'flex');
	});

	timeSlotNodes.forEach(function(node) {
		node.classList.remove('active-filter');
		setDisplay(node, 'flex');
	});
}

function setDisplay(node, value) {
	node.style.display = value;
}

function initFilters() {
	const categories = Object.keys(filterJson);

	let filterSelectors;
	let filterSessionNodes;

	categories.forEach(function(category) {
		filterSelectors = filterJson[category];

		filterSessionNodes = filterSelectors.map(selector => document.querySelector(selector));

		filterJson[category] = filterSessionNodes.filter(selector => selector !== null);
	});
}

function toggleFilter(categoryId) {
	const nodes = filterJson[categoryId];

	if (nodes) {
		nodes.forEach(function(node) {
			node.classList.add('active-filter');
			setDisplay(node, 'flex');
		});
	}
}

/* ---------- Handlers ---------- */

function initEventHandlers() {
	filterNodes.forEach(node => node.addEventListener('change', e => adjustFilters(e)));

	const clearFiltersNode = document.querySelector('.event-agenda-filter-reset');

	if (clearFiltersNode) {
		clearFiltersNode.addEventListener('click', clearFilters);
	}

	const dateSelectNodes = document.querySelectorAll('.event-agenda-date');

	dateSelectNodes.forEach(node => node.addEventListener('click', e => toggleActiveDate(e)));

	const toggleFiltersNodes = document.querySelectorAll('.event-agenda-filter-toggler');

	toggleFiltersNodes.forEach(node => node.addEventListener('click', toggleCompactFilters));

	window.addEventListener('load', throttle(headerCollisionDetection, 50));
	window.addEventListener('resize', throttle(headerCollisionDetection, 50));
}

/* ---------- Header Collision ---------- */

const maxWidth = 1250;

let availableSpace;
let compactModeActive = false;
let headerNodesLength;
let headerNodeWidth;
let initialFunctionCall = 0;
let noSpaceLeft;
let spaceNeeded;

function initHeaderCollisionVariables() {
	if (initialFunctionCall < 2) {
		initialFunctionCall++;
	}

	if (initialFunctionCall === 1) {
		headerNodeWidth = document.querySelector('.event-agenda-date').getBoundingClientRect()
			.width;
		headerNodesLength = document.querySelectorAll('.event-agenda-date').length;
		spaceNeeded = headerNodeWidth * headerNodesLength;
	}
}

function headerCollisionDetection() {
	initHeaderCollisionVariables();

	availableSpace = window.innerWidth * 0.75;
	filtersVisible = document.querySelector('.event-agenda-filters').classList.contains('visible');

	if (availableSpace > maxWidth) {
		availableSpace = maxWidth;
	}

	noSpaceLeft = spaceNeeded > availableSpace;

	if (window.innerWidth < 768 || noSpaceLeft) {
		agendaNode.classList.toggle('compact-mode', true);
		compactModeActive = true;
	} else {
		agendaNode.classList.toggle('compact-mode', false);

		compactModeActive = false;
	}
}

/* ---------- Polyfills for IE ---------- */

function initAncestorPolyfill() {
	if (!Element.prototype.matches) {
		Element.prototype.matches =
			Element.prototype.msMatchesSelector || Element.prototype.webkitMatchesSelector;
	}

	if (!Element.prototype.closest) {
		Element.prototype.closest = function(s) {
			const instance = this;

			let el = instance;

			if (!document.documentElement.contains(el)) {
				return null;
			}

			do {
				if (el.matches(s)) {
					return el;
				}

				el = el.parentElement || el.parentNode;
			} while (el !== null && el.nodeType === 1);

			return null;
		};
	}
}

function initForEachPolyfill() {
	if (window.NodeList && !NodeList.prototype.forEach) {
		NodeList.prototype.forEach = function(callback, thisArg) {
			thisArg = thisArg || window;

			for (let i = 0; i < this.length; i++) {
				callback.call(thisArg, this[i], i, this);
			}
		};
	}
}

/* ---------- Session Popup ---------- */

function initPopup() {
	AUI().use('aui-base', 'aui-template-deprecated', 'liferay-util-window', function(A) {
		const sessionPopupNode = A.one(
			'.osb-www-marketing-events-portlet-agenda #eventAgendaSessionPopupTpl'
		);

		const eventAgendaSessionPopupTpl = new A.Template(sessionPopupNode.html());

		function sessionPopUp(event) {
			const currentTarget = event.currentTarget;
			const trackNode = currentTarget.querySelector('.event-agenda-track');

			let trackColorClass = 'event-agenda-track-category-trackless';

			if (trackNode) {
				const trackClasses = trackNode.classList;

				trackColorClass = [].slice.call(trackClasses).filter(function(item) {
					return item.includes('track-category-');
				});
			}

			const popupData = {
				sessionHTML: event.target.closest('.event-agenda-session').innerHTML,
			};

			Liferay.Util.Window.getWindow({
				dialog: {
					bodyContent: eventAgendaSessionPopupTpl.parse(popupData),
					cssClass: `osb-www-marketing-events-portlet-agenda-popup max-med ${trackColorClass}`,
					destroyOnHide: true,
					modal: true,
					resizable: false,
				},
			});
		}

		sessionNodes.forEach(function(node) {
			if (node.querySelector('.event-agenda-session-summary')) {
				node.addEventListener('click', event => sessionPopUp(event));
			} else {
				node.classList.add('no-popup');
			}
		});
	});
}

/* ---------- Utility ---------- */

function throttle(func, wait, options) {
	var args;
	var context;
	var previous = 0;
	var result;
	var timeout = null;

	if (!options) {
		options = {};
	}

	var later = function() {
		previous = options.leading === false ? 0 : Date.now();
		result = func.apply(context, args);
		timeout = null;

		if (!timeout) {
			context = args = null;
		}
	};

	return function() {
		var instance = this;
		var now = Date.now();

		if (!previous && options.leading === false) {
			previous = now;
		}

		var remaining = wait - (now - previous);

		args = arguments;
		context = instance;

		if (remaining <= 0 || remaining > wait) {
			if (timeout) {
				clearTimeout(timeout);

				timeout = null;
			}

			previous = now;
			result = func.apply(context, args);

			if (!timeout) {
				context = args = null;
			}
		} else if (!timeout && options.trailing !== false) {
			timeout = setTimeout(later, remaining);
		}

		return result;
	};
}

/* ---------- Initialize Code ---------- */

if (eventAgendaWrapperNode !== null) {
	initAncestorPolyfill();
	initForEachPolyfill();
	initEventHandlers();
	initFilters();
	initPopup();

	eventAgendaWrapperNode.classList.remove('loading');
}
