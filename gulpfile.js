var gulp = require('gulp');
var sass = require('gulp-sass');
var minifyCss = require('gulp-minify-css');

gulp.task('sass', function() {
  return gulp
  .src('./src/scss/**/*.scss')
  .pipe(sass())
  .pipe(minifyCss())
  .pipe(gulp.dest('./src/css'));
});

gulp.task('watch', ['sass'], function() {
  return gulp
  .watch('./src/scss/**/*.scss', ['sass']);
});

gulp.task('default', ['sass']);