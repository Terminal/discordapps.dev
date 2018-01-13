/**
 * Shitsearch 1.0
 * MIT License
 *
 * Copyright (c) 2018 Moustacheminer Server Services
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */

const search = document.getElementById('search');
const fixtext = s => s.toLowerCase().replace(/ '/g, '').replace(/™/g, 'tm');

// Distance multiplier
const weight = {
	name: 2,
	desc: 3,
	id: 1
};

const bots = [...document.getElementsByClassName('botcard')]
	.map(bot => ({
		name: fixtext(bot.firstChild.firstChild.firstChild.innerHTML),
		desc: fixtext(bot.firstChild.firstChild.lastChild.innerHTML),
		id: bot.id,
		dom: bot
	}));

// Levenshtein Distance
// Not really, it has extra bodges now
// https://gist.github.com/andrei-m/982927
const distance = (a, b) => {
	if (a.length === 0) return b.length;
	if (b.length === 0) return a.length;
	let i;

	// A should be the longer one.
	if (a.length < b.length) {
		return distance(b, a);
	}

	// If they're different lengths, try each substring of a
	if (a.length !== b.length) {
		const lengths = [];
		// i is the offset from the beginning
		for (i = 0; i < (a.length - b.length) + 1; i += 1) {
			lengths.push(distance(a.substring(i, i + b.length), b));
		}
		return Math.min(...lengths);
	}

	/*
		Copyright (c) 2011 Andrei Mackenzie
		Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
		The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
		THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
	*/
	const matrix = [];

	// increment along the first column of each row
	for (i = 0; i <= b.length; i += 1) {
		matrix[i] = [i];
	}

	let j;

	// increment each column in the first row
	for (j = 0; j <= a.length; j += 1) {
		matrix[0][j] = j;
	}

	// Fill in the rest of the matrix
	for (i = 1; i <= b.length; i += 1) {
		for (j = 1; j <= a.length; j += 1) {
			if (b.charAt(i - 1) === a.charAt(j - 1)) {
				matrix[i][j] = matrix[i - 1][j - 1];
			} else {
				matrix[i][j] = Math.min(matrix[i - 1][j - 1] + 1, // substitution
					Math.min(matrix[i][j - 1] + 1, // insertion
						matrix[i - 1][j] + 1)); // deletion
			}
		}
	}

	return matrix[b.length][a.length] + 1;
};

search.oninput = () => {
	const result = bots.map(bot => (Object.assign(
		{
			score: Math.min(...Object.keys(weight)
				.map((key) => {
					if (bot[key]) {
						const score = distance(bot[key], fixtext(search.value)) * weight[key];
						if (typeof score === 'number') return score;
					}
					return Number.MAX_SAFE_INTEGER;
				})),
			scores: Object.keys(weight)
				.map((key) => {
					if (bot[key]) {
						const score = distance(bot[key], fixtext(search.value)) * weight[key];
						if (typeof score === 'number') return score;
					}
					return {
						score: Number.MAX_SAFE_INTEGER,
						name: key
					};
				})
		},
		bot
	))).sort((a, b) => {
		// If there's nothing to search for, or if the distance is the same, use the random
		if (search.value.length === 0 || a.score === b.score) {
			return a.random - b.random;
		}
		return a.score - b.score;
	});

	result.forEach((bot) => {
		bot.dom.parentElement.appendChild(bot.dom);
	});

	console.dir(result);
};
