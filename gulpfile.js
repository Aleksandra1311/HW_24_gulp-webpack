const path = require('path');

const PATHS = {
    src: path.resolve(__dirname, 'src'),
    dist: path.resolve(__dirname, 'dist'),
};
PATHS.js = path.resolve(PATHS.src, 'js', '**', '*.js');


const { parallel, src, dest, series, watch } = require('gulp');
const concat = require('gulp-concat');
const uglify = require('gulp-uglify'); 
const cssmin = require('gulp-cssmin'); 
const htmlmin = require('gulp-htmlmin');
const browserSync = require('browser-sync').create(); 

function copyJs() {
    return src(PATHS.js)
        .pipe(concat('app.js'))
        .pipe(dest('./dist/js'));
}

function copyJsMin() {
    return src('./src/js/**/*.js')
        .pipe(concat('app.js'))
        .pipe(uglify())
        .pipe(dest('./dist/js'));
}

function copyCss() {
    return src('./src/css/**/*.css')
        .pipe(dest('./dist/css'));;
}

function copyCssMin() {
    return src('./src/css/**/*.css')
        .pipe(cssmin())
        .pipe(dest('./dist/css'));;
}
function copyVenderJS() { 
    return src([
        './node_modules/jquery/dist/jquery.min.js',
    ])
    .pipe(concat('vendor.js'))
    .pipe(dest('./dist/js'));
}

function copyHtml() { 
    return src('./src/index.html')
        .pipe(dest('./dist')); 
}
function copyHtmlMin() { 
    return src('./src/index.html')
        .pipe(htmlmin({
            collapseWhitespace: true,
            removeComments: true,
        }))
        .pipe(dest('./dist'));
}

function serve(cb) {

    watch('./src/**/*.js', parallel(copyJs,));
    watch('./src/**/*.css', parallel(copyHtml, copyCss));

    
}

module.exports = {
    serve: series(
        parallel(copyHtml, copyJs, copyVenderJS, copyCss),
        serve
    ),
    build: parallel(copyHtml, copyJs, copyVenderJS, copyCss),
    minify: parallel(copyCssMin, copyJsMin),
    allMinify: parallel(copyHtmlMin,copyCssMin, copyJsMin),
};
