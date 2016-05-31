var gulp = require('gulp');
var include = require('gulp-include');
var uglify = require('gulp-uglify');

gulp.task('default', function() {
    gulp.start('javascript');
});

gulp.task('watch', function() {
    gulp.watch('./src/**/*.js', ['javascript']);
})

gulp.task('javascript', function() {
   gulp.src('./src/main.js')
        .pipe(include({
                extensions: "js",
                includePaths: [
                __dirname + "/node_modules"
            ]
        }))
        .pipe(uglify({
            mangle: false
        }))
        .pipe(gulp.dest('./public/assets/javascript'));
});