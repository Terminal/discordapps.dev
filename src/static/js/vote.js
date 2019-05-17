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


// Keep everything to do with voting inside this little box
window.addEventListener('load', async () => {
  const upvote = document.getElementById('upvote');
  const downvote = document.getElementById('downvote');
  const voteDesc = document.getElementById('voteDesc');
  const userID = document.getElementById('userID');

  if (userID) {
    let vote = await fetch(`${location.href}/vote`, {
      credentials: 'same-origin'
    }).then(res => res.json());

    if (vote === -1) {
      downvote.classList.add('selected');
    } else if (vote === 1) {
      upvote.classList.add('selected');
    }

    const doVote = async (number) => {
      if (vote === number) {
        vote = 0;
      } else {
        vote = number;
      }

      const result = await fetch(`${location.href}/vote`, {
        credentials: 'same-origin',
        method: 'post',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          vote
        })
      }).then(res => res.json());

      if (vote === -1) {
        upvote.classList.remove('selected');
        downvote.classList.add('selected');
      } else if (vote === 1) {
        upvote.classList.add('selected');
        downvote.classList.remove('selected');
      } else {
        upvote.classList.remove('selected');
        downvote.classList.remove('selected');
      }

      voteDesc.innerHTML = `${result.upvotes} - ${result.downvotes}`;
    };

    upvote.onclick = () => {
      doVote(1);
    };

    downvote.onclick = () => {
      doVote(-1);
    };
  }
});
