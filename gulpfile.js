var gulp = require('gulp'),
    ngDgml = require('./index.js');

gulp.task('default', function () {
    gulp.src(['test/fixtures/*.js'])
         .pipe(ngDgml('architecture.dgml'))
         .pipe(gulp.dest('.'));
});
