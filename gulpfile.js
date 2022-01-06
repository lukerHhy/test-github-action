const gulp = require('gulp')
const tinypngFree = require('./scripts/tiny')

gulp.task('tinypng', async (cb) => {
  await gulp.src('src/assets/img3_0/**/*.{png,jpg,jpeg,webp}')
    .pipe(tinypngFree({}))
    .pipe(gulp.dest('src/assets/img3_0'))
})

gulp.task('tinypng:current', async (cb) => {
  await gulp.src('src/current_project/img3_0/**/*.{png,jpg,jpeg,webp}')
    .pipe(tinypngFree({}))
    .pipe(gulp.dest('src/current_project/img3_0'))
})
