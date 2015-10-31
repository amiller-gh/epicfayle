'use strict';

var gulp = require('gulp');
var del = require('del');
var server = require('gulp-express');
var sass = require('gulp-sass');
var rebound = require('gulp-rebound');

gulp.task('fullclean', function(cb){
  // Clean our dist
  del(['dist/**/*'], cb);
});

gulp.task('index', function(){
  del.sync(['dist/index.html']);
  return gulp.src(["index.html"])
  .pipe(gulp.dest('dist'))
  // .pipe(server.notify());
});


gulp.task('assets', function(){
  del.sync(['dist/assets/**/*']);
  return gulp.src(["assets/**/*"])
  .pipe(gulp.dest('dist/assets'))
  // .pipe(server.notify());
});

gulp.task('sass', function () {
  del.sync(['dist/apps/**/*.scss']);
  return gulp.src('apps/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('dist/apps'))
    // .pipe(server.notify());
});

gulp.task('rebound', function(){
  del.sync(['dist/apps/**/*.js']);
  return gulp.src(["apps/**/*.html"])
  .pipe(rebound())
  .pipe(gulp.dest('dist/apps'))
  // .pipe(server.notify());
});

gulp.task('build', ['rebound', 'sass', 'assets', 'index'], function () {});

gulp.task('default', ['fullclean', 'build'], function () {

    // Start the server at the beginning of the task
    server.run(['app.js'], null, 35730);

    gulp.watch(['index.html'], ['index']);
    gulp.watch(['apps/**/*.scss', 'scss/**/*.scss'], ['sass']);
    gulp.watch(['apps/**/*.html'], ['rebound']);
    gulp.watch(['assets/**/*'], ['assets']);

    // Restart the server when file changes
    gulp.watch(['app.js', 'api/**/*.js'], [server.run]);
});
