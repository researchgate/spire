module.exports = {
  branches: ['main', 'master'],
  plugins: [
    '@semantic-release/commit-analyzer',
    '@semantic-release/release-notes-generator',
    '@semantic-release/npm',
    [
      '@semantic-release/changelog',
      {
        changelogFile: process.env.SPIRE_CHANGELOG_NAME,
      },
    ],
    '@semantic-release/gitlab',
    [
      '@semantic-release/git',
      {
        assets: [process.env.SPIRE_CHANGELOG_NAME, 'package.json'],
      },
    ],
  ],
};
