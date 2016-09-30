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

gulp.task('konka_washer_clean', function() {
    return gulp.src('../../dist/konka_washer')
        .pipe(clean({force: true}));
});

/*-----------------------htmlmin------------------------*/

gulp.task('konka_washer_htmlmin', function() {
    return gulp.src('../../dist/konka_washer/index.html')
        .pipe(htmlmin({collapseWhitespace: true}))
        .pipe(gulp.dest('../../dist/konka_washer/'));
});

/*-----------------------imgmin------------------------*/

gulp.task('konka_washer_imgmin', function() {
    return gulp.src('./img/**/*.{jpg,jpeg,png,ico,gif}')
        .pipe(imgmin({
            optimizationLevel: 3,
            progressive: false,
            interlaced: false,
            multipass: false
        }))
        .pipe(gulp.dest('../../dist/konka_washer/img'));
});

/*-----------------------cssmin------------------------*/

gulp.task('konka_washer_cssmin', function(){
    return gulp.src([ '../../dist/konka_washer/css/konka_washer.min.css'])
        .pipe(cssmin())
        .pipe(gulp.dest('../../dist/konka_washer/css'));
});

/*-----------------------uglify------------------------*/

gulp.task('konka_washer_uglify', function(){
    return gulp.src(['./js/vendor/wxmoment/wxmoment.min.js', './js/vendor/wxmoment/OrientationTip.js', './js/vendor/monitor/monitor.js'])
        .pipe(uglify())
        .pipe(gulp.dest('../../dist/konka_washer/js'));
});

gulp.task('konka_washer_uglify_wx', function(){
    return gulp.src(['./js/base/util.js'])
        .pipe(uglify())
        .pipe(gulp.dest('./js/base/wechat/util_min.js'));
});

/*-----------------------copy other source------------------------*/

gulp.task('konka_washer_copy_music', function () {
    return gulp.src('./music/*')
        .pipe(copy('../../dist/konka_washer/'))
});

gulp.task('konka_washer_copy_js', function () {
    return gulp.src('./js/**')
        .pipe(copy('../../dist/konka_washer/'))
});

gulp.task('konka_washer_copy',
    gulp.series('konka_washer_copy_music','konka_washer_copy_js')
);

/*-----------------------usemin------------------------*/

gulp.task('konka_washer_usemin', function () {
    return gulp.src('./index.html')
        .pipe(usemin({
            js: [uglify()],

            // in this case css will be only concatenated (like css: ['concat']).
        }))
        .pipe(gulp.dest('../../dist/konka_washer/'));
});

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


/*-----------------------build------------------------*/
gulp.task('konka_washer_build',
    gulp.series('konka_washer_clean',
        'konka_washer_babel',
        gulp.parallel('konka_washer_copy', 'konka_washer_imgmin', 'konka_washer_usemin'),
        'konka_washer_cssmin',
        'konka_washer_htmlmin'
    )
);

















