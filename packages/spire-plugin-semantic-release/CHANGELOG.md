# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

## [3.0.2](https://github.com/researchgate/spire/compare/v3.0.1...v3.0.2) (2020-08-07)


### Bug Fixes

* Fix peer dependency for all plugins ([938d5b9](https://github.com/researchgate/spire/commit/938d5b925a8cb0e8d269773bece4732802ea6470))





# [3.0.0](https://github.com/researchgate/spire/compare/v2.2.1...v3.0.0) (2020-07-28)

**Note:** Version bump only for package spire-plugin-semantic-release





## [2.1.5](https://github.com/researchgate/spire/compare/v2.1.4...v2.1.5) (2020-05-12)


### Bug Fixes

* **semantic-release:** Move provider logic from setup to run ([dba578a](https://github.com/researchgate/spire/commit/dba578a2dc6f6f09e1425a95c835b0d44f001084))





## [2.1.4](https://github.com/researchgate/spire/compare/v2.1.3...v2.1.4) (2020-05-05)


### Bug Fixes

* Fix detection of git provider ([6061ef2](https://github.com/researchgate/spire/commit/6061ef28b1e6198931a006f53a365b253177e9b2))





## [2.1.3](https://github.com/researchgate/spire/compare/v2.1.2...v2.1.3) (2020-05-05)


### Bug Fixes

* **semantic-release:** Correctly await results of async functions ([f467fe6](https://github.com/researchgate/spire/commit/f467fe656ed82fbf2a1ae56947707a0f524c29b8))





## [2.1.1](https://github.com/researchgate/spire/compare/v2.1.0...v2.1.1) (2020-04-30)


### Bug Fixes

* **semantic-release:** Set correct peerDependency ([ee316f6](https://github.com/researchgate/spire/commit/ee316f64f7cfc682cf9ecba3967b37875fbb3cea))





# [2.1.0](https://github.com/researchgate/spire/compare/v2.0.2...v2.1.0) (2020-04-30)


### Features

* **semantic-release:** Detect provider if set to auto ([df9b216](https://github.com/researchgate/spire/commit/df9b216e6d33a0506d7a2625a9447777833c3ae4))





## [2.0.2](https://github.com/researchgate/spire/compare/v2.0.1...v2.0.2) (2020-04-30)


### Bug Fixes

* Upgrade peer dependency of all packages ([0988433](https://github.com/researchgate/spire/commit/09884332e1809aa3f55ad5d5d7cf00367947bd02))





## [2.0.1](https://github.com/researchgate/spire/compare/v2.0.0...v2.0.1) (2020-04-30)

**Note:** Version bump only for package spire-plugin-semantic-release





# [2.0.0](https://github.com/researchgate/spire/compare/v1.8.3...v2.0.0) (2020-04-30)


### Bug Fixes

* Use custom resolve method to resolve from current dir and spire install dir ([28743c1](https://github.com/researchgate/spire/commit/28743c1356a24e8a752acca129b58c92646e1631))
* **deps:** update dependency execa to v3 ([#31](https://github.com/researchgate/spire/issues/31)) ([29ce452](https://github.com/researchgate/spire/commit/29ce452ddb145c42c44b5cddd33bf1d96a16fabf))
* **deps:** update dependency execa to v4 ([ea9e466](https://github.com/researchgate/spire/commit/ea9e4661175ef269fad1893c4a93ee1134eb79f8))
* **deps:** update semantic-release monorepo ([b8c2f69](https://github.com/researchgate/spire/commit/b8c2f697363bf0becc8a1f1f53a8d380a73eff9e))


### chore

* require Node.js >=10.18 ([0a2f755](https://github.com/researchgate/spire/commit/0a2f75509d0df070a9c44e427fdefdaf85d05440))


### Features

* **semantic-release:** Allow different providers(github, gitlab, none) to be specified in config ([061ab3e](https://github.com/researchgate/spire/commit/061ab3ea9ba764a8ad25608ce93e1d970c2f12fc))


### BREAKING CHANGES

* **semantic-release:** Default config does not include github steps
* **semantic-release:** There are 3 default configs now (default, github, gitlab) and they all moved into the `config` subfolder
* Require Node.js >= 10.18



## [1.8.2](https://github.com/researchgate/spire/compare/v1.8.1...v1.8.2) (2019-11-15)


### Bug Fixes

* Ensure to set preferLocal to true to pick up local installed binaries ([aeb8df7](https://github.com/researchgate/spire/commit/aeb8df71df50a84e1c972b1eb053c99b4fdb9326))



# [1.8.0](https://github.com/researchgate/spire/compare/v1.7.3...v1.8.0) (2019-11-13)


### Bug Fixes

* **deps:** upgrade execa to v2.0.2 ([fbcfc9f](https://github.com/researchgate/spire/commit/fbcfc9fbc6ee96365b7b10a18b74aee891d8b812))
* **deps:** upgrade semantic-release dependencies ([d78d52c](https://github.com/researchgate/spire/commit/d78d52c7c9cc97c029bf5882a7f55057ca24e1ff))



## [1.7.3](https://github.com/researchgate/spire/compare/v1.7.2...v1.7.3) (2019-06-07)


### Bug Fixes

* rework commands api ([b9657e2](https://github.com/researchgate/spire/commit/b9657e28024f5ef50a71cc261fea0a87f93294ef))



## [1.7.2](https://github.com/researchgate/spire/compare/v1.7.1...v1.7.2) (2019-05-24)


### Bug Fixes

* **cli:** fail on unknown command ([98c6149](https://github.com/researchgate/spire/commit/98c6149215678a79a57b1cbfd10cbefd89569c6a)), closes [#6](https://github.com/researchgate/spire/issues/6) [#5](https://github.com/researchgate/spire/issues/5)



## [1.7.1](https://github.com/researchgate/spire/compare/v1.7.0...v1.7.1) (2019-04-23)

**Note:** Version bump only for package spire-plugin-semantic-release


# [1.7.0](https://github.com/researchgate/spire/compare/v1.4.1...v1.7.0) (2019-04-03)


### Features

* introduce lerna-release plugin ([1e46acf](https://github.com/researchgate/spire/commit/1e46acfe2b0070fb488899d22c61acf7a2782b15))



## [1.4.1](https://github.com/researchgate/spire/compare/v1.4.0...v1.4.1) (2019-03-29)


### Bug Fixes

* resolve config from project root with proper error reporting ([726fa49](https://github.com/researchgate/spire/commit/726fa493eff2420806dd824ce673f18d8ed900c7))



# [1.4.0](https://github.com/researchgate/spire/compare/v1.3.0...v1.4.0) (2019-03-29)


### Features

* introduce spire-plugin-yarn ([252a924](https://github.com/researchgate/spire/commit/252a924ea7b0fbeb40b7ce72f7c589f73978445c))



# [1.3.0](https://github.com/researchgate/spire/compare/cf8cad04d7af152781f3fb5abe02254c61946dc8...v1.3.0) (2019-02-28)


### Features

* initial commit ([cf8cad0](https://github.com/researchgate/spire/commit/cf8cad04d7af152781f3fb5abe02254c61946dc8))
