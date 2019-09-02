# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# [2.0.0](https://github.com/researchgate/spire/compare/v1.7.3...v2.0.0) (2019-09-02)


### Bug Fixes

* **deps:** update jest to v24.8.0 ([02e08cc](https://github.com/researchgate/spire/commit/02e08cc))
* **deps:** update lerna to v3.15.0 ([85dc893](https://github.com/researchgate/spire/commit/85dc893))
* **deps:** update lint-staged to v8.2.1 ([032ebd7](https://github.com/researchgate/spire/commit/032ebd7))
* **deps:** upgrade eslint dependecies ([0d66919](https://github.com/researchgate/spire/commit/0d66919))
* **deps:** upgrade execa to v2.0.2 ([fbcfc9f](https://github.com/researchgate/spire/commit/fbcfc9f))
* **deps:** upgrade fs-extra to v8.0.1 ([21643aa](https://github.com/researchgate/spire/commit/21643aa))
* **deps:** upgrade import-from to v3.0.0 ([06f3800](https://github.com/researchgate/spire/commit/06f3800))
* **deps:** upgrade semantic-release dependencies ([d78d52c](https://github.com/researchgate/spire/commit/d78d52c))
* disable non-interactive mode and github-release by default ([8e4d789](https://github.com/researchgate/spire/commit/8e4d789))
* set `rootDir` token to workspace root ([1d25fab](https://github.com/researchgate/spire/commit/1d25fab))


### BREAKING CHANGES

* The default configuration for githubRelease changed to `false` and publish is now run in interactive mode by default. If you want non-interactive mode again add `--yes` to `extraArgs` config.





## [1.7.3](https://github.com/researchgate/spire/compare/v1.7.2...v1.7.3) (2019-06-07)


### Bug Fixes

* **ci:** pass --yes flag to lerna pre-release ([cca84bc](https://github.com/researchgate/spire/commit/cca84bc))
* rework commands api ([b9657e2](https://github.com/researchgate/spire/commit/b9657e2))





# Change Log

All notable changes to this project will be documented in this file. See
[Conventional Commits](https://conventionalcommits.org) for commit guidelines.

## [1.7.2](https://github.com/researchgate/spire/compare/v1.7.1...v1.7.2) (2019-05-24)

### Bug Fixes

- **ci:** avoid pre\* hooks clash in prerelease script
  ([aa344a0](https://github.com/researchgate/spire/commit/aa344a0))
- **cli:** fail on unknown command
  ([98c6149](https://github.com/researchgate/spire/commit/98c6149)), closes
  [#6](https://github.com/researchgate/spire/issues/6)
  [#5](https://github.com/researchgate/spire/issues/5)

# Change Log

All notable changes to this project will be documented in this file. See
[Conventional Commits](https://conventionalcommits.org) for commit guidelines.

## [1.7.1](https://github.com/researchgate/spire/compare/v1.7.0...v1.7.1) (2019-04-23)

### Bug Fixes

- allow to skip git check
  ([3237eb3](https://github.com/researchgate/spire/commit/3237eb3))

# Change Log

All notable changes to this project will be documented in this file. See
[Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# [1.7.0](https://github.com/researchgate/spire/compare/v1.4.1...v1.7.0) (2019-04-03)

### Features

- introduce lerna-release plugin
  ([1e46acf](https://github.com/researchgate/spire/commit/1e46acf))

# Change Log

All notable changes to this project will be documented in this file. See
[Conventional Commits](https://conventionalcommits.org) for commit guidelines.

## [1.4.1](https://github.com/researchgate/spire/compare/v1.4.0...v1.4.1) (2019-03-29)

### Bug Fixes

- resolve config from project root with proper error reporting
  ([726fa49](https://github.com/researchgate/spire/commit/726fa49))

# Change Log

All notable changes to this project will be documented in this file. See
[Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# [1.4.0](https://github.com/researchgate/spire/compare/v1.3.0...v1.4.0) (2019-03-29)

### Features

- introduce spire-plugin-yarn
  ([252a924](https://github.com/researchgate/spire/commit/252a924))

# Change Log

All notable changes to this project will be documented in this file. See
[Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# 1.3.0 (2019-02-28)

### Features

- initial commit ([cf8cad0](https://github.com/sbekrin/spire/commit/cf8cad0))
