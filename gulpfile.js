var gulp = require('gulp'),
    uglify = require('gulp-uglify'),
    rename = require('gulp-rename'),
    plumber = require('gulp-plumber'),
    flatten = require('gulp-flatten'),
    browserSync = require('browser-sync'),
    reload = browserSync.reload,
    sass = require('gulp-sass');


// Copy all bower files
gulp.src(['app/bower_components/*/*.min.js', 'app/bower_components/*/release/*.min.js'])
  .pipe(flatten())
  .pipe(gulp.dest('public/js'));

gulp.src('app/bower_components/*/*.min.css')
  .pipe(flatten())
  .pipe(gulp.dest('public/css'));


/*
	Scripts tasks
*/
gulp.task('scripts', function(){
	gulp.src(['app/js/modules/**/*.js','app/js/**/*.js'])
		.pipe(plumber())
		.pipe(rename({suffix:'.min'}))
		.pipe(uglify())
		.pipe(gulp.dest('public/js'))
		.pipe(reload({stream:true}));
});

/*
	Style tasks
*/
gulp.task('styles', function(){
	gulp.src('app/scss/style.scss')
		.pipe(plumber())
		.pipe(sass())
		.pipe(gulp.dest('public/css'))
		.pipe(reload({stream:true}));
});

/*
	HTML Tasks
*/
gulp.task('html', function(){
	gulp.src(['views/layouts/**/*.handlebars', 'views/**/*.handlebars'])
	.pipe(reload({stream:true}));
});


/*
	Browser Sync reload
*/
gulp.task('browser-sync', function(){
  browserSync.init({
    port: 3000,
    proxy: {
      target: 'localhost:3002',
      ws: true
    }
  });
});

/*
	Watch tasks
*/
gulp.task('watch', function(){
	gulp.watch('app/js/**/*.js', ['scripts']);
	gulp.watch('app/scss/**/*.scss', ['styles']);
  gulp.watch(['views/layouts/**/*.handlebars', 'views/**/*.handlebars'], ['html']);
});

/*
	default tasks
*/

gulp.task('default', ['scripts', 'styles', 'html', 'browser-sync', 'watch']);
