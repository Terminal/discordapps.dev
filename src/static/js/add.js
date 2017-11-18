/* eslint no-unused-vars: 0 */

const type = document.getElementById('type');
const descbox = document.getElementById('description');

const description = () => {
	const temp = document.getElementById('longDesc').value;
	if (type.value === 'iframe') {
		descbox.innerHTML = '<input type="text" class="form-control" id="longDesc" name="longDesc" maxlength="200" required pattern="https:\\/\\/.+">';
	} else if (type.value === 'markdown') {
		descbox.innerHTML = '<textarea class="form-control" id="longDesc" name="longDesc" maxlength="20000" rows="6" required></textarea><p><a href="https://guides.github.com/features/mastering-markdown/" target="_blank">GitHub Markdown</a></p>';
	} else if (type.value === 'asciidoc') {
		descbox.innerHTML = '<textarea class="form-control" id="longDesc" name="longDesc" maxlength="20000" rows="6" required></textarea><p><a href="http://asciidoctor.org/docs/user-manual/#elements" target="_blank">AsciiDoctor Documentation</a></p>';
	} else if (type.value === 'html') {
		descbox.innerHTML = '<textarea class="form-control" id="longDesc" name="longDesc" maxlength="200000" rows="12" required></textarea>';
	}
	document.getElementById('longDesc').value = temp;
};
