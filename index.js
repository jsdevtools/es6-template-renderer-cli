const minimist = require('minimist');
const error = require('./utils/error');

module.exports = () => {
  console.log(`${process.argv}`);
  const args = minimist(process.argv.slice(2));

  let cmd = args._[0] || 'render';

  if (args.version || args.v) {
    cmd = 'version';
  }

  if (args.help || args.h) {
    cmd = 'help';
  }

  switch (cmd) {
    case 'render':
      require('./cmds/render')(args);
      break;

    case 'version':
      require('./cmds/version')(args);
      break;

    case 'help':
      require('./cmds/help')(args);
      break;
  }
};
