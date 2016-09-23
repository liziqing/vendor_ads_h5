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









