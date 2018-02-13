/**
	ls.terminal.ink Discord Bot List Server
	Copyright (C) 2018 Moustacheminer Server Services
	Copyright (C) 2018 Terminal.ink

    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

    You should have received a copy of the GNU General Public License
	along with this program.  If not, see <http://www.gnu.org/licenses/>.
*/

/* eslint no-unused-vars: 0 */

const type = document.getElementById('type');
const descbox = document.getElementById('description');

function description() {
	const desc = document.getElementById('longDesc');
	const temp = desc ? desc.value : '';
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
}
