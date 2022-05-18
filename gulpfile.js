'use strict';

// This gulpfile makes use of new JavaScript features.
// Babel handles this without us having to do anything. It just works.
// You can read more about the new JavaScript features here:
// https://babeljs.io/docs/learn-es2015/

const gulp  = require('gulp');
const browserSync = require('browser-sync');
const reload = browserSync.reload;

// Watch files for changes & reload
gulp.task('serve', () => {
    browserSync({
        notify: false,
        // Customize the Browsersync console logging prefix
        logPrefix: 'WSK',
        // Allow scroll syncing across breakpoints
        scrollElementMapping: ['main', '.mdl-layout'],
        // Run as an https by uncommenting 'https: true'
        // Note: this uses an unsigned certificate which on first access
        //       will present a certificate warning in the browser.
        // https: true,
        server: [ './'],
        port: 3000
    });

    gulp.watch(['assets/**/*.html'], reload);
    gulp.watch(['*.html'], reload);
    gulp.watch(['assets/css/**/*.{scss,css}'],  reload);
    gulp.watch(['assets/js/**/*.js'],  reload);
    gulp.watch(['assets/images/**/*'], reload);
});
