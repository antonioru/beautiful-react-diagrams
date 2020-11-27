# Changelog
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [0.1.0] - 2019-06-10

### Added

- Project setup
- First release

## [0.1.1] - 2020-04-09

### Fixed

- Improving the documentation 
- Adding types


## [0.1.2] - 2020-04-09

### Fixed

- Improving the documentation 
- Updating the dependencies
- Removing the .idea folder from the repository

## [0.1.2] - 2020-04-09

### Fixed

- Improving the documentation

## [0.1.3] - 2020-04-09

### Fixed

- Fixing test setup
- Improving README.md file

## [0.1.4] - 2020-04-10

### Fixed

- Fixing the missing exported CSS
- Improving the documentation

## [0.1.5] - 2020-04-10

### Fixed

- The linking process does not take into account the segment direction

## [0.2.0] - 2020-09-25

### Added

- New, more efficient build system based on `rollup` instead of `gulp`

### Fixed

- Wrong link position after window resize
- Minor types error in @types

## [0.2.1] - 2020-09-26

### Added

- className property to links

### Fixed

- `tailwind` removed


## [0.2.2] - 2020-10-10

### Added

- TS tests

### Fixed

- build system setup causing a missing `style.css` in the project `dist` directory


## [0.3.0] - 2020-09-26

### Added

- useSchema hook and tests
- createSchema utility function + tests
- validator functions + tests

### Fixed

- Child Nodes receive an outdated version of the schema bug

## [0.3.1] - 2020-10-22

### Fixed

- Removing linked node cause 'undefined entity' error
- Removing a node deletes the involved links


## [0.3.2] - 2020-11-06

### Fixed

- fixed `Diagram` generic types


## [0.3.3] - 2020-11-12

### Fixed

- Typescript tests to CI

## [0.4.0] - 2020-11-13

### Added

- Added the `disableDrag` option to node schema
- Validator examples in the documentation

## [0.5.0] - 2020-11-20

  ### Added

  - First implementation of draggable canvas
  - First implementation of zoomable canvas

## [0.5.1] - 2020-11-27

  ### Reverted
  
  - Reverted changes in `0.5.0` related to draggable canvas and zoomable 
    canvas due to an uncaught bug. We will continue working on these features
    and release them in an upcoming version. Apologies everyone! 
