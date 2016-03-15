[![Build Status](https://secure.travis-ci.org/GaryB432/gulp-ng-dgml.svg?branch=master)](https://travis-ci.org/GaryB432/gulp-ng-dgml)

[![NPM](https://nodei.co/npm/gulp-ng-dgml.png)](https://nodei.co/npm/gulp-ng-dgml/)

## Information

<table>
<tr>
<td>Package</td><td>gulp-ng-dgml</td>
</tr>
<tr>
<td>Description</td>
<td>makes a directed graph document of your angular modules</td>
</tr>
<tr>
<td>Node Version</td>
<td>>= 0.10</td>
</tr>
</table>

## Usage

```js
var ngDgml = require('gulp-ng-dgml');

gulp.task('scripts', function() {
  return gulp.src('./lib/*.js')
    .pipe(ngDgml('architecture.dgml'))
    .pipe(gulp.dest('.'));
});

```

This will create a [Directed Graph Markup Language](http://en.wikipedia.org/wiki/DGML) document from your angular source.

![alt tag](https://raw.github.com/GaryB432/gulp-ng-dgml/master/img/ui-utils-keypress.png)

## LICENSE

Copyright (c) 2016, Gary Bortosky and contributers

Permission to use, copy, modify, and/or distribute this software for any purpose
with or without fee is hereby granted, provided that the above copyright notice
and this permission notice appear in all copies.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY AND
FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM LOSS
OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR OTHER
TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR PERFORMANCE OF
THIS SOFTWARE.
