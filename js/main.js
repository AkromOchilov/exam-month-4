import { NewData } from './users.js';
let body = document.body;
let contentTemplate = body.querySelector('#content-template').content;
let main = body.querySelector('.main');
let elSort = body.querySelector('.sort');
let elFilter = body.querySelector('.filter');

for (let i = 0; i < NewData.length; i++) {
	NewData[i].id = i;
}

let data = [...NewData];

let addPriorityColor = (priority) => {
	if (priority.textContent === 'high') {
		priority.style.background = 'red';
	} else if (priority.textContent === 'normal') {
		priority.style.background = 'green';
	} else {
		priority.style.background = 'yellow';
	}
};

render(data);

function render(data) {
	main.innerHTML = null;

	createElement(data);
}

function createElement(data) {
	data.forEach((element) => {
		let content = contentTemplate.cloneNode(true);
		let mainFragment = new DocumentFragment();

		content.querySelector('.comment__user').src = element.ava;
		content.querySelector(
			'.comment__author .common__style--text',
		).textContent = element.name;
		content.querySelector(
			'.comment__status .common__style--text',
		).textContent = element.text;

		content.querySelector(
			'.comment__date .common__style--text',
		).textContent = element.date_of_onliine;
		content.querySelector(
			'.comment__priority .comment__priority--status',
		).textContent = element.priority;
		addPriorityColor(
			content.querySelector(
				'.comment__priority .comment__priority--status',
			),
		);

		content.querySelector('.comment__more--img').dataset.id = element.id;

		mainFragment.appendChild(content);
		return main.appendChild(mainFragment);
	});
}

elSort.addEventListener('change', (evt) => {
	let sortValue = evt.target.value;
	let sorted = [...data].sort((a, b) => {
		if (sortValue == 'a-z') {
			return a.name.toLowerCase() > b.name.toLowerCase()
				? 1
				: a.name.toLowerCase() < b.name.toLowerCase()
				? -1
				: 0;
		} else if (sortValue == 'z-a') {
			return a.name.toLowerCase() > b.name.toLowerCase()
				? -1
				: a.name.toLowerCase() < b.name.toLowerCase()
				? 1
				: 0;
		}
	});
	render(sorted);
});

elFilter.addEventListener('change', (evt) => {
	let filterValue = evt.target.value;

	let filtered = [...data].filter((element) => {
		if (filterValue == 'high') {
			return element.priority === 'high';
		} else if (filterValue == 'normal') {
			return element.priority === 'normal';
		} else if (filterValue == 'low') {
			return element.priority === 'low';
		}
	});

	render(filtered);
});

main.addEventListener('click', (evt) => {
	let elRemove = evt.target.closest('.comment__more--img');
	if (elRemove) {
		let elId = elRemove.dataset.id;
		data = data.filter((element) => {
			return element.id != elId;
		});
	}

	render(data);
});

// let sorted = [...data].sort((a, b) => {
// 	if (sortValue === 'a-z') {
// 		return a.name.toLowerCase() > b.name.toLowerCase()
// 			? 1
// 			: a.name.toLowerCase() < b.name.toLowerCase()
// 			? -1
// 			: 0;
// 	} else if (sortValue === 'z-a') {
// 		return a.name.toLowerCase() > b.name.toLowerCase()
// 			? -1
// 			: a.name.toLowerCase() < b.name.toLowerCase()
// 			? 1
// 			: 0;
// 	} else {
// 		return data;
// 	}
// });
// render(sorted);

// filter.addEventListener('change', (evt) => {
// 	let filterValue = evt.target.value;

// 	let filtered = [...data].filter((el) => {
// 		if (filterValue === 'high') {
// 			return el.priority === 'high';
// 		} else if (filterValue === 'normal') {
// 			return el.priority === 'normal';
// 		} else if (filterValue === 'low') {
// 			return el.priority === 'low';
// 		} else {
// 			return data;
// 		}
// 	});
// 	render(filtered);
// });
