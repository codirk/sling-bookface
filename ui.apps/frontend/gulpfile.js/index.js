const path = require('path');
const {parallel, watch, src, dest} = require('gulp');
const gulp = require('gulp');
//const gutil = require('gulp-util');

const source = '../dist';
const source_resolved = path.resolve(__dirname, source);

//const target = '../../target/jcr_root' + gutil.env.target;// '../../target/jcr_root/etc/clientlibs/sling-bookface';
const target = '../../target/jcr_root' + process.env.npm_package_config_target;
//const target = '../../target/jcr_root' + process.env.npm_config_target ;
const target_resolved = path.resolve(__dirname, target);
console.log(`Copy ${source_resolved}/**/* to ${target_resolved}`);

gulp.task('default', function(cb) {
    src(source_resolved +
        '/**/*')
        .pipe(dest(target_resolved));
    cb();
});



const relative_watchfolder = '../public';
const watchfolder_resolved = path.resolve(__dirname, relative_watchfolder);

function watchJavascriptFolder(cb) {
    console.log(` Observing ... ${watchfolder_resolved}`);

    watch(watchfolder_resolved + '/**/*.js', {ignoreInitial: true}, function (cb) {
        console.log(`${watchfolder_resolved}/**/* Changed`);

        return src(watchfolder_resolved +
            '/**/*.js')
            .pipe(dest('../../ui.apps/target/sync/main/content/jcr_root/'));
        cb();
    })
    cb();
}

function watchStylesFolder(cb) {
    console.log(` Observing ... ${watchfolder_resolved}`);

    watch(watchfolder_resolved + '/**/*.css', {ignoreInitial: true}, function (cb) {
        console.log(`${watchfolder_resolved}/**/* Changed`);

        return src(watchfolder_resolved +
            '/**/*.css')
            .pipe(dest('../../ui.apps/target/sync/main/content/jcr_root/'));
        cb();
    })
    cb();
}

gulp.task('watch',  parallel(watchJavascriptFolder,watchStylesFolder));



