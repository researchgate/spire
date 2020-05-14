# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

## [2.1.6](https://github.com/researchgate/spire/compare/v2.1.5...v2.1.6) (2020-05-14)


### Bug Fixes

* **deps:** update dependency lerna to v3.21.0 ([a5edeef](https://github.com/researchgate/spire/commit/a5edeef420411ad2cc807ae597eecd3f57205791))





## [2.0.2](https://github.com/researchgate/spire/compare/v2.0.1...v2.0.2) (2020-04-30)


### Bug Fixes

* Upgrade peer dependency of all packages ([0988433](https://github.com/researchgate/spire/commit/09884332e1809aa3f55ad5d5d7cf00367947bd02))





## [2.0.1](https://github.com/researchgate/spire/compare/v2.0.0...v2.0.1) (2020-04-30)

**Note:** Version bump only for package spire-plugin-lerna-release





# [2.0.0](https://github.com/researchgate/spire/compare/v1.8.3...v2.0.0) (2020-04-30)


### Bug Fixes

* **deps:** pin dependencies ([7b23a2e](https://github.com/researchgate/spire/commit/7b23a2e1b31ada96275ea1b0607852facc354c24))
* disable non-interactive mode and github-release by default ([8e4d789](https://github.com/researchgate/spire/commit/8e4d7899ecb86a665dfc89cd60c5d665fba8653f))


### chore

* require Node.js >=10.18 ([0a2f755](https://github.com/researchgate/spire/commit/0a2f75509d0df070a9c44e427fdefdaf85d05440))


### Features

* Support latest lerne options for creating github and gitlab releases ([614570f](https://github.com/researchgate/spire/commit/614570f2dcd6427743cbb2846c991c4b2bc2911d))


### BREAKING CHANGES

* Require Node.js >= 10.18
* This removes the `githubRelease: true` option. To migrate change the option to `createRelease: "github"`
* The default configuration for githubRelease changed to `false` and publish is now run in interactive mode by default. If you want non-interactive mode again add `--yes` to `extraArgs` config.



## [1.8.2](https://github.com/researchgate/spire/compare/v1.8.1...v1.8.2) (2019-11-15)


### Bug Fixes

* Ensure to set preferLocal to true to pick up local installed binaries ([aeb8df7](https://github.com/researchgate/spire/commit/aeb8df71df50a84e1c972b1eb053c99b4fdb9326))



# [1.8.0](https://github.com/researchgate/spire/compare/v1.7.3...v1.8.0) (2019-11-13)


### Bug Fixes

* **deps:** update lerna to v3.15.0 ([85dc893](https://github.com/researchgate/spire/commit/85dc8933ae24cf0e6bac3eac0443082ae35100b5))



## [1.7.3](https://github.com/researchgate/spire/compare/v1.7.2...v1.7.3) (2019-06-07)


### Bug Fixes

* rework commands api ([b9657e2](https://github.com/researchgate/spire/commit/b9657e28024f5ef50a71cc261fea0a87f93294ef))



## [1.7.2](https://github.com/researchgate/spire/compare/v1.7.1...v1.7.2) (2019-05-24)


### Bug Fixes

* **cli:** fail on unknown command ([98c6149](https://github.com/researchgate/spire/commit/98c6149215678a79a57b1cbfd10cbefd89569c6a)), closes [#6](https://github.com/researchgate/spire/issues/6) [#5](https://github.com/researchgate/spire/issues/5)



# [1.7.0](https://github.com/researchgate/spire/compare/v1.4.1...v1.7.0) (2019-04-03)


### Features

* introduce lerna-release plugin ([1e46acf](https://github.com/researchgate/spire/commit/1e46acfe2b0070fb488899d22c61acf7a2782b15))
