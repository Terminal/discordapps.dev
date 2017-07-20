/* eslint no-unused-vars: 0 */

const botid = document.getElementById('id');
const shortDesc = document.getElementById('shortDesc');
const type = document.getElementById('type');
const descbox = document.getElementById('description');
const errorbox = document.getElementById('error');

const description = () => {
	if (type.value === 'iframe') {
		descbox.innerHTML = '<label for="longDesc">Long Description</label><input type="text" class="form-control" id="longDesc" name="longDesc" maxlength="200" placeholder="Insert iframe URL">';
	} else if (type.value === 'markdown') {
		descbox.innerHTML = '<label for="longDesc">Long Description</label><textarea class="form-control" id="longDesc" name="longDesc" maxlength="20000" rows="6" placeholder="Insert Markdown"></textarea><a href="https://guides.github.com/features/mastering-markdown/" target="_blank">GitHub Markdown help</a>';
	}
};

const check = () => {
	if (!botid.value) {
		errorbox.innerHTML = '<div class="alert alert-danger" role="alert"><b>Aaaa!</b> You did not fill in your bot\'s ID.</div>';
		return false;
	} else if (!shortDesc.value) {
		errorbox.innerHTML = '<div class="alert alert-danger" role="alert"><b>Baaa!</b> You did not fill in your short description.</div>';
		return false;
	} else if (type.value !== 'iframe' && type.value !== 'markdown') {
		errorbox.innerHTML = '<div class="alert alert-danger" role="alert"><b>Meow!</b> Please select a valid long description type.</div>';
		return false;
	} else if (!document.getElementById('longDesc').value) {
		errorbox.innerHTML = '<div class="alert alert-danger" role="alert"><b>Reee!</b> You did not fill in your long description.</div>';
		return false;
	} else if (botid.value.length > 70) {
		errorbox.innerHTML = '<div class="alert alert-danger" role="alert"><b>Ping!</b> Your bot\'s ID is too long. (70)</div>';
		return false;
	} else if (shortDesc.value.length > 200) {
		errorbox.innerHTML = '<div class="alert alert-danger" role="alert"><b>It\'s a trap!</b> Your bot\'s URL is too long. (200)</div>';
		return false;
	} else if (type.value === 'iframe' && document.getElementById('longDesc').value.length > 200) {
		errorbox.innerHTML = '<div class="alert alert-danger" role="alert"><b>Ding!</b> Your bot\'s URL is too long. (200)</div>';
		return false;
	} else if (type.value === 'iframe' && !/^https?:\/\//.test(document.getElementById('longDesc').value)) {
		errorbox.innerHTML = '<div class="alert alert-danger" role="alert"><b>Kahoot!</b> Your bot\'s URL has to begin with http:// or https://</div>';
		return false;
	} else if (type.value === 'markdown' && document.getElementById('longDesc').value.length > 20000) {
		errorbox.innerHTML = '<div class="alert alert-danger" role="alert"><b>Boop!</b> Your bot\'s markdown is too long. (20000)</div>';
		return false;
	} else if (/\D/.test(botid.value)) {
		errorbox.innerHTML = '<div class="alert alert-danger" role="alert"><b>Yee!</b> Your bot\'s ID needs to use... numbers.</div>';
		return false;
	}
	return true;
};

window.onload = description;
