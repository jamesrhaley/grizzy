var gulp = require('gulp');
var del = require('del');
var connect = require('gulp-connect');
var browserify = require('browserify');
var babelify = require('babelify');
var source = require('vinyl-source-stream');
// var uglify = require('gulp-uglify');

var entryFile = './src/js/index.js',
    datafile = './src/data/data.csv',
    outputFile = 'build.js',
    jsBuidDir = './dist/scripts',
    BuildDir = './dist';


gulp.task('connect', function() {
    connect.server({
        base: 'http://localhost',
        port: 9000,
        root: ['./dist'],
        livereload: true
    });
});

// gulp.task('clean', function () {
//   return del([
//     'dist/d3.js',
//     'dist/data.tsv',
//     'dist/scripts/*',
//     'dist/index.html'
//   ]);
// });

gulp.task('js', function() {
    browserify(entryFile)
        .transform(
            babelify, 
            {presets: ["es2015", "stage-0"]}
        )
        .bundle()
        .on('error', function(err) {
            console.log('Error: ' + err.message);
        })
        .pipe( source( outputFile ))
        .pipe( gulp.dest( jsBuidDir ))
        .pipe( connect.reload() );
});

// gulp.task('d3', function() {
//     gulp.src('./d3/d3.js')
//         .on('error', function(err) {
//             console.log('Error: ' + err.message);
//         })
//         .pipe( gulp.dest( BuildDir ))
//         .pipe( connect.reload() );
// });

gulp.task('html', function() {
    gulp.src('./src/html/*.html')
        .on('error', function(err) {
            console.log('Error: ' + err.message);
        })
        .pipe( gulp.dest( BuildDir ))
        .pipe( connect.reload() );
});

gulp.task('css', function() {
    gulp.src('./src/css/*.css')
        .on('error', function(err) {
            console.log('Error: ' + err.message);
        })
        .pipe( gulp.dest( BuildDir ))
        .pipe( connect.reload() );
});

gulp.task('data', function() {
    gulp.src(datafile)
        .on('error', function(err) {
            console.log('Error: ' + err.message);
        })
        .pipe( gulp.dest( BuildDir ))
        .pipe( connect.reload() );
})

// add watch depth as file structure increases
gulp.task('watch', function() {
    gulp.watch([
        './src/js/**/*.js',
        './src/js/*.js',
        // './src/*.js'
        ], 
        ['js']
    )
    gulp.watch('./src/html/*.html', ['html']);
    gulp.watch('./src/css/*.css', ['css']);
});


gulp.task('default', [
    // 'clean', 
    'data', 
    // 'd3',
    'css', 
    'js', 
    'html', 
    'connect', 
    'watch'
]);