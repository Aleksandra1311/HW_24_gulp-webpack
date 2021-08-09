const path = require('path'); // встроенная библиотека в node.js, специальный модуль для работы с путями файлов(на разных опер сист использ / или \)

const PATHS = {
    src: path.resolve(__dirname, 'src'), //__dirname в текущей папке
    dist: path.resolve(__dirname, 'dist'),
};
PATHS.js = path.resolve(PATHS.src, 'js', '**', '*.js');


// const gulp = require('gulp'); // но мы сразу использ деструкрутизацию поэтому перепишем код ниже
const { parallel, src, dest, series, watch } = require('gulp'); //parallel - файлы копир паралельно, src - создание трубы, dest - Destination(путь назначения)
const concat = require('gulp-concat'); //плагин для склейки наших ссылок/папок из нескольких в 1 на подключение
const uglify = require('gulp-uglify'); //слепили, без пробелов. только для js файлов
const cssmin = require('gulp-cssmin'); //слепливает css
const htmlmin = require('gulp-htmlmin');
const browserSync = require('browser-sync').create(); //отслеживание файла в браузере, вместо Live Server, коряво ряботает

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
// если бы у нас были библиотечные стили  мы бы их отдельно перенесли

// function copyVenderCss() {
//     return src(['./src/css/**/*.css']) // в [ указываю полный пусть каждого стиля через , 'ссылка' ], порядок важен
//         .pipe(dest('./dist/css'));;
// }
function copyVenderJS() { //для подключения jquery
    return src([
        './node_modules/jquery/dist/jquery.min.js',
    ])
    .pipe(concat('vendor.js'))
    .pipe(dest('./dist/js'));
}

function copyHtml() { 
    return src('./src/index.html')
        .pipe(dest('./dist')); //созд трубу и в неё передаем путь к файлу, pipe - (куда ложить), а в нём dest - путь назначения
}
function copyHtmlMin() { 
    return src('./src/index.html')
        .pipe(htmlmin({
            collapseWhitespace: true,
            removeComments: true,
        }))
        .pipe(dest('./dist')); //созд трубу и в неё передаем путь к файлу, pipe - (куда ложить), а в нём dest - путь назначения
}

function serve(cb) { // наблюдает за изменениями в файлах, что бы постоянно не запускать gulp build и т.д.

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
