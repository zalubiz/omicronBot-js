var gulp = require("gulp");
var gutil = require("gulp-util");
var jshint = require("gulp-jshint");
var plumber = require("gulp-plumber");
var notify = require("gulp-notify");
var mocha = require("gulp-mocha");
var install = require("gulp-install");

var errorHandler = notify.onError("Error: <%= error.message %>");
var filesToWatch = ["index.js", "test/**/*.js"];

gulp.task("lint", function() {
  return gulp.src(filesToWatch)
    .pipe(plumber({
      errorHandler: errorHandler
    }))
    .pipe(jshint())
    .pipe(jshint.reporter("default"))
    .on("error", gutil.beep)
    .pipe(notify(function(file) {
      if (!file.jshint) {
        return false;
      }
      if (file.jshint.success) {
        return false;
      }

      var errors = file.jshint.results.map(function(data) {
        if (data.error) {
          return "(" + data.error.line + ":" + data.error.character + ") " + data.error.reason;
        }
      }).join("\n");
      return file.relative + " (" + file.jshint.results.length + " errors)\n" + errors;
    }));
});

gulp.task("install", function () {
  return gulp
    .src(["./package.json"])
    .pipe(install());
});

gulp.task("test", ["lint"], function () {
  return gulp.src("test/**/*.js", {read: false})
    .pipe(mocha({reporter: "spec"}));
});

gulp.task("watch", function() {
  gulp.watch(filesToWatch, ["lint", "test"]);
  gulp.watch(["./package.json"], ["install"]);
});
