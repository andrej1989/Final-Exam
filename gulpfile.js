var gulp = require('gulp');
var spritesmith = require('gulp.spritesmith');
var autoprefixer = require('gulp-autoprefixer');
var concat = require('gulp-concat');
var imagemin = require('gulp-imagemin');
var mincss = require('gulp-minify-css');
var notify = require('gulp-notify');
var sass = require('gulp-sass');
var uglify = require('gulp-uglify');
var browserSync = require('browser-sync');
var reload      = browserSync.reload;

var paths = {
  html:['index.html'],
  css:['src/scss/style.scss'],
  script:['src/js/*.js']
};


gulp.task('sprite', function () {
  var spriteData = gulp.src('src/img/sprite/*.png').pipe(spritesmith({
    imgName: 'sprite.png',
    cssName: 'sprite.scss', 
    padding: 20
  }));
  return spriteData.pipe(gulp.dest('src/img/'));
});

gulp.task('imgmin', () =>
    gulp.src('src/img/*.{png,jpg,jpeg,gif,svg}')
        .pipe(imagemin())
        .pipe(gulp.dest('img/'))
);

gulp.task('scripts', function() {
  return gulp.src('src/js/*.js')
    .pipe(concat('script.js'))
    //.pipe(uglify('script.js'))
    .pipe(gulp.dest('js/'))
    .pipe(notify('js created'))
    .pipe(reload({stream:true}));
});

gulp.task('sass', function () {
  return gulp.src('src/scss/style.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer({
            browsers: ['last 30 versions', 'ie 8', 'ie 9'],
            cascade: false
        }))
    .pipe(mincss())
    .pipe(gulp.dest('css/'))
    .pipe(notify('css created'))
    .pipe(reload({stream:true}));
});

gulp.task('html', function(){
  return gulp.src(paths.html)
  .pipe(reload({stream:true}));
});

gulp.task('browserSync', function() {
  browserSync({
    server: {
      baseDir: "./"
    },
    port: 8080,
    open: true,
    notify: false
  });
});

 gulp.task('watcher',function(){
    gulp.watch(paths.css, ['sass']);
    gulp.watch(paths.script, ['scripts']);
});

gulp.task('default', ['watcher', 'browserSync']);