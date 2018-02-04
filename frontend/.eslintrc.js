module.exports = {
	extends: 'airbnb',
	plugins: [
		'react'
	],
	settings: {
		'import/resolver': {
			webpack: {
				extensions: [
					'.js',
					'.jsx'
				]
			}
		}
	}
};
