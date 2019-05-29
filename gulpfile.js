const gulp = require("gulp");
const imagemin = require("gulp-imagemin");
const uglify = require("gulp-uglify");
const sass = require("gulp-sass");
const concat = require("gulp-concat");
/*
* TOP LEVEL functions
gulp.task - define tasks
gulp.src = point tofiles to use
gulp.dest - point to folder to output
gulp.watch - watch files and folders for changes
*/

//Logs Message
gulp.task("message", function() {
  return console.log("Gulp is running....");
});

//Copy All HTML files
gulp.task("copyHtml", function() {
  gulp.src("src/*.html").pipe(gulp.dest("dist"));
});

//Optimize Images
gulp.task("imageMin", () =>
  gulp
    .src("src/images/*")
    .pipe(imagemin())
    .pipe(gulp.dest("dist/images"))
);

//Minify JS
// gulp.task("minify", function() {
//   gulp
//     .src("src/js/*.js")
//     .pipe(uglify())
//     .pipe(gulp.dest("dist/js"));
// });

//compile Sass
gulp.task("sass", function() {
  gulp
    .src("src/sass/*.scss")
    .pipe(sass().on("error", sass.logError))
    .pipe(gulp.dest("dist/css"));
});

//Scripts
gulp.task("scripts", function() {
  gulp
    .src("src/js/*.js")
    .pipe(concat("main.js"))
    .pipe(uglify())
    .pipe(gulp.dest("dist/js"));
});

gulp.task(
  "default",
  gulp.parallel(["message", "copyHtml", "imageMin", "sass", "scripts"])
);

gulp.task("watch", function() {
  gulp.watch("scr/js/*.hs", ["scripts"]);
  gulp.watch(`scr/images/*`, ["imageMin"]);
  gulp.watch("scr/sass/*.scss", ["sass"]);
  gulp.watch("scr/*.html", ["copyHtml"]);
});
