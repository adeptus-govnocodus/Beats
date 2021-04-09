const { src, dest, task, series, parallel, watch } = require('gulp');
const rm = require('gulp-rm');
const sass = require('gulp-sass');
const concat = require('gulp-concat');
const browserSync = require('browser-sync');
const sassGlob = require('gulp-sass-glob');
const autoprefixer = require('gulp-autoprefixer');
const px2rem = require('gulp-px2rem-converter');
const mediaGroup = require('gulp-group-css-media-queries');
const cleanCss = require('gulp-clean-css');
const sourcemap = require('gulp-sourcemaps');
const babel = require('gulp-babel');
const uglify = require('gulp-uglify')
const svgo = require('gulp-svgo');
const svgSourcemap = require('gulp-svg-sprite');
const gulpIf = require('gulp-if');


const env = process.env.NODE_ENV;

const { DIST_PATH, SRC_PATH, STYLES_LIBS, JAVASCRIPT_LIBS } = require('./gulp.config');


task('clean', ()=>{
  return src(`${DIST_PATH}/**/*`, { read: false }).pipe(rm());
});

task('copy:html',()=>{
  return src(`${SRC_PATH}/*.html`)
    .pipe(dest(DIST_PATH))
    .pipe(browserSync.reload({ stream: true }));
});

task('styles', ()=>{
  return src([...STYLES_LIBS, `${SRC_PATH}/styles/main.scss`])
    .pipe(gulpIf(env === 'dev', sourcemap.init()))
    .pipe(concat('main.min.scss'))
    .pipe(sassGlob())
    .pipe(sass().on('error', sass.logError))
    .pipe(px2rem())
    .pipe(gulpIf(env === 'dev', 
      autoprefixer({
        cascade: false
      }))
    )
    .pipe(mediaGroup())
    .pipe(cleanCss())
    .pipe(gulpIf(env === 'dev', sourcemap.write()))
    .pipe(dest(DIST_PATH))
    .pipe(browserSync.reload({ stream: true }));
});

task('javascript',()=>{
  return src([...JAVASCRIPT_LIBS, `${SRC_PATH}/js/*.js`],{ allowEmpty: true })
    .pipe(gulpIf(env === 'dev', sourcemap.init()))
    .pipe(concat('main.min.js', { newLine: ';' }))
    .pipe(gulpIf(env === 'prod', babel({ presets: ['@babel/env'] }) ))
    .pipe(gulpIf(env === 'prod', uglify()))
    .pipe(gulpIf(env === 'dev', sourcemap.write()))
    .pipe(dest(DIST_PATH))
    .pipe(browserSync.reload({ stream: true }));
});

task('svg', ()=>{
  return src(`${SRC_PATH}/svg/**/*.svg`)
    .pipe(
      svgo({
        plugins: [
          {
            removeAttrs: { attrs: '(fill|stroke|style|width|height|data.*)' }
          }
        ]
      })
    )
    .pipe(
      svgSourcemap({
        mode: {
          symbol:{
            sprite: "../sprite.svg"
          }
        }
      })
    )
    .pipe(dest(DIST_PATH))
    .pipe(browserSync.reload({ stream: true }));
})

task('copy:img', ()=>{
  return src(`${SRC_PATH}/img/**/*`)
    .pipe(dest(`${DIST_PATH}/img`))
    .pipe(browserSync.reload({ stream: true }));
})

task('server', ()=>{
  browserSync.init({
    server: {
      baseDir: DIST_PATH
    },
    open: false
  });
})


watch(`${SRC_PATH}/*.html`, series('copy:html'));
watch(`${SRC_PATH}/styles/**/*.scss`, series('styles'));
watch(`${SRC_PATH}/js/**/*.js`, series('javascript'));
watch(`${SRC_PATH}/svg/**/*.svg`, series('svg'));
watch(`${SRC_PATH}/img/**/*`, series('copy:img'));


task(
  'default',
  series('clean', parallel('copy:html', 'styles', 'javascript', 'svg', 'copy:img'), 'server')
);