const {src, dest, watch, parallel, series} = require('gulp'),
    scss = require('gulp-sass')(require('sass')),
    concat = require('gulp-concat'),
    browserSync = require('browser-sync').create(),
    uglify = require('gulp-uglify-es').default,
    autoprefixer = require('gulp-autoprefixer'),
    imagemin = require('gulp-imagemin'),
    del = require('del');

function browsersync() {
    browserSync.init({
        server: {
            baseDir: "./src"
        },
        notify: false,
        browser: "google chrome"
    });
}

function images() {
    return src('./src/images/**/*')
        .pipe(imagemin([
            imagemin.gifsicle({interlaced: true}),
            imagemin.mozjpeg({quality: 75, progressive: true}),
            imagemin.optipng({optimizationLevel: 5}),
            imagemin.svgo({
                plugins: [
                    {removeViewBox: true},
                    {cleanupIDs: false}
                ]
            })
        ]))
        .pipe(dest('./dist/images'))
}

function scripts() {
    return src([
        // './node_modules/jquery/dist/jquery.min.js',
        './src/js/filter/mixitup.min.js',
        './src/js/main.js',
    ])
        .pipe(concat('main.min.js'))
        .pipe(uglify())
        .pipe(dest('./src/js'))
        .pipe(browserSync.stream())
}

function styles() {
return src('./src/styles/scss/index.scss')
        .pipe(scss({outputStyle: 'compressed'}))
        .pipe(concat('main.min.css'))
        .pipe(autoprefixer({
            grid: false
        }))
        .pipe(dest('./src/styles'))
        .pipe(browserSync.stream())
}

function cleanDist() {
    return del('./dist')
}

function watching() {
    watch('./src/styles/**/*.scss', styles);
    watch(['./src/js/**/*.js', '!./src/js/main.min.js'], scripts);
    watch('./src/index.html').on('change', browserSync.reload);
}

function build() {
    return src([
        './src/styles/*.css',
        './src/js/main.min.js',
        './src/index.html'
    ], {base: './src'})
        .pipe(dest('dist'))
}

exports.styles = styles;
exports.scripts = scripts;
exports.images = images;
exports.watching = watching;
exports.browsersync = browsersync;
exports.cleanDist = cleanDist;

exports.build = series(cleanDist, images, build);

exports.default = parallel(styles, scripts, browsersync, watching)