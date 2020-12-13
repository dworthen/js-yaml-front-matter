# Changelog

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

### [4.1.1](https://github.com/dworthen/js-yaml-front-matter/compare/v4.1.0...v4.1.1) (2020-12-13)


### Bug Fixes

* update dependencies ([70fba4a](https://github.com/dworthen/js-yaml-front-matter/commit/70fba4af22c95eacaf5370a5b198602c452e3d68))

## [4.1.0](https://github.com/dworthen/js-yaml-front-matter/compare/v4.0.0...v4.1.0) (2019-12-24)


### Features

* Upgrade package dependencies ([39a68d2](https://github.com/dworthen/js-yaml-front-matter/commit/39a68d2c10de16b411cccb90865856c8cacbe265))

### [3.4.1](https://github.com/dworthen/js-yaml-front-matter/compare/v4.0.0-2...v3.4.1) (2018-02-27)

<a name="4.0.0"></a>
# [4.0.0](https://github.com/dworthen/js-yaml-front-matter/compare/v4.0.0-4...v4.0.0) (2018-03-08)



<a name="4.0.0-4"></a>
# [4.0.0-4](https://github.com/dworthen/js-yaml-front-matter/compare/v4.0.0-3...v4.0.0-4) (2018-02-28)


### Bug Fixes

* Update API to be backward compatible with 3.x ([4a9aa0e](https://github.com/dworthen/js-yaml-front-matter/commit/4a9aa0e))



<a name="4.0.0-3"></a>
# [4.0.0-3](https://github.com/dworthen/js-yaml-front-matter/compare/v4.0.0-2...v4.0.0-3) (2018-02-27)


### Bug Fixes

* list umd module as main entry point ([a63d69a](https://github.com/dworthen/js-yaml-front-matter/commit/a63d69a))



<a name="4.0.0-2"></a>
# [4.0.0-2](https://github.com/dworthen/js-yaml-front-matter/compare/v4.0.0-1...v4.0.0-2) (2018-02-27)


### Features

* Add --pretty flag to print formatted json ([f119924](https://github.com/dworthen/js-yaml-front-matter/commit/f119924))



<a name="4.0.0-1"></a>
# [4.0.0-1](https://github.com/dworthen/js-yaml-front-matter/compare/v4.0.0-0...v4.0.0-1) (2018-02-27)


### Bug Fixes

* **cli:** Update cli to support latest version ([1f0bd9e](https://github.com/dworthen/js-yaml-front-matter/commit/1f0bd9e))



<a name="4.0.0-0"></a>
# [4.0.0-0](https://github.com/dworthen/js-yaml-front-matter/compare/v3.4.0...v4.0.0-0) (2018-02-27)


### Features

* Rewrite using es2015 ([2c24190](https://github.com/dworthen/js-yaml-front-matter/commit/2c24190))


### BREAKING CHANGES

* Changed:
- No longer modifies or exposes js-yaml. May need to
include js-yaml for yaml parsing needs outside of parsing
front-matter
- No longer supports reading contents from the file system.
Instead, us fs to load the contents.
- Browser global is now exposed was yamlFront instead of jsYaml
- Browser script no longer comes bundled with underlying js-yaml.
Must now include js-yaml as a separate script.
Added:
- safeLoadFront to behave the same as safeLoad from js-yaml.
- loadFront and safeLoadFront now support all the same options
as the corresponding methods in js-yaml



# Change Log

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.
