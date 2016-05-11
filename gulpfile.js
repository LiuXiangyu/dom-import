var gulp = require('gulp');
var babel = require('gulp-babel');
var minify = require('gulp-minify');

gulp.task('default', function() {
  return gulp.src('src/*.js').pipe(babel({
    presets: ['es2015']
  }))
  .pipe(minify())
  .pipe(gulp.dest('dist/'));
});
