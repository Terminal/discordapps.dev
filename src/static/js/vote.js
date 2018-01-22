const upvote = document.getElementById('upvote');
const downvote = document.getElementById('downvote');
const voteDesc = document.getElementById('voteDesc');

window.addEventListener('load', async () => {
	let vote = await fetch(`${location.href}/vote`, {
		credentials: 'same-origin'
	}).then(res => res.json());

	const info = await fetch(`${location.origin}/api/v1${location.pathname}`)
		.then(res => res.json());

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
});
