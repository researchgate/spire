# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# [2.0.0](https://github.com/researchgate/spire/compare/v1.8.3...v2.0.0) (2020-04-30)


### Bug Fixes

* **eslint:** Correctly write and read eslint config files ([0a66686](https://github.com/researchgate/spire/commit/0a666868e8d87e5c184c931dcd089831d21b7713))
* Use custom resolve method to resolve from current dir and spire install dir ([28743c1](https://github.com/researchgate/spire/commit/28743c1356a24e8a752acca129b58c92646e1631))
* **deps:** update dependency execa to v3 ([#31](https://github.com/researchgate/spire/issues/31)) ([29ce452](https://github.com/researchgate/spire/commit/29ce452ddb145c42c44b5cddd33bf1d96a16fabf))
* **deps:** update dependency fs-extra to v9 ([68644ff](https://github.com/researchgate/spire/commit/68644ff10500ac23ac5983f14c22e3248cb231d0))
* **deps:** update dependency yargs to v15 ([42a49e2](https://github.com/researchgate/spire/commit/42a49e242c3f59dc0659805be7ef4aec5d9b19da))
* **deps:** update jest monorepo to v25 ([76b7bed](https://github.com/researchgate/spire/commit/76b7bed4ac8e799939ac8463b91301ad2053c7fb))
* **spire:** detect indentation when writing package.json file ([39521b5](https://github.com/researchgate/spire/commit/39521b5575831052fa4216ce85cc1a0cbe1b6dd2))
* **yargs:** Correctly get unknown options as args ([f5ae588](https://github.com/researchgate/spire/commit/f5ae5884bfa71c47c6d1ff32c2f717594dae3e92))


### chore

* require Node.js >=10.18 ([0a2f755](https://github.com/researchgate/spire/commit/0a2f75509d0df070a9c44e427fdefdaf85d05440))


### Features

* **eslint:** Use eslint:recommended instead of unobtrusive ([3df16cd](https://github.com/researchgate/spire/commit/3df16cd0f333f249833bab0933406320e6b91816))
* Drop support for node 8 ([9fc4019](https://github.com/researchgate/spire/commit/9fc401958e59f21e12a4081482bcf81b5ec15a2e))
* **deps:** Update dependency cosmiconfig to v6 ([#34](https://github.com/researchgate/spire/issues/34)) ([5b13399](https://github.com/researchgate/spire/commit/5b133997edb6f1fc4250e8859bf08737ea7dccbd))
* **eslint:** Add prettier to default eslint config ([#38](https://github.com/researchgate/spire/issues/38)) ([ab75b4b](https://github.com/researchgate/spire/commit/ab75b4b1f375a4ce48d9630bc9972b60f65870df))


### BREAKING CHANGES

* Require Node.js >= 10.18
* Requires nodejs version 10 or newer.
* **eslint:** prettier is enabled in the default eslint config



# [1.8.0](https://github.com/researchgate/spire/compare/68f7ec8b9b081768f7e81098bf0937d91ad3e6fe...v1.8.0) (2019-11-13)


### Bug Fixes

* Make spire compatible with yargs 14 ([68f7ec8](https://github.com/researchgate/spire/commit/68f7ec8b9b081768f7e81098bf0937d91ad3e6fe))





## [1.8.3](https://github.com/researchgate/spire/compare/v1.8.2...v1.8.3) (2019-11-15)

**Note:** Version bump only for package spire





## [1.8.2](https://github.com/researchgate/spire/compare/v1.8.1...v1.8.2) (2019-11-15)


### Bug Fixes

* Ensure to set preferLocal to true to pick up local installed binaries ([aeb8df7](https://github.com/researchgate/spire/commit/aeb8df7))
* Use INIT_CWD env variable everywhere to pick up the correct directories ([b7b3716](https://github.com/researchgate/spire/commit/b7b3716))





## [1.8.1](https://github.com/researchgate/spire/compare/v1.8.0...v1.8.1) (2019-11-13)


### Bug Fixes

* Correctly await reading package json file ([0cc65e4](https://github.com/researchgate/spire/commit/0cc65e4))





# [1.8.0](https://github.com/researchgate/spire/compare/v1.7.3...v1.8.0) (2019-11-13)


### Bug Fixes

* Better error message if preflight check fails ([ff54966](https://github.com/researchgate/spire/commit/ff54966))
* Correctly return error codes, by handling promise errors ([47d8c4b](https://github.com/researchgate/spire/commit/47d8c4b))
* Do not do Promise.all on already resolved Promises ([7a658f9](https://github.com/researchgate/spire/commit/7a658f9))
* set `rootDir` token to workspace root ([1806570](https://github.com/researchgate/spire/commit/1806570))
* **deps:** upgrade fs-extra to v8.0.1 ([21643aa](https://github.com/researchgate/spire/commit/21643aa))
* **deps:** upgrade import-from to v3.0.0 ([06f3800](https://github.com/researchgate/spire/commit/06f3800))


### Features

* **plugin-prettier:** autoset prettier config for eslint & ide integrations ([407c2fa](https://github.com/researchgate/spire/commit/407c2fa))





## [1.7.3](https://github.com/researchgate/spire/compare/v1.7.2...v1.7.3) (2019-06-07)


### Bug Fixes

* rework commands api ([b9657e2](https://github.com/researchgate/spire/commit/b9657e2))





## [1.7.2](https://github.com/researchgate/spire/compare/v1.7.1...v1.7.2) (2019-05-24)


### Bug Fixes

* **cli:** fail on unknown command ([98c6149](https://github.com/researchgate/spire/commit/98c6149))





## [1.7.1](https://github.com/researchgate/spire/compare/v1.7.0...v1.7.1) (2019-04-23)


### Bug Fixes

- allow to skip git check ([3237eb3](https://github.com/researchgate/spire/commit/3237eb3))





# [1.7.0](https://github.com/researchgate/spire/compare/v1.4.1...v1.7.0) (2019-04-03)


### Features

* introduce lerna-release plugin ([1e46acf](https://github.com/researchgate/spire/commit/1e46acf))





## [1.4.1](https://github.com/researchgate/spire/compare/v1.4.0...v1.4.1) (2019-03-29)


### Bug Fixes

* resolve config from project root with proper error reporting ([726fa49](https://github.com/researchgate/spire/commit/726fa49))





# [1.4.0](https://github.com/researchgate/spire/compare/v1.3.0...v1.4.0) (2019-03-29)


### Features

* introduce spire-plugin-yarn ([252a924](https://github.com/researchgate/spire/commit/252a924))





# 1.3.0 (2019-02-28)


### Features

* initial commit ([cf8cad0](https://github.com/researchgate/spire/commit/cf8cad0))
