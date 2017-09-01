/* eslint no-unused-vars: 0 */

const name = document.getElementById('name');
const avatar = document.getElementById('avatar');
const invite = document.getElementById('invite');
const botid = document.getElementById('id');
const count = document.getElementById('count');
const shortDesc = document.getElementById('shortDesc');
const type = document.getElementById('type');
const descbox = document.getElementById('description');
const errorbox = document.getElementById('error');

const description = () => {
	if (type.value === 'iframe') {
		descbox.innerHTML = '<label for="longDesc">Long Description</label><input type="text" class="form-control" id="longDesc" name="longDesc" maxlength="200" placeholder="Insert iframe URL" required pattern="https:\\/\\/.+">';
	} else if (type.value === 'markdown') {
		descbox.innerHTML = '<label for="longDesc">Long Description</label><textarea class="form-control" id="longDesc" name="longDesc" maxlength="20000" rows="6" placeholder="Insert Markdown" required></textarea><p><a href="https://guides.github.com/features/mastering-markdown/" target="_blank">GitHub Markdown help</a></p>';
	}
};
