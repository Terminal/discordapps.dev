const upvote = document.getElementById('upvote');
const downvote = document.getElementById('downvote');
const voteDesc = document.getElementById('voteDesc');

window.addEventListener('load', async () => {
	let vote = await fetch(`${location.href}/vote`, {
		credentials: 'same-origin'
	}).then(res => res.json());

	if (vote === -1) {
		downvote.classList.add('selected');
	} else if (vote === 1) {
		upvote.classList.add('selected');
	}

	const doVote = (number) => {
		if (vote === number) {
			number = 0;
		}
		vote = number;
		console.log(number);

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

		fetch(`${location.href}/vote`, {
			credentials: 'same-origin',
			method: 'post',
			body: number
		});
	};

	console.dir(vote);
	fetch(`${location.origin}/api/v1${location.pathname}`)
		.then(res => res.json())
		.then((res) => {
			console.dir(res);
			voteDesc.innerHTML = `${res.upvotes} - ${res.downvotes}`;

			upvote.onclick = () => {
				doVote(1);
			};

			downvote.onclick = () => {
				doVote(-1);
			};
		});
});
