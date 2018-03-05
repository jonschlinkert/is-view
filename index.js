'use strict';

const kindOf = require('kind-of');

module.exports = function(view) {
  if (kindOf(view) === 'object') {
    if (view._isVinyl === true || view.isView === true) {
      return true;
    }
    if (typeof view.path === 'string') {
      return true;
    }
    if (isValidContent(view.content) || isValidContents(view.contents)) {
      return true;
    }
  }
  return false;
};

function isValidContents(val) {
  return isStream(val) || isBuffer(val) || val === null;
}

function isValidContent(val) {
  return typeof val === 'string' || val === null;
}

function isBuffer(val) {
  return kindOf(val) === 'buffer';
}

function isStream(val) {
  return kindOf(val) === 'object' && typeof val.pipe === 'function';
}
