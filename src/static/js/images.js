const imageFail = (element) => {
	if (!element.dataset.imageFailure) {
		element.src = '/img/terminal256.png';
		element.dataset.imageFailure = true;
	} else {
		element.src = null;
	}
};
