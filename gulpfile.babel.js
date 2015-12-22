import gulp            from 'gulp';
import newer           from 'gulp-newer';
import uglify          from 'gulp-uglify';
import babel           from 'gulp-babel';
import eslint          from 'gulp-eslint';
import sourcemaps      from 'gulp-sourcemaps';
import sass            from 'gulp-sass';
import electronConnect from 'electron-connect';
import webpack         from 'webpack-stream';
import named           from 'vinyl-named';

const electron = electronConnect.server.create();

const webpackConf = {
  resolve: {
    extensions: ['', '.js', '.jsx'],
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel',
        query: {
          presets: ['react', 'es2015'],
        },
      },
      {
        test: /\.json$/,
        exclude: /(node_modules|bower_components|src)/,
        loader: 'json',
      },
    ],
  },
};

const webpackDevConf = Object.assign({}, webpackConf, {
  watch: true,
  devtool: '#inline-source-map',
});

const webpackProductConf = Object.assign({}, webpackConf, {
  plugins: [
    new webpack.webpack.optimize.UglifyJsPlugin({
      sourceMap: false,
      compress: {
        warnings: false,
      },
    }),
  ],
});

const app = {
  js: {},
  bin: {},
  css: {},
  html: {},
  bundle: {},
};

app.bundle.entry = ['src/app/script/mangekyou.js', 'src/app/script/worker/worker.js'];
app.bundle.dest = ['build/app/script/mangekyou.js', 'build/app/script/worker/worker.js'];
app.bundle.destPath = 'build/app/script';

app.bin.src = ['src/app/bin/mangekyou'];
app.bin.destPath = 'build/app/bin';

app.js.src = ['src/app/main.js'];
app.js.dest = ['build/app/main.js'];
app.js.destPath = 'build/app';
app.js.lintSrc = Array.prototype.concat(
  app.js.src,
  [
    'gulpfile.babel.js',
    'src/app/*.+(js|jsx)',
    'src/app/**/*.+(js|jsx)',
  ]
);

app.css.src = 'src/app/style/*.+(css|scss)';
app.css.dest = 'build/app/style/*.css';
app.css.destPath = 'build/app/style';

app.html.src = 'src/app/index.html';
app.html.dest = 'build/app/index.html';
app.html.destPath = 'build/app';

gulp.task('html', () => {
  return gulp.src(app.html.src)
    .pipe(gulp.dest(app.html.destPath));
});

gulp.task('bin', () => {
  return gulp.src(app.bin.src)
    .pipe(gulp.dest(app.bin.destPath));
});

gulp.task('lint', () => {
  return gulp.src(app.js.lintSrc)
    .pipe(eslint({ rulePaths: ['./']} ))
    .pipe(eslint.format());
});

gulp.task('css-dev', () => {
  return gulp.src(app.css.src)
    .pipe(newer(app.css.destPath))
    .pipe(sourcemaps.init())
    .pipe(sass())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(app.css.destPath));
});

gulp.task('css-product', () => {
  return gulp.src(app.css.src)
    .pipe(sass({outputStyle: 'compressed'}))
    .pipe(gulp.dest(app.css.destPath));
});

gulp.task('js-dev', () => {
  return gulp.src(app.js.src)
    .pipe(newer(app.js.destPath))
    .pipe(sourcemaps.init())
    .pipe(babel({
      presets: ['es2015'],
    }))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(app.js.destPath));
});

gulp.task('js-product', () => {
  return gulp.src(app.js.src)
    .pipe(babel({
      presets: ['es2015'],
    }))
    .pipe(uglify({compress: { warnings: false }}))
    .pipe(gulp.dest(app.js.destPath));
});

gulp.task('webpack-dev', ()=>{
  return gulp.src(app.bundle.entry)
    .pipe(named())
    .pipe(webpack(webpackDevConf))
    .pipe(gulp.dest(app.bundle.destPath));
});

gulp.task('webpack-product', ()=>{
  return gulp.src(app.bundle.entry)
    .pipe(named())
    .pipe(webpack(webpackProductConf))
    .pipe(gulp.dest(app.bundle.destPath));
});

gulp.task('serve', (callback) => {
  electron.start();
  gulp.watch(
    Array.prototype.concat(app.js.dest),
    electron.restart
  );
  gulp.watch(
    Array.prototype.concat(app.html.dest, app.css.dest, app.bundle.dest),
    electron.reload
  );
  callback();
});

gulp.task('dev', (callback) => {
  gulp.watch(app.html.src, gulp.parallel('html'));
  gulp.watch(app.css.src, gulp.parallel('css-dev'));
  gulp.watch(app.js.src, gulp.parallel('js-dev'));
  gulp.series(
    gulp.parallel(
      'html',
      'bin',
      'css-dev',
      'js-dev'
    ),
    gulp.parallel(
    'webpack-dev',
    'serve'
    )
  )();
  callback();
});

gulp.task('product', (callback) => {
  gulp.parallel(
    'html',
    'bin',
    'css-product',
    'js-product',
    'webpack-product'
  )();
  callback();
});

gulp.task('ci', (callback) => {
  gulp.parallel(
    'lint',
    'product'
  )();
  callback();
});

gulp.task('default', gulp.series('ci'), (callback) => {
  callback();
});
