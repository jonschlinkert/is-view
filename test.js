'use strict';

require('mocha');
var assert = require('assert');
var isView = require('./');

describe('is-view', function() {
  it('should be false when not a view', function() {
    assert(!isView({}));
  });

  it('should be true when view._isVinyl is true', function() {
    assert(isView({ _isVinyl: true }));
  });

  it('should be true when view.isView is true', function() {
    assert(isView({ isView: true }));
  });

  it('should be true when view.path is a string', function() {
    assert(isView({ path: '' }));
    assert(isView({ path: 'foo' }));
    assert(!isView({ path: null }));
    assert(!isView({ path: {} }));
  });

  it('should be true when view.content is a string', function() {
    assert(isView({ content: '' }));
    assert(isView({ content: 'foo' }));
    assert(isView({ content: null }));
  });

  it('should be false when view.content is invalid', function() {
    assert(!isView({ content: undefined }));
    assert(!isView({ content: {} }));
  });

  it('should be true when view.contents is a buffer', function() {
    assert(isView({ contents: new Buffer('') }));
    assert(isView({ contents: new Buffer('foo') }));
  });

  it('should be true when view.contents is null', function() {
    assert(isView({ contents: null }));
  });

  it('should be true when view.contents is an object with .pipe function', function() {
    assert(isView({ contents: { pipe: () => {} } }));
  });

  it('should be false when view.contents is invalid', function() {
    assert(!isView({ contents: {} }));
    assert(!isView({ contents: new Date() }));
    assert(!isView({ contents: '' }));
    assert(!isView({ contents: undefined }));
  });

  it('should true when any view properties are valid', function() {
    assert(isView({ path: '', contents: {} }));
    assert(isView({ path: {}, contents: new Buffer('') }));
    assert(isView({ path: {}, content: '' }));
    assert(isView({ content: {}, contents: null }));
  });
});
