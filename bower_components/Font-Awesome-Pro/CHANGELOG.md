# Change Log
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/) and this project adheres to [Semantic Versioning](http://semver.org/).

---

## [5.0.0-beta4](https://github.com/FortAwesome/Font-Awesome-Pro/releases/tag/5.0.0-beta4)  - 2017-08-18

### Added
* 590 total core icons in each style
* 291 total brand and logo icons

### Fixed
* Reduced the size of JS file from 66 to 22 kb
* Regression caused by with web font alignment #460

---

## [5.0.0-beta3](https://github.com/FortAwesome/Font-Awesome-Pro/releases/tag/5.0.0-beta3)  - 2017-08-15

### Added
* 583 total core icons in each style

### Fixed
* Documentation improvements and fixes #586
* Vertical alignment of TTF and OTF fonts #460
* The "fa_500px" icon should be named "fa500px" #578

---

## [5.0.0-beta2](https://github.com/FortAwesome/Font-Awesome-Pro/releases/tag/5.0.0-beta2)  - 2017-08-11

### Added
* 570 total core icons in each style
* 291 total brand and logo icons
* NPM (ES6, CommonJS, AMD) packages for use with other JavaScript libraries and tools #574
* Added a guide to choosing which implementation is best for you #532

### Changed
* Showing a missing icon is now configurable #569

### Fixed
* Composition framework now works in browsers that do not support transform-origin #564

---

## [5.0.0-beta1](https://github.com/FortAwesome/Font-Awesome-Pro/releases/tag/5.0.0-beta1)  - 2017-08-04

### Added
* 524 total core icons in each style
* 289 total brand and logo icons
* New composition framework #537
* Animated indicator if you use an icon that does not exist

### Changed
* Basic linting for Sass and Less files
* Add JavaScript guard block to prevent leaking errors
* Add support for automatic accessibility to SVG Framework Layers

### Fixed
* Regression where stacks and pulled and bordered were not working in SVG Framework
* SVG sprite example had confusing inline styles #549
* Make getting started page more consistent between examples #544
* Added missing sizes fa-[6-10], xs, sm #546
* Title tag missing in SVG sprites #536

---

## [5.0.0-alpha7](https://github.com/FortAwesome/Font-Awesome-Pro/releases/tag/5.0.0-alpha7)  - 2017-07-28

### Added
* 451 total core icons in each style
* 281 total brand and logo icons
* Less support is back!
* OpenType (.otf) file formats for web fonts

### Changed
* Changes the fa-spin animation to go from 0deg to 360deg to eliminate hitch #522
* Improved mutation handling #517

### Fixed
* fa-fw now works correctly with the SVG framework #530
* Removed execute bit on some icon files #520

---

## [5.0.0-alpha6](https://github.com/FortAwesome/Font-Awesome-Pro/releases/tag/5.0.0-alpha6)  - 2017-07-21

### Added
* 410 total core icons in each style
* 270 total brand and logo icons
* All new Font Awesome 4 shim file
* Beginnings of a public JS API #512

### Changed
* Added Firefox ESR and Chrome for Businesses to browser compatibility #506

### Fixed
* Ensure that SVG title attributes are unique
* Fixed incorrect viewBox sizes #492
* Fix chart-area alignment in the solid style #508
* Add missing xmlns attributes in some SVGs #509

---

## [5.0.0-alpha5](https://github.com/FortAwesome/Font-Awesome-Pro/releases/tag/5.0.0-alpha5)  - 2017-07-14

### Added
* 228 total brand and logo icons
* New transform framework for sizing, moving, rotating, and flipping icons
* New icon counters
* New layers framework
* New text overlays
* Auto-comments with the original source icons alongside SVG replacements

### Changed
* Autoprefixer to correctly add browser prefixes for supported browsers
* Removed browser-specific CSS properties in Sass source files (now relies on autoprefixer)

### Fixed
* The rotation on checkmark icons
* Other icon feedback from previous weeks
* Correct fixed width settings to 1.25em (based on the new 16px grid)
* Icons displaying as block instead of inline-block in IE and older Safari

---

## [5.0.0-alpha4](https://github.com/FortAwesome/Font-Awesome-Pro/releases/tag/5.0.0-alpha4)  - 2017-07-07

### Added
* 93 brand icons

---

## [5.0.0-alpha3](https://github.com/FortAwesome/Font-Awesome-Pro/releases/tag/5.0.0-alpha3)  - 2017-06-30

### Added
* 95 additional icons; including file types, directional, and some existing and new brand icons

### Fixed
* Wrong content type in generated CSS #458
* Removal of query string from static resources #458
* SVG font ID's are incorrect in webfont implementation #474

---

## [5.0.0-alpha2](https://github.com/FortAwesome/Font-Awesome-Pro/releases/tag/5.0.0-alpha2)  - 2017-06-27

### Added
* How/When to upgrade from FA4 to FA5 #454

### Fixed
* Links to SVG files broken in the example files #456
* Misnamed icon names in examples #445
* Mangled HTML in the Getting Started example #442
* Bad grammar and typos #443
* fas-arrow-to-top is identical to fas-arrow-to-right #423
* Vertical alignment issues with webfont implementation #444
* Add browser compatibility tables to demo #435
* Remove MAC OS feces from builds #437
* TTF naming issues that prevent correct usage/installation #450
* Correct CSS for SVG framework stacking, was reversed from normal #452

---

## [5.0.0-alpha1](https://github.com/FortAwesome/Font-Awesome-Pro/releases/tag/5.0.0-alpha1)  - 2017-06-23

### Added
* 300+ more icons
* Brands pack
* New JavaScript based SVG Framework
* New SVG Sprites based framework
* Source SVGs
* Documentation with a convenient build-in web server

### Changed
* New directory structure

---

## [0.1.0](https://github.com/FortAwesome/Font-Awesome-Pro/tree/v0.1.0)  - 2017-01-20

### Added
* initial repo/project infrastructure

---
