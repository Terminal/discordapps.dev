/* eslint no-unused-vars: 0 */

const type = document.getElementById('type');
const descbox = document.getElementById('description');

const description = () => {
	if (type.value === 'iframe') {
		descbox.innerHTML = '<input type="text" class="form-control" id="longDesc" name="longDesc" maxlength="200" required pattern="https:\\/\\/.+">';
	} else if (type.value === 'markdown') {
		descbox.innerHTML = '<textarea class="form-control" id="longDesc" name="longDesc" maxlength="20000" rows="6" required></textarea><p><a href="https://guides.github.com/features/mastering-markdown/" target="_blank">GitHub Markdown</a></p>';
	}
};
