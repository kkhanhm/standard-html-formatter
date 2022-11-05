Created for formatting the HTML in a standard way.

Problem with the typical formatters is that it behaves awkward for the angular, Laravel blades and other
framework HTML files.

It solves that problem while maintaing the existing standard of HTML format.

#### Install package

`npm install @mkhalidkhan/standard-html-formatter`

#### Usage

```
const formatHTML = require("@mkhalidkhan/standard-html-formatter");

let data = `<html>
<p> this is just a paragraph </p><p>This is just another paragraph</p>
<html>`;

formatHTML(2,data); // This will give you formatting based on 2 spaces.
```

#### License

This package is released under MIT license . Copyright (c) Khalid Khan
