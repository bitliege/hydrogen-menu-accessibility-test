// Hydrogen / Test / Gulpfile

"use strict";

// Requirements
const { series, parallel, src, dest, watch } = require('gulp');
const autoprefixer = require('autoprefixer');
const browsersync = require('browser-sync').create();
const del = require('del');
const postcss = require('gulp-postcss');
const sass = require('gulp-sass');

sass.compiler = require('sass');

// Test Scripts

    // Move Test Project Files

        // Move Test HMTL
        function moveTestHTML() {
            return src(["dev/index.html", "dev/sidebar.html", "dev/topbar.html"])
            .pipe(dest("cache"));
        }
        // Move Test Sass
        function moveTestSass() {
            return src("dev/app.scss")
            .pipe(dest("cache"));
        }
        // Move Test JS
        function moveTestJS() {
            return src("node_modules/@hydrogen-design-system/system/dist/cdn/h2-system.min.js")
            .pipe(dest("cache"));
        }
        // Move Cash
        function moveCash() {
            return src("node_modules/@hydrogen-design-system/system/dist/cdn/cash/cash.min.js")
            .pipe(dest("cache"));
        }
        // Move Test Component JS
        function moveTestComponentJS() {
            return src("node_modules/@hydrogen-design-system/component-accordion/dist/version/scripts/*.js")
            .pipe(dest("cache"));
        }
        // Move Hydrogen JS
        function moveH2TestJS() {
            return src("dev/app.js")
            .pipe(dest("cache"));
        }

    // Compile
    function compileTestSass() {
        return src('cache/app.scss')
        .pipe(sass())
        .pipe(postcss([autoprefixer()]))
        .pipe(dest('cache'));
    }

    // Move images.
    function moveImages() {
        return src('dev/img/**/*')
        .pipe(dest('cache/img'));
    }

    // Move Favicons
    function moveDevFavicons() {
        return src('dev/favicons/**/*')
        .pipe(dest('cache/favicons'));
    }

    // Clean Cache
    function cleanCache() {
        return del('cache/**/*')
    }

    // TestScript
    const testScript = series(cleanCache, moveTestHTML, moveTestSass, moveTestJS, moveCash, moveH2TestJS, moveTestComponentJS, moveImages, moveDevFavicons, compileTestSass);

    // Watch
    function watchTestFiles() {
        watch(['dev/**/*'], series(testScript, browserSyncReload));
    }

    // Browsersync
    function browserSync(done) {
        browsersync.init({
            server: {
                baseDir: 'cache'
            },
        });
        done();
    }
    function browserSyncReload(done) {
        return src('cache/*.html')
        .pipe(browsersync.reload({
            stream: true
        }));
    }

    exports.default = series(testScript, parallel(browserSync, watchTestFiles));

    // Build Docs

    // Move Test Project Files

        // Move Test HMTL
        function moveDocsHTML() {
            return src(["dev/index.html", "dev/sidebar.html", "dev/topbar.html"])
            .pipe(dest("docs"));
        }
        // Move Test Sass
        function moveDocsSass() {
            return src("dev/app.scss")
            .pipe(dest("docs"));
        }
        // Move Test JS
        function moveDocsJS() {
            return src("node_modules/@hydrogen-design-system/system/dist/cdn/h2-system.min.js")
            .pipe(dest("docs"));
        }
        // Move Cash
        function moveDocsCash() {
            return src("node_modules/@hydrogen-design-system/system/dist/cdn/cash/cash.min.js")
            .pipe(dest("docs"));
        }
        // Move Test Component JS
        function moveDocsComponentJS() {
            return src("node_modules/@hydrogen-design-system/component-accordion/dist/version/scripts/*.js")
            .pipe(dest("docs"));
        }
        // Move Hydrogen JS
        function moveDocsH2AppJS() {
            return src("dev/app.js")
            .pipe(dest("docs"));
        }

    // Compile
    function compileDocsSass() {
        return src('docs/app.scss')
        .pipe(sass())
        .pipe(postcss([autoprefixer()]))
        .pipe(dest('docs'));
    }

    // Move images.
    function moveDocsImages() {
        return src('dev/img/**/*')
        .pipe(dest('docs/img'));
    }

    // Move Favicons
    function moveDocsFavicons() {
        return src('dev/favicons/**/*')
        .pipe(dest('docs/favicons'));
    }

    // Clean Cache
    function cleanDocs() {
        return del(['docs/**/*', '!docs/CNAME']);
    }

    // Clean Build Files
    function cleanBuild() {
        return del('app.scss');
    }

    exports.build = series(
        cleanDocs, 
        moveDocsHTML,
        moveDocsSass,
        moveDocsJS,
        moveDocsCash,
        moveDocsComponentJS,
        moveDocsH2AppJS,
        compileDocsSass,
        moveDocsImages,
        moveDocsFavicons,
        cleanBuild
    );