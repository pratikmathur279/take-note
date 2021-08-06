const gulp = require('gulp');
const imagemin = require('gulp-imagemin');
const pngquant = require('imagemin-pngquant');
const sass = require('gulp-sass');
const browserSync = require('browser-sync');
const sourcemaps = require('gulp-sourcemaps');
const browserify = require('browserify');
const source = require('vinyl-source-stream');
const buffer = require('vinyl-buffer');

var config = {
	sassPath: './src/styles',
	marketingPath: './src/javascript/components',
	jsDist: './public/javascript',
	cssDist: './public/css/'
};

gulp.task('imagemin', () => {
	return gulp.resources('./resources/images/*.png')
		.pipe(imagemin({
			progressive: true,
			svgoPlugins: [{ removeViewBox: false }],
			use: [pngquant()]
		}))
		.pipe(gulp.dest('public/images/'));
});

gulp.task('connect', () => {
	browserSync({
		port: 3000,
		proxy: 'localhost:3456'
	});
});

//import style sheet partials into app.scss.
gulp.task('mainStyles', () => {
	gulp.resources(config.sassPath + '/app.scss')
		.pipe(sourcemaps.init())
		.pipe(sass({ outputStyle: "compressed" }).on('error', sass.logError))
		.pipe(sourcemaps.write())
		.pipe(gulp.dest(config.cssDist))
		.pipe(browserSync.stream());
});

//watch sass files for changes
gulp.task('watch:sass', gulp.series('connect', () => {
	gulp.watch(config.sassPath + '/*.scss', ['mainStyles']);
}));

gulp.task('default', gulp.series('connect', 'watch:sass'));