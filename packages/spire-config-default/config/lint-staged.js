module.exports = {
  linters: JSON.parse(process.env.SPIRE_LINTERS || '{}'),
  globOptions: {
    nocase: true,
  },
};
