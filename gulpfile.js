var gulp = require("gulp");
var browserify = require("browserify");
var source = require('vinyl-source-stream');
var watchify = require("watchify");
var tsify = require("tsify");
var gutil = require("gulp-util");
var serve = require('gulp-serve');


var watchedBrowserify = watchify(browserify({
    basedir: '.',
    debug: true,
    entries: ['./lib/GGPlayer.ts'],
    cache: {},
    packageCache: {}

}).require('./lib/GGPlayer.ts', {expose: 'GGPlayer'}).plugin(tsify));

gulp.task("copy-html", function () {
    return gulp.src(paths.pages)
        .pipe(gulp.dest("dist"));

});


gulp.task('serve', serve({
    root: ['dist', 'lib', 'html']
}));


function bundle() {
    return watchedBrowserify
        .bundle()
        .on('error', function (err) {
            console.log(err)
        } )
        .pipe(source('bundle.js'))
        .pipe(gulp.dest("dist"));

}

gulp.task("default", ['serve'], bundle);
watchedBrowserify.on("update", bundle);
watchedBrowserify.on("log", gutil.log);