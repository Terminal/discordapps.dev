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

const main = [...document.getElementsByTagName('main')][0];

const link = () => {
	[...document.getElementsByTagName('a')]
		.filter(elem => elem.dataset.ajaxUrl !== undefined)
		.forEach((elem) => {
			delete elem.dataset.ajaxUrl;
			elem.addEventListener('click', function ajax(event) {
				// Do not change page to URL on click
				event.preventDefault();
				const xhttp = new XMLHttpRequest();
				const url = this.href;
				xhttp.onreadystatechange = function onLoad() {
					if (this.readyState === 4) {
						main.innerHTML = this.responseText;
						window.history.pushState('', 'Page', url);
						link();
					}
				};
				xhttp.open('get', `${this.pathname}?ajax=true`, true);
				xhttp.send();
			});
		});
};

window.addEventListener('load', () => {
	link();
});
