
let gulp = require('gulp');
const minify = require('gulp-minify');
const htmlmin = require('gulp-htmlmin');
const imagemin = require('gulp-imagemin');

gulp.task('compressCustom', () => {
    return gulp.src(['./public/assets/js/custom.js']).pipe(minify()).pipe(gulp.dest('dist/custom'))
});
gulp.task('compressImages', () =>
    gulp.src(['./public/assets/images/*'])
        .pipe(imagemin())
        .pipe(gulp.dest('dist/images'))
);
gulp.task('compressAll', () => {
    return gulp.src(['./public/assets/js/*.js']).pipe(minify()).pipe(gulp.dest('dist/all'))
});
gulp.task('compress', () => {
    return gulp.src(['./private/*.js']).pipe(minify()).pipe(gulp.dest('dist/all'))
});
gulp.task('html', () => {
    return gulp.src('./public/thank.html').pipe(htmlmin({
        collapseWhitespace: true
    })).pipe(gulp.dest('dist/html'));
});
