var gulp = require('gulp');
//var browserSync = require('browser-sync').create();
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var sass = require('gulp-sass');
var cssminify = require('gulp-minify-css');
var cache = require('gulp-cache');
var htmlmin = require('gulp-htmlmin');

//gulp.task('browserSync', function() {
//  browserSync.init({
//    server: {
//      baseDir: './'
//    },
//  });
//});

gulp.task('customjs', function () {
    return gulp.src('src/**/*.js')
        .pipe(concat('sams.min.js'))
        .pipe(uglify('sams.min.js'))
        .pipe(gulp.dest('dist/JS'));
});

gulp.task('bowerjs', function () {
    return gulp.src([
        'bower_components/jquery/dist/jquery.min.js',
        'bower_components/angular/angular.min.js',
        'bower_components/bootstrap/dist/js/bootstrap.min.js'
        ])
        .pipe(concat('bower.min.js'))
        .pipe(uglify('bower.min.js'))
        .pipe(gulp.dest('dist/JS'));
});

gulp.task('sass', function () {
   return gulp.src('src/**/*.scss')
        .pipe(concat('sams.min.scss'))
        .pipe(sass())  // Converts Sass to CSS with gulp-sass
        .pipe(cssminify())
        .pipe(gulp.dest('dist/assets/stylesheets'))
});

gulp.task('bowercss', function () {
   return gulp.src([
        'bower_components/bootstrap/dist/css/bootstrap.min.css'
        ])
        .pipe(concat('bower.min.css'))
        .pipe(cssminify())
        .pipe(gulp.dest('dist/assets/stylesheets'))
});

gulp.task('html', function() {
  return gulp.src('src/*.html')
    .pipe(htmlmin({collapseWhitespace: true}))
    .pipe(gulp.dest('./'));
});

//gulp.task('fonts', function() {
//  return gulp.src('src/fonts/**/*')
//  .pipe(gulp.dest('dest/fonts'));
//});

gulp.task('watch', [ 'html', 'bowerjs', 'customjs', 'sass', 'bowercss'], function () {
    gulp.watch('src/**/*.html', ['customjs']);
    gulp.watch('src/**/*.js', ['customjs']);
    gulp.watch('bower_components/**/*.js', ['bowerjs'])
    gulp.watch('src/**/*.scss', ['sass'])
    gulp.watch('bower_components/**/*.css', ['bowercss'])
});

gulp.task('build', [ 'html', 'bowerjs', 'customjs', 'sass', 'bowercss'], function () {
    console.log("Files builded successfully")
});
