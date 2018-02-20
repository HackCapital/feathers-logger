/*
 * feathers-feathers-logger
 * https://github.com/feathersjs/feathers-logger
 *
 * Copyright (c) 2014 Eric Kryski
 * Licensed under the MIT license.
 *
 * Modified to support debug namespaces.
 */

var _ = require('lodash');
var debug = require('debug');
var bunyan = require('bunyan');

module.exports = function (options) {
  var defaults = { name: 'root', level: 0 };
  options = _.extend({}, defaults, options);
  var rootNamespace = options.name;
  var rootDebug = debug(rootNamespace);

  // If you use DEBUG=mynamespace* but Bunyan's log level is too high
  // debug messages won't be shown. This could be confusing so if rootDebug is
  // enabled we drop the log level to ensure that bunyan debugs appear.
  if (rootDebug.enabled) _.extend(options, { level: 0 });

  // Single bunyan logger
  var logger = bunyan.createLogger(options);

  return function () {
    var app = this;

    /**
     * createDebugger()
     * Instantiate a new debug instance
     * with a namespace to be used for filtering.
     *
     * ie. var myDebug = app.createDebugger('worker:a');
     * myDebug('doing some work');
     * DEBUG=worker:*
     *
     * @param str
     */

    app.createDebug = function(namespace) {
      var fullNamespace = `${rootNamespace}:${namespace}`;
      var namespacedDebug = debug(fullNamespace);
      var namespacedBunyan = bunyan(_.extend({}, options, {
        name: fullNamespace,
      }));

      // Return a debug function
      return function() {
        if (!namespacedDebug.enabled) return;
        namespacedBunyan.debug.apply(namespacedBunyan, arguments);
      };
    };

    app.log = function() {
      logger.info.apply(logger, arguments); // Bunyan doesn't have a `log` level.
    };

    app.info = function() {
      logger.info.apply(logger, arguments);
    };

    app.warn = function() {
      logger.warn.apply(logger, arguments);
    };

    app.error = function() {
      logger.error.apply(logger, arguments);
    };

    app.fatal = function() {
      logger.fatal.apply(logger, arguments);
    };

    app.debug = function() {
      if (!rootDebug.enabled) return;
      logger.debug.apply(logger, arguments);
    };

  };
};
