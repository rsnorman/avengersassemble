/*!
 * LogProcessor
 * Copyright(c) 2015 Ryan Scott Norman
 * MIT Licensed
 */

'use strict';

function LogProcessor(content) {
  return {
    content: content,
    sourceMap: null
  };
};

module.exports = LogProcessor;
