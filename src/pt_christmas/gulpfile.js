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

gulp.task('pt_christmas_clean', function() {
    return gulp.src('../../dist/pt_christmas')
        .pipe(clean({force: true}));
});

/*-----------------------htmlmin------------------------*/

gulp.task('pt_christmas_htmlmin', function() {
    return gulp.src('../../dist/pt_christmas/*.html')
        .pipe(htmlmin({collapseWhitespace: true}))
        .pipe(gulp.dest('../../dist/pt_christmas/'));
});

/*-----------------------imgmin------------------------*/

gulp.task('pt_christmas_imgmin', function() {
    return gulp.src('./img/**/*.{jpg,jpeg,png,ico,gif}')
        .pipe(imgmin({
            optimizationLevel: 3,
            progressive: false,
            interlaced: false,
            multipass: false
        }))
        .pipe(gulp.dest('../../dist/pt_christmas/img'));
});

/*-----------------------less------------------------*/
gulp.task('pt_christmas_less', function () {
    return gulp.src('./css/**/*.less')
        .pipe(less())
        .pipe(gulp.dest('./css'));
});

/*-----------------------cssmin------------------------*/

gulp.task('pt_christmas_cssmin', function(){
    return gulp.src([ '../../dist/pt_christmas/css/pt_christmas.min.css'])
        .pipe(cssmin())
        .pipe(gulp.dest('../../dist/pt_christmas/css'));
});

gulp.task('pt_christmas_wx_lessmin', function(){
    return gulp.src('./css/ending_origin.less')
        .pipe(less())
        .pipe(cssmin())
        .pipe(rename('ending.min.css'))
        .pipe(gulp.dest('../../dist/pt_christmas/css/'));
});

gulp.task('pt_christmas_wb_lessmin', function(){
    return gulp.src('./css/ending.less')
        .pipe(less())
        .pipe(cssmin())
        .pipe(rename('wbEndingPage.min.css'))
        .pipe(gulp.dest('../../dist/pt_christmas/css/'));
});

/*-----------------------uglify------------------------*/

gulp.task('pt_christmas_uglify', function(){
    return gulp.src(['./js/vendor/wxmoment/wxmoment.min.js', './js/vendor/wxmoment/OrientationTip.js', './js/vendor/monitor/monitor.js'])
        .pipe(uglify())
        .pipe(gulp.dest('../../dist/pt_christmas/js'));
});

gulp.task('pt_christmas_uglify_wx', function(){
    return gulp.src(['./js/base/require.js'])
        .pipe(uglify())
        .pipe(gulp.dest('./js/base/wechat/require_min.js'));
});

/*-----------------------copy other source------------------------*/

gulp.task('pt_christmas_copy_music', function () {
    return gulp.src('./music/*')
        .pipe(copy('../../dist/pt_christmas/'))
});

gulp.task('pt_christmas_copy_js', function () {
    return gulp.src('./js/**')
        .pipe(copy('../../dist/pt_christmas/'))
});

gulp.task('pt_christmas_copy_img', function () {
    return gulp.src('./img/**')
        .pipe(copy('../../dist/pt_christmas/'))
});

gulp.task('pt_christmas_copy_mp_vertify', function () {
    return gulp.src('./*.txt')
        .pipe(copy('../../dist/pt_christmas/'))
});

gulp.task('pt_christmas_copy_vendor', function () {
    return gulp.src('../vendor/**')
        .pipe(copy('../../dist/pt_christmas/'))
});

gulp.task('pt_christmas_copy_pc_css', function () {
    return gulp.src('./css/ike/*.css')
        .pipe(copy('../../dist/pt_christmas/'))
});

gulp.task('pt_christmas_copy',
    gulp.series('pt_christmas_copy_music','pt_christmas_copy_js', 'pt_christmas_copy_img', 'pt_christmas_copy_mp_vertify', 'pt_christmas_copy_vendor', 'pt_christmas_copy_pc_css')
);

/*-----------------------usemin------------------------*/

gulp.task('pt_christmas_usemin', function () {
    return gulp.src('./*.html')
        .pipe(usemin({
            js: [uglify()],

            // in this case css will be only concatenated (like css: ['concat']).
        }))
        .pipe(gulp.dest('../../dist/pt_christmas/'));
});

/*-----------------------babel------------------------*/
gulp.task('pt_christmas_babel', function(){
    return gulp.src('./js/es6/*.js')
        .pipe(plumber())
        .pipe(babel({
            presets: ['es2015']
        }))
        .pipe(gulp.dest('./js'));
});

/*-----------------------watch------------------------*/
gulp.task('pt_christmas_watch', gulp.series('pt_christmas_less','pt_christmas_babel', function() {
    gulp.watch('./css/pt_christmas.less', gulp.series('pt_christmas_less'));
    gulp.watch('./css/ending_origin.less', gulp.series('pt_christmas_wx_lessmin'));
    gulp.watch('./css/ending.less', gulp.series('pt_christmas_less'));
    gulp.watch('./js/es6/pt_christmas.js', gulp.series('pt_christmas_babel'));
    gulp.watch('./js/es6/ending_origin.js', gulp.series('pt_christmas_babel'));
    gulp.watch('./js/es6/ending.js', gulp.series('pt_christmas_babel'));
}));

/*-----------------------watch PC------------------------*/
gulp.task('pt_christmas_watch_pc', gulp.series('pt_christmas_copy_pc_css','pt_christmas_usemin', 'pt_christmas_copy_img', function() {
    gulp.watch('./css/ike/*.css', gulp.series('pt_christmas_copy_pc_css'));
    gulp.watch('./*.html', gulp.series('pt_christmas_usemin'));
    gulp.watch('./img/pc_ending/**', gulp.series('pt_christmas_copy_img'));
    gulp.watch('./js/ending_tx.js', gulp.series('pt_christmas_copy_js'));
    
}));


/*-----------------------watch Weibo------------------------*/
gulp.task('pt_christmas_watch_wb', gulp.series('pt_christmas_copy_pc_css','pt_christmas_usemin', 'pt_christmas_copy_img', function() {
    gulp.watch('./css/ending.less', gulp.series('pt_christmas_wb_lessmin'));
    gulp.watch('./ending.html', gulp.series('pt_christmas_usemin'));
    gulp.watch('./js/es6/ending.js', gulp.series('pt_christmas_babel'));
    
}));



/*-----------------------build------------------------*/
gulp.task('pt_christmas_build',
    gulp.series('pt_christmas_clean',
        'pt_christmas_babel',
        gulp.parallel('pt_christmas_copy', 'pt_christmas_usemin'),
        'pt_christmas_wb_lessmin',
        'pt_christmas_cssmin',
        'pt_christmas_htmlmin'
    )
);

















