var ExtractText = require('extract-text-webpack-plugin');
var UglifyJsPlugin = require('uglifyjs-webpack-plugin');
var debug = process.env.NODE_ENV !== 'production';
var webpack = require('webpack');
var extractEditorSCSS = new ExtractText({
	filename: './blocks.editor.build.css'
});
var extractBlockSCSS = new ExtractText({
	filename: './blocks.style.build.css'
});
var myUglifyJsPlugin = new UglifyJsPlugin({
	uglifyOptions: {
		output: {
			comments: false
		}
	}
});
var plugins = [extractEditorSCSS, extractBlockSCSS, myUglifyJsPlugin];
var scssConfig = {
	use: [{
		loader: 'css-loader'
	}, {
		loader: 'sass-loader',
		options: {
			outputStyle: 'compressed'
		}
	}]
};
module.exports = {
	context: __dirname,
	devtool: false,
	mode: debug ? 'development' : 'production',
	entry: './src/blocks.js',
	output: {
		path: __dirname + '/dist/',
		filename: 'blocks.build.js'
	},
	module: {
		rules: [{
			test: /\.js$/,
			exclude: /node_modules/,
			use: [{
				loader: 'babel-loader'
			}]
		}, {
			test: /editor\.scss$/,
			exclude: /node_modules/,
			use: extractEditorSCSS.extract(scssConfig)
		}, {
			test: /style\.scss$/,
			exclude: /node_modules/,
			use: extractBlockSCSS.extract(scssConfig)
		}]
	},
	plugins: plugins,
};