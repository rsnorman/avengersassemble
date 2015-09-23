/*!
 * LogMapperLoader
 * Copyright(c) 2015 Ryan Scott Norman
 * MIT Licensed
 */

'use strict';

var LogMapper = require('./lib/mapper');
var loaderUtils = require('loader-utils');

/**
 * Creates a warning message for all "console.log" occurrences
 *
 * @param {Array} logOccurrences that appear in content
 * @return {String} message with all "console.log" occurrences
 */
function createWarningMessage(logOccurrences) {
  var message;

  message = 'Found ' + logOccurrences.length + ' "console.log" statements\n'

  return logOccurrences.reduce(function(msg, occurrence) {
    return msg + '  "' + occurrence.content + '" on line ' + occurrence.lineNumber + '\n';
  }, message);
}

function commentContent(content, message) {
  var commentWarning;
  commentWarning = message.split('\n').map(function(line) {
    return '// ' + line;
  }).join('\n');

  return commentWarning + '\n\n' + content;
}

/**
 * Loader for finding and/or removing "console.log" statements
 *
 * @param {String} content with potential "console.log" statements
 * @return {String} original content with or without "console.log" statements
 */
function LogHunterLoader(content) {
}

module.exports = LogHunterLoader;
