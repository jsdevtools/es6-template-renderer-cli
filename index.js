module.exports = (filepath, options, callback) => {
  try {
    const result = require(filepath)(options);
    callback(null, result);
  } catch (err) {
    callback(err, null);
  }
};
