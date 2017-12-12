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
var copy = require('gulp-copy');









/*-----------------------clean------------------------*/

gulp.task('ohui_clean', function() {
    return gulp.src('../../dist/ohui')
        .pipe(clean({force: true}));
});

/*-----------------------htmlmin------------------------*/

gulp.task('ohui_htmlmin', function() {
    return gulp.src('../../dist/ohui/*.html')
        .pipe(htmlmin({collapseWhitespace: true}))
        .pipe(gulp.dest('../../dist/ohui/'));
});

/*-----------------------imgmin------------------------*/

gulp.task('ohui_imgmin', function() {
    return gulp.src('./img/**/*.{jpg,jpeg,png,ico,gif}')
        .pipe(imgmin({
            optimizationLevel: 3,
            progressive: false,
            interlaced: false,
            multipass: false
        }))
        .pipe(gulp.dest('../../dist/ohui/img'));
});

/*-----------------------cssmin------------------------*/

gulp.task('ohui_cssmin', function(){
    return gulp.src([ '../../dist/ohui/css/*.css'])
        .pipe(cssmin())
        .pipe(gulp.dest('../../dist/ohui/css'));
});

/*-----------------------uglify------------------------*/

gulp.task('ohui_uglify', function(){
    return gulp.src(['./js/*.js'])
        .pipe(uglify())
        .pipe(gulp.dest('../../dist/ohui/js'));
});


/*-----------------------copy other source------------------------*/


gulp.task('ohui_copy_js', function () {
    return gulp.src('./js/**')
        .pipe(copy('../../dist/ohui/'))
});

gulp.task('ohui_copy_css', function () {
    return gulp.src('./css/*.css')
        .pipe(copy('../../dist/ohui/'))
});

gulp.task('ohui_copy_media', function () {
    return gulp.src('./media/*')
        .pipe(copy('../../dist/ohui/'))
});

gulp.task('ohui_copy',
    gulp.series('ohui_copy_js', 'ohui_copy_css', 'ohui_copy_media')
);

/*-----------------------usemin------------------------*/

gulp.task('ohui_usemin', function () {
    return gulp.src('./*.html')
        .pipe(usemin({
            js: [uglify()],

            // in this case css will be only concatenated (like css: ['concat']).
        }))
        .pipe(gulp.dest('../../dist/ohui/'));
});

/*-----------------------babel------------------------*/
gulp.task('ohui_babel', function(){
    return gulp.src('./js/es6/ohui.js')
        .pipe(plumber())
        .pipe(babel({
            presets: ['es2015']
        }))
        .pipe(gulp.dest('./js'));
});

/*-----------------------watch------------------------*/
gulp.task('ohui_watch', gulp.series('ohui_babel', function() {
    gulp.watch('./js/es6/ohui.js', gulp.series('ohui_babel'));
}));


/*-----------------------build------------------------*/
gulp.task('ohui_build',
    gulp.series(
        gulp.parallel('ohui_copy', 'ohui_imgmin', 'ohui_usemin'),
        'ohui_cssmin', 'ohui_uglify',
        'ohui_htmlmin'
    )
);

















