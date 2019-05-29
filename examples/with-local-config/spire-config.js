module.exports = () => ({
  plugins: [
    function ping() {
      return {
        command: 'ping',
        description: 'replies with pong',
        async run({ logger }) {
          logger.log('pong');
        },
      };
    },
  ],
});
