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
