'use strict'

const gulp = require('gulp')
const jsdoc = require('jsdoc-to-markdown')
const standard = require('standard')
const eslint = require('gulp-eslint')
const fs = require('fs')
const del = require('del')
const { exec } = require('child_process')
const docsOptions = {
  files: './src/**/*.js',
  'example-lang': 'js',
  noCache: true
}

gulp.task('lint', (done) => {
  gulp.src('./src/**/*.js')
    .pipe(eslint({
      configFile: '.eslintrc.json'
    }))
    .pipe(eslint.format())
  return standard.lintFiles([], { cwd: './src', fix: true, plugins: ['eslint-plugin-standard', 'eslint-plugin-node', 'eslint-plugin-promise', 'eslint-plugin-import', 'eslint-plugin-markdown'] }, (err, args) => {
    if (err) done(err)
    else done()
  })
})

gulp.task('docs', gulp.series(gulp.parallel('lint'), (done) => {
  del.sync(['./docs/*.md', './docs/**/*.md'])

  jsdoc.render(docsOptions).then(data => {
    fs.writeFileSync('./docs/README.md', data)
    return done()
  })
}))
