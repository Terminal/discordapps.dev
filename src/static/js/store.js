const longDesc = document.getElementById('longDesc');
const showMore = document.getElementById('showMore');
const showLess = document.getElementById('showLess');

showMore.onclick = () => {
	longDesc.classList.add('extend');
	showMore.classList.add('hide');
	showLess.classList.remove('hide');
};

showLess.onclick = () => {
	longDesc.classList.remove('extend');
	showLess.classList.add('hide');
	showMore.classList.remove('hide');
};
