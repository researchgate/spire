module.exports = () => ({
  plugins: [
    function ping({ setCommand, getCommand }) {
      const command = Symbol.for('ping');
      return {
        async setup({ cli }) {
          cli.command(
            'ping',
            'replies with pong',
            () => {},
            () => setCommand(command)
          );
        },
        async skip() {
          return getCommand() !== command;
        },
        async run({ logger }) {
          logger.log('pong');
        },
      };
    },
  ],
});
