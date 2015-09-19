/*!
 * LogProcessorLoader
 * Copyright(c) 2015 Ryan Scott Norman
 * MIT Licensed
 */

'use strict';

var logProcessor = require('./lib/processor');

/**
 * Process `log(...)` calls, converts to `console.log(...)`
 * calls with file-location-aware context
 *
 * @param {String} content with potential `log` statements
 * @return {String} content without "console.log" statements
 */
function LogProcessorLoader(content) {
  var processResult;

  this.cacheable && this.cacheable();

  processResult = logProcessor(content);

  this.sourceMap = processResult.sourceMap;
  return processResult.content;
}

module.exports = LogProcessorLoader;
