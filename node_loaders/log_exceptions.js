/*!
 * LogExceptionsLoader
 * Copyright(c) 2015 Ryan Scott Norman
 * MIT Licensed
 */

'use strict';

var LogExceptions = require('./lib/exceptions');
var path = require('path');
var fs = require('fs');
var loaderUtils = require('loader-utils');

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
  exceptionsPath = path.resoEXCEPTIONS_PATH);

   this.cacheable && this.cacheable();

   callback = this.async();

   if (callback) {
     new LogExceptions(content).createFile(exceptionsPath, function success() {
       callback(null, content);
     });
   } else {
     new LogExceptions(content).createFile(exceptionsPath);
     return content;
   }

  return content;
}

LogExceptionsLoader.EXCEPTIONS_PATH = path.resolve('/.log-exceptions.json');

module.exports = LogExceptionsLoader;
