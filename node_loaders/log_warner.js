/*!
 * LogMapperLoader
 * Copyright(c) 2015 Ryan Scott Norman
 * MIT Licensed
 */

'use strict';

var LogMapper = require('./lib/mapper');
var LogExceptions = require('./lib/exceptions');
var loaderUtils = require('loader-utils');
var path = require('path');


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
function LogMapperLoader(content) {
  var config, logMap, emitter, callback,
  logExceptions, lineExceptions, warningMsg;

  this.cacheable && this.cacheable();
  callback = this.async();

  config = loaderUtils.parseQuery(this.query);
  emitter = config.emitError ? this.emitError : this.emitWarning;

  logMap = new LogMapper(content);
  logExceptions = new LogExceptions(this.resource);
  this.addDependency(path.resolve(LogExceptions.EXCEPTIONS_PATH));

  if (callback) {
    logExceptions.allAsync().then(function(lineExceptions) {

      if (lineExceptions.length > 0) {
        logMap = removeExceptions(logMap, lineExceptions);
      }

      warningMsg = createWarningMessage(logMap);

      if ( emitter && logMap.length > 0 ) {
        emitter(warningMsg);
      }

      callback(null, commentContent(content, warningMsg));

    }.bind(this));
  } else {
    lineExceptions = logExceptions.all();

    if (lineExceptions.length > 0) {
      logMap = removeExceptions(logMap, logExceptions.all());
    }

    warningMsg = createWarningMessage(logMap);

    if ( emitter && logMap.length > 0 ) {
      emitter(warningMsg);
    }

    return commentContent(content, warningMsg);
  }
}

module.exports = LogMapperLoader;
