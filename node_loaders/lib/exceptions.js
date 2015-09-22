/*!
 * LogExceptions
 * Copyright(c) 2015 Ryan Scott Norman
 * MIT Licensed
 */

'use strict';

var fs = require('fs');
var Promise = require('bluebird');
var path = require('path');
Promise.promisifyAll(fs);

var EXCEPTIONS_FILENAME = './log-exceptions.json';


function LogExceptions(contentFile) {

  function getExceptionFile(exceptionFile) {
    return contentFile.indexOf(path.resolve(exceptionFile.filename)) !== -1;
  }

  function getLineNumbers(exceptionFile) {
    return exceptionFile.lines;
  }

  this.all = function() {
    var exceptionData, exceptions;

    try {
      fs.accessSync(LogExceptions.EXCEPTIONS_PATH, fs.R_OK | fs.W_OK);
    } catch(_e) {
      return [];
    }

    exceptionData = fs.readFileSync(LogExceptions.EXCEPTIONS_PATH, 'utf8');
    exceptions = JSON.parse(exceptionData);

    return exceptions
    .filter(getExceptionFile)
    .map(getLineNumbers)
    .reduce(function(lines, lineNumbers) {
      return lines.concat(lineNumbers);
    }, []);
  };

  this.allAsync = function(callback) {
   return new Promise(function(resolve, reject) {
      fs.accessAsync(LogExceptions.EXCEPTIONS_PATH, fs.R_OK | fs.W_OK).then(function() {
        fs.readFileAsync(LogExceptions.EXCEPTIONS_PATH, 'utf8').then(function(exceptionData) {
          var exceptions;
          exceptions = JSON.parse(exceptionData);

          resolve(
            exceptions
            .filter(getExceptionFile)
            .map(getLineNumbers)
            .reduce(function(lines, lineNumbers) {
              return lines.concat(lineNumbers);
            }, [])
          );
        }).catch(function(error) {
          reject('Could not read file');
        });
      }).catch(function(error) {
        console.log('could not read file', error);
        resolve([]);
      });
    });
  };
};

LogExceptions.EXCEPTIONS_PATH = './log-exceptions.json';

module.exports = LogExceptions;
