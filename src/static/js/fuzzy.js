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

/* eslint-disable */
/*
 * Fuzzy
 * https://github.com/myork/fuzzy
 *
 * Copyright (c) 2012 Matt York
 * Licensed under the MIT license.
 */

(function() {

	var root = this;
	
	var fuzzy = {};
	
	// Use in node or in browser
	if (typeof exports !== 'undefined') {
	  module.exports = fuzzy;
	} else {
	  root.fuzzy = fuzzy;
	}
	
	// Return all elements of `array` that have a fuzzy
	// match against `pattern`.
	fuzzy.simpleFilter = function(pattern, array) {
	  return array.filter(function(str) {
		return fuzzy.test(pattern, str);
	  });
	};
	
	// Does `pattern` fuzzy match `str`?
	fuzzy.test = function(pattern, str) {
	  return fuzzy.match(pattern, str) !== null;
	};
	
	// If `pattern` matches `str`, wrap each matching character
	// in `opts.pre` and `opts.post`. If no match, return null
	fuzzy.match = function(pattern, str, opts) {
	  opts = opts || {};
	  var patternIdx = 0
		, result = []
		, len = str.length
		, totalScore = 0
		, currScore = 0
		// prefix
		, pre = opts.pre || ''
		// suffix
		, post = opts.post || ''
		// String to compare against. This might be a lowercase version of the
		// raw string
		, compareString =  opts.caseSensitive && str || str.toLowerCase()
		, ch;
	
	  pattern = opts.caseSensitive && pattern || pattern.toLowerCase();
	
	  // For each character in the string, either add it to the result
	  // or wrap in template if it's the next string in the pattern
	  for(var idx = 0; idx < len; idx++) {
		ch = str[idx];
		if(compareString[idx] === pattern[patternIdx]) {
		  ch = pre + ch + post;
		  patternIdx += 1;
	
		  // consecutive characters should increase the score more than linearly
		  currScore += 1 + currScore;
		} else {
		  currScore = 0;
		}
		totalScore += currScore;
		result[result.length] = ch;
	  }
	
	  // return rendered string if we have a match for every char
	  if(patternIdx === pattern.length) {
		// if the string is an exact match with pattern, totalScore should be maxed
		totalScore = (compareString === pattern) ? Infinity : totalScore;
		return {rendered: result.join(''), score: totalScore};
	  }
	
	  return null;
	};
	
	// The normal entry point. Filters `arr` for matches against `pattern`.
	// It returns an array with matching values of the type:
	//
	//     [{
	//         string:   '<b>lah' // The rendered string
	//       , index:    2        // The index of the element in `arr`
	//       , original: 'blah'   // The original element in `arr`
	//     }]
	//
	// `opts` is an optional argument bag. Details:
	//
	//    opts = {
	//        // string to put before a matching character
	//        pre:     '<b>'
	//
	//        // string to put after matching character
	//      , post:    '</b>'
	//
	//        // Optional function. Input is an entry in the given arr`,
	//        // output should be the string to test `pattern` against.
	//        // In this example, if `arr = [{crying: 'koala'}]` we would return
	//        // 'koala'.
	//      , extract: function(arg) { return arg.crying; }
	//    }
	fuzzy.filter = function(pattern, arr, opts) {
	  if(!arr || arr.length === 0) {
		return [];
	  }
	  if (typeof pattern !== 'string') {
		return arr;
	  }
	  opts = opts || {};
	  return arr
		.reduce(function(prev, element, idx, arr) {
		  var str = element;
		  if(opts.extract) {
			str = opts.extract(element);
		  }
		  var rendered = fuzzy.match(pattern, str, opts);
		  if(rendered != null) {
			prev[prev.length] = {
				string: rendered.rendered
			  , score: rendered.score
			  , index: idx
			  , original: element
			};
		  }
		  return prev;
		}, [])
	
		// Sort by score. Browsers are inconsistent wrt stable/unstable
		// sorting, so force stable by using the index in the case of tie.
		// See http://ofb.net/~sethml/is-sort-stable.html
		.sort(function(a,b) {
		  var compare = b.score - a.score;
		  if(compare) return compare;
		  return a.index - b.index;
		});
	};
	
	
}());
	