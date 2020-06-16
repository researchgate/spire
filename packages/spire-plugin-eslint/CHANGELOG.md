# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

## [2.2.1](https://github.com/researchgate/spire/compare/v2.2.0...v2.2.1) (2020-06-16)


### Bug Fixes

* Only write eslint config if non exists already ([a521b2d](https://github.com/researchgate/spire/commit/a521b2d6d14f0d63eafc1eefad1fe8a9dab5dd0c))
* Set 'use strict' in generated eslint config ([e7b2b46](https://github.com/researchgate/spire/commit/e7b2b46753d65faaa966c98adcfc69f5fa624141))





# [2.2.0](https://github.com/researchgate/spire/compare/v2.1.8...v2.2.0) (2020-06-11)


### Bug Fixes

* **deps:** update dependency eslint to v7 ([5936f7a](https://github.com/researchgate/spire/commit/5936f7a8ca554d59a79a0972c0f82f0c130080ef))
* **eslint:** Ensure an empty line is added at generated eslintrc file ([e351155](https://github.com/researchgate/spire/commit/e351155f2db5edf2e3bfd19bacf89d017bdcb247))


### Features

* **eslint:** Add new option to specify file extensions and deprecate glob option ([5de25e7](https://github.com/researchgate/spire/commit/5de25e7576943ea7049ec487c4c6153b4aae21f9))





## [2.0.2](https://github.com/researchgate/spire/compare/v2.0.1...v2.0.2) (2020-04-30)


### Bug Fixes

* Upgrade peer dependency of all packages ([0988433](https://github.com/researchgate/spire/commit/09884332e1809aa3f55ad5d5d7cf00367947bd02))





## [2.0.1](https://github.com/researchgate/spire/compare/v2.0.0...v2.0.1) (2020-04-30)

**Note:** Version bump only for package spire-plugin-eslint





# [2.0.0](https://github.com/researchgate/spire/compare/v1.8.3...v2.0.0) (2020-04-30)


### Bug Fixes

* **deps:** update dependency execa to v3 ([#31](https://github.com/researchgate/spire/issues/31)) ([29ce452](https://github.com/researchgate/spire/commit/29ce452ddb145c42c44b5cddd33bf1d96a16fabf))
* **deps:** update dependency execa to v4 ([ea9e466](https://github.com/researchgate/spire/commit/ea9e4661175ef269fad1893c4a93ee1134eb79f8))
* **eslint:** Check all files if the extend the correct config ([4b499e1](https://github.com/researchgate/spire/commit/4b499e13efb8fc76c3ed953d14e4eac258648830))
* **eslint:** Correctly write and read eslint config files ([0a66686](https://github.com/researchgate/spire/commit/0a666868e8d87e5c184c931dcd089831d21b7713))
* Use custom resolve method to resolve from current dir and spire install dir ([28743c1](https://github.com/researchgate/spire/commit/28743c1356a24e8a752acca129b58c92646e1631))


### chore

* require Node.js >=10.18 ([0a2f755](https://github.com/researchgate/spire/commit/0a2f75509d0df070a9c44e427fdefdaf85d05440))


### Features

* **eslint:** Add prettier to default eslint config ([#38](https://github.com/researchgate/spire/issues/38)) ([ab75b4b](https://github.com/researchgate/spire/commit/ab75b4b1f375a4ce48d9630bc9972b60f65870df))
* **eslint:** Automatically create config for editor support ([e936e55](https://github.com/researchgate/spire/commit/e936e55dc38aab1c3dd7f16cd08daa38243cb081))
* **eslint:** Support also json and yaml config files ([4f49f5c](https://github.com/researchgate/spire/commit/4f49f5ce425d37d6c18f621072aba675fa752986))
* **eslint:** Use eslint:recommended instead of unobtrusive ([3df16cd](https://github.com/researchgate/spire/commit/3df16cd0f333f249833bab0933406320e6b91816))


### BREAKING CHANGES

* Require Node.js >= 10.18
* **eslint:** prettier is enabled in the default eslint config



## [1.8.2](https://github.com/researchgate/spire/compare/v1.8.1...v1.8.2) (2019-11-15)


### Bug Fixes

* Ensure to set preferLocal to true to pick up local installed binaries ([aeb8df7](https://github.com/researchgate/spire/commit/aeb8df71df50a84e1c972b1eb053c99b4fdb9326))



# [1.8.0](https://github.com/researchgate/spire/compare/v1.7.3...v1.8.0) (2019-11-13)


### Bug Fixes

* **deps:** upgrade eslint dependecies ([0d66919](https://github.com/researchgate/spire/commit/0d669197266d9b9318a74d9cbd27d0686eb82903))
* **deps:** upgrade execa to v2.0.2 ([fbcfc9f](https://github.com/researchgate/spire/commit/fbcfc9fbc6ee96365b7b10a18b74aee891d8b812))


### Features

* **eslint:** Support also json and yaml config files ([b0e5d98](https://github.com/researchgate/spire/commit/b0e5d983e40bcdfd127c69842480a310358a8dd9))



## [1.7.3](https://github.com/researchgate/spire/compare/v1.7.2...v1.7.3) (2019-06-07)


### Bug Fixes

* rework commands api ([b9657e2](https://github.com/researchgate/spire/commit/b9657e28024f5ef50a71cc261fea0a87f93294ef))



## [1.7.2](https://github.com/researchgate/spire/compare/v1.7.1...v1.7.2) (2019-05-24)


### Bug Fixes

* **cli:** fail on unknown command ([98c6149](https://github.com/researchgate/spire/commit/98c6149215678a79a57b1cbfd10cbefd89569c6a)), closes [#6](https://github.com/researchgate/spire/issues/6) [#5](https://github.com/researchgate/spire/issues/5)



## [1.7.1](https://github.com/researchgate/spire/compare/v1.7.0...v1.7.1) (2019-04-23)

**Note:** Version bump only for package spire-plugin-eslint


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
