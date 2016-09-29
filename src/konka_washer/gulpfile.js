/**
 * Created by martin on 16/9/8.
 */
var gulp = require('gulp');

var clean = require("gulp-clean");
var jshint = require('gulp-jshint');
var less = require('gulp-less');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var htmlmin = require('gulp-htmlmin');
var cssmin = require('gulp-minify-css');
var imgmin = require('gulp-imagemin');
var babel = require('gulp-babel');
var rev = require('gulp-rev');
var plumber = require('gulp-plumber');
var babel = require('gulp-babel');
var sourcemaps = require('gulp-sourcemaps');
var usemin = require('gulp-usemin');
var copy = require('gulp-copy')









/*-----------------------clean------------------------*/

gulp.task('konka_wahser_clean', function() {
    return gulp.src('../../dist/konka_wahser')
        .pipe(clean({force: true}));
});

/*-----------------------htmlmin------------------------*/

gulp.task('konka_wahser_htmlmin', function() {
    return gulp.src('../../dist/konka_wahser/index.html')
        .pipe(htmlmin({collapseWhitespace: true}))
        .pipe(gulp.dest('../../dist/konka_wahser/'));
});

/*-----------------------imgmin------------------------*/

gulp.task('konka_wahser_imgmin', function() {
    return gulp.src('./img/**/*.{jpg,jpeg,png,ico,gif}')
        .pipe(imgmin({
            optimizationLevel: 3,
            progressive: false,
            interlaced: false,
            multipass: false
        }))
        .pipe(gulp.dest('../../dist/konka_wahser/img'));
});

/*-----------------------cssmin------------------------*/

gulp.task('konka_wahser_cssmin', function(){
    return gulp.src([ '../../dist/konka_wahser/css/konka_wahser.min.css'])
        .pipe(cssmin())
        .pipe(gulp.dest('../../dist/konka_wahser/css'));
});

/*-----------------------copy other source------------------------*/

gulp.task('konka_wahser_copy_music', function () {
    return gulp.src('./music/*')
        .pipe(copy('../../dist/konka_wahser/'))
});

gulp.task('konka_wahser_copy_js', function () {
    return gulp.src('./js/**')
        .pipe(copy('../../dist/konka_wahser/'))
});

gulp.task('konka_wahser_copy',
    gulp.series('konka_wahser_copy_music','konka_wahser_copy_js')
);

/*-----------------------build------------------------*/
gulp.task('konka_wahser_build',
    gulp.series('konka_wahser_clean',
        gulp.parallel('konka_wahser_copy', 'konka_wahser_imgmin'),
        'konka_wahser_cssmin',
        'konka_wahser_htmlmin'
    )
);








/*-----------------------babel------------------------*/
gulp.task('konka_washer_babel', function(){
    return gulp.src('./js/es6/konka_washer.js')
        .pipe(plumber())
        .pipe(babel({
            presets: ['es2015']
        }))
        .pipe(gulp.dest('./js'));
});

/*-----------------------watch------------------------*/
gulp.task('konka_washer_watch', gulp.series('konka_washer_babel', function() {
    gulp.watch('./js/es6/konka_washer.js', gulp.series('konka_washer_babel'));
}));









