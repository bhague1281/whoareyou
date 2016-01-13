var gulp = require('gulp');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var minifyCss = require('gulp-minify-css');
var autoprefixer = require('gulp-autoprefixer');
var uglify = require('gulp-uglify');
var nodemon = require('gulp-nodemon');

var sassInput = './src/scss/**/*.scss';
var sassOptions = {
  errLogToConsole: true,
  outputStyle: 'expanded'
};

var jsInput = './src/app/**/*.js';

gulp.task('sass', function() {
  return gulp
  .src(sassInput)
  .pipe(sourcemaps.init())
  .pipe(sass(sassOptions).on('error', sass.logError))
  .pipe(autoprefixer())
  .pipe(minifyCss())
  .pipe(sourcemaps.write())
  .pipe(gulp.dest('./src/css'));
});

gulp.task('js', function() {
  return gulp
  .src(jsInput)
  .pipe(sourcemaps.init())
  .pipe(uglify())
  .pipe(sourcemaps.write())
  .pipe(gulp.dest('./src/js'));
});

gulp.task('watch', ['sass', 'js'], function() {
  gulp.watch('./src/scss/**/*.scss', ['sass'])
  .on('change', function(event) {
    console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
  });

  gulp.watch('./src/app/**/*.js', ['js'])
  .on('change', function(event) {
    console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
  });

  nodemon({
    script: 'server.js'
  });
});

gulp.task('default', ['sass', 'js']);