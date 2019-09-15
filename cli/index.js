const minimist = require('minimist');
const path = require('path');

module.exports = () => {
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
      const options = {
        templates: (val => (Array.isArray(val) ? val : [val]))(args.templates || args.t || '*.etr'),
        data: args.locals || args.l,
        baseDir: args.base || args.b || './',
        outDir: args.out || args.o,
        extension: args.extension || args.e || '.html',
      };
      const output = require('./cmds/render')(options);
      if (!options.outDir) {
        console.log(JSON.stringify(output));
      }
      break;

    case 'version':
      require('./cmds/version')(args);
      break;

    case 'help':
      require('./cmds/help')(args);
      break;
  }
};
