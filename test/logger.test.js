'use strict';

var expect = require('chai').expect;
var feathers = require('feathers');
var logger = require('../lib/');

describe('Feathers logger', function () {
  var app;

  before(function () {
    app = feathers().configure(logger());
  });

  it('initializes .log', function () {
    expect(typeof app.log).to.equal('function');
  });

  it('initializes .info', function () {
    expect(typeof app.info).to.equal('function');
  });

  it('initializes .warn', function () {
    expect(typeof app.warn).to.equal('function');
  });

  it('initializes .error', function () {
    expect(typeof app.error).to.equal('function');
  });

  it('initializes .fatal', function () {
    expect(typeof app.fatal).to.equal('function');
  });

  it('initializes .debug', function () {
    expect(typeof app.debug).to.equal('function');
  });

  it('initializes .createDebug', function () {
    expect(typeof app.createDebug).to.equal('function');
  });

  it('.createDebug creates a debug', function () {
    var debug = app.createDebug('mynamespace');
    expect(typeof debug).to.equal('function');
  });
});
