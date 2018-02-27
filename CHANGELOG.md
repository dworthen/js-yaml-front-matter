# Change Log

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

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


