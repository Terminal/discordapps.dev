const longDesc = document.getElementById('longDesc');
const showMore = document.getElementById('showMore');
const showLess = document.getElementById('showLess');

showMore.onclick = () => {
	showMore.classList.add('hide');
	showLess.classList.remove('hide');

	const height = longDesc.scrollHeight;

	longDesc.style.height = `${height}px`;

	longDesc.addEventListener('transitioned', function caller() {
		longDesc.removeEventListener('transitioned', caller);
		longDesc.style.height = null;
	});
};

showLess.onclick = () => {
	showLess.classList.add('hide');
	showMore.classList.remove('hide');

	const height = longDesc.scrollHeight;
	const elementTransition = longDesc.style.transition;
	longDesc.style.transition = '';

	requestAnimationFrame(() => {
		longDesc.style.height = `${height}px`;
		longDesc.style.transition = elementTransition;

		requestAnimationFrame(() => {
			longDesc.style.height = '6em';
		});
	});
};
