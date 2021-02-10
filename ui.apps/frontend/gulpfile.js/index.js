const path = require('path');
const {src, dest} = require('gulp');
const gulp = require('gulp');
const gutil = require('gulp-util');


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






