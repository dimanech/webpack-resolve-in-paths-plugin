const path = require('path');
const ResolveInPaths = require('./index.js');

module.exports = {
	mode: 'production',
	entry: './test/fixtures/brand/js/main.js',
	output: {
		filename: '[name].js',
		path: path.resolve(__dirname, 'test/fixtures/brand/static'),
	},
	resolve: {
		plugins: [
			new ResolveInPaths({
				paths: [
					path.resolve(__dirname, 'test/fixtures/brand/js'),
					path.resolve(__dirname, 'test/fixtures/core/js')
				]
			})
		]
	}
};
