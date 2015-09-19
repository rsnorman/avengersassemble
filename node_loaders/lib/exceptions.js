/*!
 * LogExceptions
 * Copyright(c) 2015 Ryan Scott Norman
 * MIT Licensed
 */

'use strict';

function LogExceptions(content) {
  this.createFile = function(exceptionsFilepath, successCallback) {
    if (successCallback) {
      successCallback();
    } else {
      return;
    }
  };
};

module.exports = LogExceptions;
