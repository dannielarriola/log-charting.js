var gulp = require('gulp');
var concat = require('gulp-concat');
var insert = require('gulp-insert');
var replace = require('gulp-replace');
var streamify = require('gulp-streamify');
var uglify = require('gulp-uglify');
var util = require('gulp-util');
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var collapse = require('bundle-collapser/plugin');
var package = require('./package.json');

var outDir = './dist/';

var header = "/*!\n" +
  " * log-charting.js\n" +
  " * http://danielarriola.com\n" +
  " * Version: {{ version }}\n" +
  " *\n" +
  " * Copyright 2017 Daniel Arriola\n" +
  " * Released under the MIT license\n" +
  " */\n";

gulp.task('build', buildTask);
gulp.task('watch', watchTask);
gulp.task('default', ['build', 'watch']);



function buildTask() {

  var dist = browserify('./src/log-charting.js', { standalone: 'logcharting' })
    .plugin(collapse)
    .bundle()
    .pipe(source('log-charting.js'))
    .pipe(insert.prepend(header))
    .pipe(streamify(replace('{{ version }}', package.version)))
    .pipe(gulp.dest(outDir))
    .pipe(streamify(uglify()))
    .pipe(insert.prepend(header))
    .pipe(streamify(replace('{{ version }}', package.version)))
    .pipe(streamify(concat('log-charting.min.js')))
    .pipe(gulp.dest(outDir));

  return dist;

}

function watchTask() {
  return gulp.watch('./src/**', ['build']);
}
