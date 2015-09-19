/*!
 * LogRemover
 * Copyright(c) 2015 Ryan Scott Norman
 * MIT Licensed
 */

'use strict';

var LOG_MATCHER = /console.log(?:.(?:call|apply))?\(.*?\);?/g;

/**
 * Finds all the "console.log" calls in a string of content and removes them
 *
 * @param {String} content content that may contain "console.log" calls
 * @return {Object} containing content without "console.log" calls
 */
function LogRemover(content) {
  return content.replace(LOG_MATCHER, '');
};

module.exports = LogRemover;
