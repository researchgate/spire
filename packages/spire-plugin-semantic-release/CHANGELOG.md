# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

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



# 1.8.0 (2019-11-13)





## [1.8.2](https://github.com/researchgate/spire/compare/v1.8.1...v1.8.2) (2019-11-15)


### Bug Fixes

* Ensure to set preferLocal to true to pick up local installed binaries ([aeb8df7](https://github.com/researchgate/spire/commit/aeb8df7))





# [1.8.0](https://github.com/researchgate/spire/compare/v1.7.3...v1.8.0) (2019-11-13)


### Bug Fixes

* **deps:** upgrade execa to v2.0.2 ([fbcfc9f](https://github.com/researchgate/spire/commit/fbcfc9f))
* **deps:** upgrade semantic-release dependencies ([d78d52c](https://github.com/researchgate/spire/commit/d78d52c))





## [1.7.3](https://github.com/researchgate/spire/compare/v1.7.2...v1.7.3) (2019-06-07)


### Bug Fixes

* rework commands api ([b9657e2](https://github.com/researchgate/spire/commit/b9657e2))





## [1.7.2](https://github.com/researchgate/spire/compare/v1.7.1...v1.7.2) (2019-05-24)


### Bug Fixes

* **cli:** fail on unknown command ([98c6149](https://github.com/researchgate/spire/commit/98c6149))





## [1.7.1](https://github.com/researchgate/spire/compare/v1.7.0...v1.7.1) (2019-04-23)

**Note:** Version bump only for package spire-plugin-semantic-release





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
