var gulp = require("gulp");
var browserify = require("browserify");
var source = require('vinyl-source-stream');
var watchify = require("watchify");
var tsify = require("tsify");
var gutil = require("gulp-util");
var serve = require('gulp-serve');

var paths = {
    pages: ['src/*.html']
};

var watchedBrowserify = watchify(browserify({
    basedir: '.',
    debug: true,
    entries: ['./src/GGPlayer.ts'],
    cache: {},
    packageCache: {}

}).require('./src/GGPlayer.ts', {expose: 'GGPlayer'}).plugin(tsify));

gulp.task("copy-html", function () {
    return gulp.src(paths.pages)
        .pipe(gulp.dest("dist"));
});


gulp.task('serve', serve({
    root: ['dist', 'src', 'html']
}));


function bundle() {
    return watchedBrowserify
        .bundle()
        .pipe(source('bundle.js'))
        .pipe(gulp.dest("dist"));
}

gulp.task("default", ['serve'], bundle);
watchedBrowserify.on("update", bundle);
watchedBrowserify.on("log", gutil.log);