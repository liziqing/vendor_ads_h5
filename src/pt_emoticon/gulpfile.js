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

/**  pt_emoticon  **/

/*-----------------------clean------------------------*/

gulp.task('pt_emoticon_clean', function() {
    return gulp.src('../../dist/pt_emoticon')
        .pipe(clean({force: true}));
});
gulp.task('wechatfeeds_clean', function() {
    return gulp.src('../../dist/pt_emoticon')
        .pipe(clean({force: true}));
});

/*-----------------------htmlmin------------------------*/

gulp.task('pt_emoticon_htmlmin', function() {
    return gulp.src('../src/pt_emoticon/html/index.html')
        .pipe(htmlmin({collapseWhitespace: true}))
        .pipe(gulp.dest('../../dist/pt_emoticon/'));
});
gulp.task('wechatfeeds_htmlmin', function() {
    return gulp.src('../../dist/pt_emoticon/wechat.html')
        .pipe(htmlmin({collapseWhitespace: true}))
        .pipe(gulp.dest('../../dist/pt_emoticon/'));
});

/*-----------------------imgmin------------------------*/

gulp.task('pt_emoticon_imgmin', function() {
    return gulp.src('../src/pt_emoticon/img/*.{jpg,jpeg,png,ico,gif}')
        .pipe(imgmin({
            optimizationLevel: 3,
            progressive: false,
            interlaced: false,
            multipass: false
        }))
        .pipe(gulp.dest('../../dist/pt_emoticon/img'));
});
gulp.task('wechatfeeds_imgmin', function() {
    return gulp.src('./img/wechatfeeds/*.{jpg,jpeg,png,ico,gif}')
        .pipe(imgmin({
            optimizationLevel: 3,
            progressive: false,
            interlaced: false,
            multipass: false
        }))
        .pipe(gulp.dest('../../dist/pt_emoticon/img/wechatfeeds/'));
});

/*-----------------------cssmin------------------------*/

gulp.task('pt_emoticon_cssmin', function(){
    return gulp.src([ '../vendor/swiper/swiper.css','./css/pt_emoticon.css'])
        .pipe(concat('pt_emoticon.css'))
        .pipe(cssmin())
        .pipe(gulp.dest('../../dist/pt_emoticon/css'));
});
gulp.task('wechatfeeds_cssmin', function(){
    return gulp.src(['../../dist/pt_emoticon/css/wechat_all.min.css'])
        .pipe(cssmin())
        .pipe(gulp.dest('../../dist/pt_emoticon/css'));
});

/*-----------------------uglify------------------------*/


gulp.task('pt_emoticon_uglify', function(){
    return gulp.src('../src/pt_emoticon/js/pt_emoticon.js')
        .pipe(uglify())
        .pipe(gulp.dest('../../dist/pt_emoticon/js'));
});

gulp.task('wechatfeeds_uglify', function () {
    return gulp.src(['./js/wechat.js','../vendor/swiper/swiper.jquery.min.js','../vendor/base/wxJsSdkConfig.js'])
        .pipe(uglify())
        .pipe(gulp.dest('../../dist/pt_emoticon/js'));
});

/*-----------------------babel------------------------*/

gulp.task('pt_emoticon_babel', function(){
    return gulp.src('../src/pt_emoticon/js/es6/pt_emoticon.js')
        .pipe(plumber())
        .pipe(babel({
            presets: ['es2015']
        }))
        .pipe(gulp.dest('../src/pt_emoticon/js'));
});

/*-----------------------------------------------*/

gulp.task('wechatfeeds_usemin', function () {
    return gulp.src('./wechat.html')
        .pipe(usemin({
            js: [uglify()],

            // in this case css will be only concatenated (like css: ['concat']).
        }))
        .pipe(gulp.dest('../../dist/pt_emoticon/'));
});

gulp.task('pt_emoticon_watch', gulp.series('pt_emoticon_babel', function() {
    gulp.watch('../src/pt_emoticon/js/es6/pt_emoticon.js', gulp.series('pt_emoticon_babel'));
}));

/*-----------------------build------------------------*/

gulp.task('pt_emoticon_build',
    gulp.series('pt_emoticon_clean',
        gulp.parallel('pt_emoticon_htmlmin', 'pt_emoticon_imgmin', 'pt_emoticon_cssmin')
    )
);
gulp.task('wechatfeeds_build',
    gulp.series('wechatfeeds_clean',
        gulp.parallel('wechatfeeds_imgmin', 'wechatfeeds_usemin'),
        'wechatfeeds_cssmin',
        'wechatfeeds_htmlmin'
    )
);







