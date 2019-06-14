var gulp = require('gulp'); 

// Include Our Plugins
var sass = require('gulp-sass');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');

// Copy the HTML files.
gulp.task('html', function() {
    return gulp.src('src/*.html')
        .pipe(gulp.dest('www/'));
});

// Compile Our Styles.
gulp.task('styles', function() {
    return gulp.src('src/css/*.css')
        .pipe(concat('all.css'))
        .pipe(sass())
        .pipe(gulp.dest('www'));
});

// Concatenate & Minify JS.
gulp.task('scripts', function() {
    return gulp.src([ 'src/js/require.js', 'src/js/*.js', 'src/squire/squire-raw.js' ])
        .pipe(concat('all.js'))
        .pipe(gulp.dest('www'))
        .pipe(rename('all.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('www'));
});

// Integration of Squire Wysiwyg editor.
gulp.task('squire', function() {
    return gulp.src([ 'src/squire/squire.js', 'src/squire/squire.html' ])
        .pipe(gulp.dest('www/squire'));
});

// Watch Files For Changes.
gulp.task('watch', function() {
    gulp.watch('src/*.html', ['html']);
    gulp.watch('src/js/*.js', ['scripts']);
    gulp.watch('src/css/*.css', ['styles']);
});

// Default Task
gulp.task('default', ['html', 'squire', 'styles', 'scripts', 'watch']);
