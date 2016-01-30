var gulp = require('gulp');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var sourcemaps = require('gulp-sourcemaps');
var browserSync = require('browser-sync').create();
var reload = browserSync.reload;

gulp.task('build', function() {
  gulp.src(['lib/browser/js-yaml.js', 'lib/browser/index.js'])
    .pipe(sourcemaps.init())
    .pipe(concat('js-yaml-front-client.js'))
    .pipe(gulp.dest('./dist'))
    .pipe(uglify())
    .pipe(rename('js-yaml-front-client.min.js'))
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest('./dist'));
});

gulp.task('serve', ['build'], function() {
  browserSync.init({
    server: {
      baseDir: "./examples"
    }
  });
});

gulp.task('default', ['build']);