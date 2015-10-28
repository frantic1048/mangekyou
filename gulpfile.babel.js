import gulp from 'gulp';
import babel from 'gulp-babel';
import sass from 'gulp-sass';
import newer from 'gulp-newer';
import sourcemaps from 'gulp-sourcemaps';
import eslint from 'gulp-eslint';


const app = {
  js: {},
  css: {},
  html: {},
};

const vendor = {
  js: {},
  css: {},
  font: {},
};

app.js.src = [
  'src/app/main.js',
  'src/app/**/*.+(js|jsx)',
];
app.js.dest = [
  'build/app/main.js',
  'build/app/**/*.js',
];
app.js.destPath = 'build/app';
app.js.lintSrc = [
  app.js.src,
  'gulpfile.babel.js',
];

app.css.src = 'src/app/style/*.+(css|scss)';
app.css.srcCompiled = 'src/app/style/*.css';
app.css.dest = 'build/app/style/app.css';
app.css.destPath = 'build/app/style';

app.html.src = 'src/app/index.html';
app.html.destPath = 'build/app';

vendor.font.src = [
  'bower_components/material-design-icons/iconfont/*.+(eot|ttf|woff|woff2)',
];
vendor.font.destPath = 'build/app/font';

gulp.task('vendor-font', () => {
  return gulp.src(vendor.font.src)
    .pipe(gulp.dest(vendor.font.destPath));
});

gulp.task('vendor', gulp.series(
  'vendor-font'
));

gulp.task('html', () => {
  return gulp.src(app.html.src)
    .pipe(gulp.dest(app.html.destPath));
});

gulp.task('lint', () => {
  return gulp.src(app.js.lintSrc)
    .pipe(eslint({ rulePaths: ['./']} ))
    .pipe(eslint(eslint.format()));
});

gulp.task('css', () => {
  return gulp.src(app.css.src)
    .pipe(newer(app.css.destPath))
    .pipe(sourcemaps.init())
    .pipe(sass())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(app.css.destPath));
});

gulp.task('js', () => {
  return gulp.src(app.js.src)
    .pipe(newer(app.js.destPath))
    .pipe(sourcemaps.init())
    .pipe(babel({ modules: 'common' }))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(app.js.destPath));
});

gulp.task('dev', (callback) => {
  gulp.watch(app.html.src, gulp.parallel('html'));
  gulp.watch(app.css.src, gulp.parallel('css'));
  gulp.watch(app.js.src, gulp.parallel('js'));
  gulp.parallel(
    'html',
    'css',
    'js',
  )();
  callback();
});

gulp.task('default', (callback) => {
  callback();
});
