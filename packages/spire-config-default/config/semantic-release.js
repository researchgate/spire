module.exports = {
  verifyConditions: [
    '@semantic-release/changelog',
    '@semantic-release/github',
    '@semantic-release/git',
  ],
  analyzeCommits: '@semantic-release/commit-analyzer',
  verifyRelease: [],
  generateNotes: ['@semantic-release/release-notes-generator'],
  prepare: [
    '@semantic-release/npm',
    {
      path: '@semantic-release/changelog',
      changelogFile: process.env.SPIRE_CHANGELOG_NAME,
    },
    {
      path: '@semantic-release/git',
      assets: [process.env.SPIRE_CHANGELOG_NAME, 'package.json'],
    },
  ],
  publish: ['@semantic-release/npm', '@semantic-release/github'],
  success: ['@semantic-release/github'],
  fail: ['@semantic-release/github'],
};
