const gulp = require('gulp'),
sass = require('gulp-sass'),
bs = require('browser-sync').create(),
autoPrefixer = require('gulp-autoprefixer'),
minify = require('gulp-clean-css'),
sourceMaps = require('gulp-sourcemaps'),
svg = require('gulp-svg-sprites'),
cheerio = require('gulp-cheerio'),
fileInclude = require('gulp-file-include');

function scss(){
    return gulp.src('./scss/**/*.scss')
        .pipe(sourceMaps.init())
        .pipe(sass())
        .pipe(autoPrefixer({cascade: false}))
        .pipe(minify({compactabilty: 'ie8'}))
        .pipe(sourceMaps.write())
        .pipe(gulp.dest('./css'))
        .pipe(bs.stream())
}
function watch(){
    bs.init({
        server:{
            baseDir:'./'
        }
    });
    
    gulp.watch('./scss/**/*.scss',scss);
    gulp.watch('./*.html').on('change',bs.reload);
    gulp.watch('./js/*.js').on('change',bs.reload);
}
function svgSprite(){
    return gulp.src('./svg/**/*.svg')
    .pipe(svg({
        mode: "symbols",
        svgId: "icon-%f"
    }))
    .pipe(gulp.dest("./"))
    .pipe(gulp.src('./index.html'))
    .pipe(fileInclude({
        prefix: '@@',
        basepath: '@file'
    }))
    .pipe(gulp.dest('./'))
}


exports.svgSprite = svgSprite;
exports.watch = watch;