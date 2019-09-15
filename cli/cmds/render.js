const error = require('../utils/error');
const path = require('path');
const globby = require('globby');
const mkdirp = require('mkdirp');
const util = require('util');
const etr = require('../../')();

module.exports = options => {
  const writeFile = util.promisify(require('fs').writeFile);

  const templates = options.templates.map(template => path.posix.join(options.baseDir, template));

  const templatePaths = globby.sync(templates);

  const outPaths = templatePaths.map(templatePath => {
    const parts = path.parse(
      path.resolve(options.outDir || options.baseDir, path.relative(options.baseDir, templatePath)),
    );
    return path.resolve(parts.dir, parts.name + options.extension);
  });

  if (!templatePaths) {
    error(`No files matching "${options.templates}"`, true);
  }

  const results = templatePaths.map(templatePath => {
    let retVal;
    etr(
      path.resolve(templatePath),
      (val => (val ? require(path.resolve(process.cwd(), val)) : {}))(options.data),
      (err, content) => {
        if (err) {
          throw err;
        } else {
          retVal = content;
        }
      },
    );
    return retVal;
  });

  const retVal = outPaths.map((outPath, index) => {
    if (options.outDir) {
      mkdirp(path.dirname(outPath));
      writeFile(outPath, results[index], 'utf-8');
      return null;
    } else {
      return results[index];
    }
  });

  return retVal.join('');
};
