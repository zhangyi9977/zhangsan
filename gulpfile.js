var gulp=require('gulp');

var load=require('gulp-load-plugins')();

var browser=require("browser-sync").create();


gulp.task('js',function(done){
    gulp.src('./src/js/*.js')
    .pipe(load.babel({
        presets:['@babel/env']
    }))
    .pipe(load.concat('all.js'))
    .pipe(load.uglify())
    .pipe(gulp.dest('./dist/js/'))
    done()
})

gulp.task('css',function(done){
    gulp.src('./src/css/*')
    .pipe(load.sass())//编译
    // .pipe(load.minifyCss())
    .pipe(gulp.dest('./dist/css/'))
    done();
})

gulp.task('html',function(done){
    gulp.src('./src/*.html')
    .pipe(load.minifyHtml())
    .pipe(gulp.dest('./dist/'))
    done()
})

gulp.task('image',function(done){
    gulp.src('./src/img/**')
    .pipe(load.imagemin())
    .pipe(gulp.dest('./dist/img'))
    done()
})

gulp.task('minify',gulp.series(gulp.parallel('js','css','html'),function(done){
    browser.reload()
    done()
}))

gulp.task('server',gulp.series(gulp.parallel('js','css','html','image'),function(){
    browser.init({
        server:'./dist/',
        port:"8080"
    })
    gulp.watch('./src/',gulp.series('minify'))
}))


