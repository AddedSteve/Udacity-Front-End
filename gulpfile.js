var gulp = require('gulp');
var cssnano = require('gulp-cssnano');
var uglify = require('gulp-uglify');
var imagemin = require('gulp-imagemin');
var pngquant = require('imagemin-pngquant');
var htmlmin = require('gulp-htmlmin');


gulp.task('mincss', function() {
    return gulp.src('src/**/*.css')
        .pipe(cssnano())
        .pipe(gulp.dest('dist/'));
});

gulp.task('minjs', function() {
  return gulp.src('src/**/*.js')
    .pipe(uglify())
    .pipe(gulp.dest('dist/'));
});

gulp.task('minimg', function(){
	return gulp.src(['src/images/*', 'src/views/images/*'])
        .pipe(imagemin({
            progressive: true,
            svgoPlugins: [{removeViewBox: false}],
            use: [pngquant()]
        }))
        .pipe(gulp.dest('dist/img'));
});

gulp.task('minhtml', function() {
  return gulp.src('src/**/*.html')
    .pipe(htmlmin({collapseWhitespace: true}))
    .pipe(gulp.dest('dist'))
});

gulp.task('default',['mincss', 'minjs', 'minhtml']);