var gulp = require('gulp');
var pug = require('gulp-pug');
var pug_plugin_ng = require('pug-plugin-ng');
var watch = require('gulp-watch');
var del = require('del');

var pug_opts = { doctype: 'html', plugins: [pug_plugin_ng] };

gulp.task('clean', function() {
    return del([
        'src/**/*.html'
    ]);
});

gulp.task('build', function(done) {
    gulp
        .src('src/**/*.pug')
        .pipe(pug(pug_opts))
        .pipe(gulp.dest('./src/'))
        .on('end', done);
});

gulp.task('watch', [ 'clean', 'build' ], function() {
    watch([ 'src/**/*.pug' ], function() { gulp.start('build'); });
});

gulp.task('default', [ 'clean', 'build' ]);