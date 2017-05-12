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

gulp.task('ksf_greentea_clean', function() {
    return gulp.src('../../dist/ksf_greentea')
        .pipe(clean({force: true}));
});

/*-----------------------htmlmin------------------------*/

gulp.task('ksf_greentea_htmlmin', function() {
    return gulp.src('../../dist/ksf_greentea/*.html')
        .pipe(htmlmin({collapseWhitespace: true}))
        .pipe(gulp.dest('../../dist/ksf_greentea/'));
});

/*-----------------------imgmin------------------------*/

gulp.task('ksf_greentea_imgmin', function() {
    return gulp.src('./img/**/*.{jpg,jpeg,png,ico,gif}')
        .pipe(imgmin({
            optimizationLevel: 3,
            progressive: false,
            interlaced: false,
            multipass: false
        }))
        .pipe(gulp.dest('../../dist/ksf_greentea/img'));
});

/*-----------------------cssmin------------------------*/

gulp.task('ksf_greentea_cssmin', function(){
    return gulp.src([ '../../dist/ksf_greentea/css/*.css'])
        .pipe(cssmin())
        .pipe(gulp.dest('../../dist/ksf_greentea/css'));
});

/*-----------------------uglify------------------------*/

gulp.task('ksf_greentea_uglify', function(){
    return gulp.src(['./js/*.js'])
        .pipe(uglify())
        .pipe(gulp.dest('../../dist/ksf_greentea/js'));
});


/*-----------------------copy other source------------------------*/


gulp.task('ksf_greentea_copy_js', function () {
    return gulp.src('./js/**')
        .pipe(copy('../../dist/ksf_greentea/'))
});

gulp.task('ksf_greentea_copy_css', function () {
    return gulp.src('./css/*.css')
        .pipe(copy('../../dist/ksf_greentea/'))
});

gulp.task('ksf_greentea_copy_media', function () {
    return gulp.src('./media/*')
        .pipe(copy('../../dist/ksf_greentea/'))
});

gulp.task('ksf_greentea_copy',
    gulp.series('ksf_greentea_copy_js', 'ksf_greentea_copy_css', 'ksf_greentea_copy_media')
);

/*-----------------------usemin------------------------*/

gulp.task('ksf_greentea_usemin', function () {
    return gulp.src('./*.html')
        .pipe(usemin({
            js: [uglify()],

            // in this case css will be only concatenated (like css: ['concat']).
        }))
        .pipe(gulp.dest('../../dist/ksf_greentea/'));
});

/*-----------------------babel------------------------*/
gulp.task('ksf_greentea_babel', function(){
    return gulp.src('./js/es6/ksf_greentea.js')
        .pipe(plumber())
        .pipe(babel({
            presets: ['es2015']
        }))
        .pipe(gulp.dest('./js'));
});

/*-----------------------watch------------------------*/
gulp.task('ksf_greentea_watch', gulp.series('ksf_greentea_babel', function() {
    gulp.watch('./js/es6/ksf_greentea.js', gulp.series('ksf_greentea_babel'));
}));


/*-----------------------build------------------------*/
gulp.task('ksf_greentea_build',
    gulp.series('ksf_greentea_clean',
        gulp.parallel('ksf_greentea_copy', 'ksf_greentea_imgmin', 'ksf_greentea_usemin'),
        'ksf_greentea_cssmin', 'ksf_greentea_uglify',
        'ksf_greentea_htmlmin'
    )
);

















