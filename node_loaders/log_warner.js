/*!
 * LogMapperLoader
 * Copyright(c) 2015 Ryan Scott Norman
 * MIT Licensed
 */

'use strict';

var logMapper = require('./lib/mapper');
var LogExceptions = require('./lib/exceptions');
var path = require('path');
var loaderUtils = require('loader-utils');

var EXCEPTIONS_PATH = './log-exceptions.json';

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

function removeExceptions(logOccurrences, exceptions) {
  return logOccurrences.filter(function(occurrence) {
    return exceptions.indexOf(occurrence.lineNumber) === -1;
  })
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
  var logMap, warningMessage, emitter,
  config, skipLines, logExceptions, callback;

  config = loaderUtils.parseQuery(this.query);

  emitter = config.emitError ? this.emitError : this.emitWarning;

  this.cacheable && this.cacheable();

  callback = this.async();

  logMap = LogMapper(content);

  this.addDependency(path.resolve(EXCEPTIONS_PATH));
  logExceptions = new LogExceptions(EXCEPTIONS_PATH);

  if (callback) {
    logExceptions.allAsync(this.resource).then(function(skipLines) {
      logMap = removeExceptions(logMap, skipLines);

      warningMessage = createWarningMessage(logMap);

      if ( logMap.length > 0 ) {
        emitter && emitter(warningMessage);
      }

      callback(null, commentContent(content, warningMessage));
    });
  } else {

    skipLines = logExceptions.all(this.resource);
    logMap = removeExceptions(logMap, skipLines);

    warningMessage = createWarningMessage(logMap);

    config = loaderUtils.parseQuery(this.query);

    emitter = config.emitError ? this.emitError : this.emitWarning;

    if ( logMap.length > 0 ) {
      emitter && emitter(warningMessage);
    }

    return commentContent(content, warningMessage);
  }
}

module.exports = LogHunterLoader;
