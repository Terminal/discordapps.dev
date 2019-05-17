/**
 * This file is licenced under CC0 1.0
 * https://creativecommons.org/publicdomain/zero/1.0/
 * https://github.com/Terminal/discordapps.dev/tree/archive-pugjs
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
