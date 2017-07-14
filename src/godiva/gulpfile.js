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

gulp.task('godiva_clean', function() {
    return gulp.src('../../dist/godiva')
        .pipe(clean({force: true}));
});

/*-----------------------htmlmin------------------------*/

gulp.task('godiva_htmlmin', function() {
    return gulp.src('../../dist/godiva/*.html')
        .pipe(htmlmin({collapseWhitespace: true}))
        .pipe(gulp.dest('../../dist/godiva/'));
});

/*-----------------------imgmin------------------------*/

gulp.task('godiva_imgmin', function() {
    return gulp.src('./img/**/*.{jpg,jpeg,png,ico,gif}')
        .pipe(imgmin({
            optimizationLevel: 3,
            progressive: false,
            interlaced: false,
            multipass: false
        }))
        .pipe(gulp.dest('../../dist/godiva/img'));
});

/*-----------------------cssmin------------------------*/

gulp.task('godiva_cssmin', function(){
    return gulp.src([ '../../dist/godiva/css/*.css'])
        .pipe(cssmin())
        .pipe(gulp.dest('../../dist/godiva/css'));
});

/*-----------------------uglify------------------------*/

gulp.task('godiva_uglify', function(){
    return gulp.src(['./js/*.js'])
        .pipe(uglify())
        .pipe(gulp.dest('../../dist/godiva/js'));
});


/*-----------------------copy other source------------------------*/


gulp.task('godiva_copy_js', function () {
    return gulp.src('./js/**')
        .pipe(copy('../../dist/godiva/'))
});

gulp.task('godiva_copy_css', function () {
    return gulp.src('./css/*.css')
        .pipe(copy('../../dist/godiva/'))
});

gulp.task('godiva_copy_media', function () {
    return gulp.src('./media/*')
        .pipe(copy('../../dist/godiva/'))
});

gulp.task('godiva_copy',
    gulp.series('godiva_copy_js', 'godiva_copy_css', 'godiva_copy_media')
);

/*-----------------------usemin------------------------*/

gulp.task('godiva_usemin', function () {
    return gulp.src('./*.html')
        .pipe(usemin({
            js: [uglify()],

            // in this case css will be only concatenated (like css: ['concat']).
        }))
        .pipe(gulp.dest('../../dist/godiva/'));
});

/*-----------------------babel------------------------*/
gulp.task('godiva_babel', function(){
    return gulp.src('./js/es6/godiva.js')
        .pipe(plumber())
        .pipe(babel({
            presets: ['es2015']
        }))
        .pipe(gulp.dest('./js'));
});

/*-----------------------watch------------------------*/
gulp.task('godiva_watch', gulp.series('godiva_babel', function() {
    gulp.watch('./js/es6/godiva.js', gulp.series('godiva_babel'));
}));


/*-----------------------build------------------------*/
gulp.task('godiva_build',
    gulp.series('godiva_clean',
        gulp.parallel('godiva_copy', 'godiva_imgmin', 'godiva_usemin'),
        'godiva_cssmin', 'godiva_uglify',
        'godiva_htmlmin'
    )
);

















