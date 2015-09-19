/*!
 * LogRemoverLoader
 * Copyright(c) 2015 Ryan Scott Norman
 * MIT Licensed
 */

'use strict';

var logRemover = require('./lib/remover');

/**
 * Loader for finding and removing "console.log" statements
 *
 * @param {String} content with potential "console.log" statements
 * @return {String} original content without "console.log" statements
 */
function LogRemoverLoader(content) {
  var loglessContent;

  this.cacheable && this.cacheable();

  loglessContent = logRemover(content);
  return loglessContent;
}

module.exports = LogRemoverLoader;
