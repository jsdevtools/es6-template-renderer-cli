module.exports = async args => {
  const error = require('../utils/error');
  const path = require('path');
  const glob = require('globby');
  const util = require('util');
  const mkdirp = require('mkdirp');

  const writeFile = util.promisify(require('fs').writeFile);
  const templates = (val => (Array.isArray(val) ? val : [val]))(args.templates || args.t || '*.etr');
  const data = (val => (val ? require(path.resolve(process.cwd(), val)) : {}))(args.locals || args.l);
  const baseDir = args.base || args.b || './';
  const outDir = args.out || args.o || baseDir;
  const extension = args.extension || args.e || '.html';

  const templatePaths = await glob(templates.map(template => path.join(baseDir, template)));

  const outPaths = templatePaths.map(templatePath => {
    const parts = path.parse(path.resolve(outDir, path.relative(baseDir, templatePath)));
    return path.resolve(parts.dir, parts.name + extension);
  });

  if (!templatePaths) {
    error(`No files matching "${templates}"`, true);
  }

  const results = templatePaths.map(templatePath => {
    return require(path.resolve(baseDir, templatePath))(data);
  });

  outPaths.map((outPath, index) => {
    mkdirp(path.dirname(outPath));
    writeFile(outPath, results[index], 'utf-8');
  });
};
