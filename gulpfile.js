var gulp                = require('gulp'),
    sass                = require('gulp-sass'),
    sourcemaps          = require('gulp-sourcemaps'),
    rename              = require('gulp-rename'),
    cmq                 = require('gulp-group-css-media-queries'),
    cssmin              = require('gulp-cssmin');

gulp.task('css', function(){
    return gulp.src('style/sass/*.sass')
        .pipe(sass({
            errLogToConsole: true,
            includePaths: [
                'style/',
                'style/sass/',
                'vendor/',
                'node_modules/font-awesome/scss/'
            ]
        }))
        .on('error', function(error){
            console.log(error.formatted);
            this.emit('end');
        })
        .pipe(cmq())
        .pipe(gulp.dest('style/css'))
        .pipe(cssmin())
        .pipe(rename({suffix: '.min'}))
        .pipe(sourcemaps.init())
        .pipe(sourcemaps.write('maps'))
        .pipe(gulp.dest('style/css'));
});

gulp.task('watch', ['css'], function(){
    gulp.watch('style/**/*.sass', ['css']);
});

gulp.task('default', ['css']);