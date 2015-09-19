/*!
 * LogExceptionsLoader
 * Copyright(c) 2015 Ryan Scott Norman
 * MIT Licensed
 */

'use strict';

var LogExceptions = require('./lib/exceptions');
var path = require("path");
var loaderUtils = require("loader-utils");

var EXCEPTIONS_FILENAME = './log_hunter/exceptions.json'

function fileExists(content) {
  return false;
}

/**
 * Creates an exceptions JSON file with all the current "console.log" calls
 *
 * @param {String} content with potential "console.log" statements
 * @return {String} unchanged content
 */
function LogExceptionsLoader(content) {
  var callback, config, exceptionsPath;
  //
  exceptionsPath = path.resolve(EXCEPTIONS_FILENAME);
  console.log(exceptionsPath);
  //
  // this.addDependency(exceptionsPath);
  //
  // this.cacheable && this.cacheable();
  // callback = this.async();
  //
  // config = loaderUtils.parseQuery(this.query);
  //
  // if (fileExists(exceptionsPath) && !config.force) {
  //   return;
  // }
  //
  // if (!!callback) {
  //   new LogExceptions(content).createFile(exceptionsPath, function success() {
  //     console.log(content);
  //     callback(content);
  //   });
  // } else {
  //   new LogExceptions(content, exceptionsPath).createFile();
  //   return content;
  // }

  return content;
}

module.exports = LogExceptionsLoader;
