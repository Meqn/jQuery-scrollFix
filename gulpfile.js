var gulp = require('gulp');
var header = require('gulp-header');
var pkg = require('./package.json');
var replace = require('gulp-replace');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var connect = require("gulp-connect");

gulp.task('build', function() {
	var banner = [
        '/*!',
		' * <%= pkg.name %>',
		' * @ desc: <%= pkg.description %>',
		' * @ version: <%= pkg.version %>',
		' * @ link: <%= pkg.homepage %>',
		' * @ by: <%= pkg.author %>',
		' * @ update: <%= new Date() %>',
		' */',
        ''].join('\n');

	gulp.src('./jQuery.scrollFix.js', {base: './'})
		.pipe(replace(/\/\/.*/g, "")) 			// 取消注释
		.pipe(replace(/\/\*[\s\S]*\*\//g, ""))
		.pipe(header(banner, { pkg : pkg } ))
		.pipe(gulp.dest('./dist/'))
		.pipe(uglify())
		.pipe(header(banner, { pkg : pkg } ))
		.pipe(rename({suffix: '.min'}))
		.pipe(gulp.dest('./dist/'));
});

gulp.task('server', function () {
	connect.server({
		name: 'test',
		root: './',
		port: 8088
	});
});