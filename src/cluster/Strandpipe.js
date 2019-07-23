/*
 *   Copyright (c) 2019 Billy Addlers (Riichi Rusdiana)<finnsonalca123@gmail.com>
 *   All rights reserved.
 */

// Emits debug session, LOL XD
const { EventEmitter } = require('events')
// Useful to checks for value
const _ = require('lodash')
const Pipe = require('fibers')
const Future = require('fibers/future')
const packagemeta = require('../../package.json')
const check = require('../utils/Check')
/**
 * @typedef ErrorType OPTIONS (...args)
 * - INVALID_OPTION (property, must)
 * - FILE_NOT_FOUND (file)
 * - MODULE_NOT_FOUND (module)
 * - SYNCJOB_ERROR (error)
 * - EMITTED (message)
 * - SCRIPT_ERROR (locate, error)
 * - FATAL_ERROR (error)
 */
/**
 * An Extended instance of native error
 * @constructor
 * @param {ErrorType}
 * @returns {Error}
 */
const { TypeError, RangeError } = require('../localization')

// Symbol, useful to define private methods
const _debugStackTrace = Symbol('debugStackTrace')

/**
 * The base of Strandpipe, consist of method for running and yielding synchronous jobs.
 * Instance of Fibers/Coroutines.
 * @method Pipe
 */
exports.Pipe = Pipe
/**
 * The base of Future methods and stuff
 * @method Future
 */
exports.Future = Future
/**
 * The source of everything, control the flow of Async/Await and Promises function.
 * @module Strandpipe
 * @extends {EventEmitter}
 * @author Riichi_Rusdiana#6815
 */
class Strandpipe extends EventEmitter {
  /**
   * Start a Strandpipe class
   * Consist of function that will be used a lots in the Pipestream
   * @constructor
   */
  constructor (...args) {
    super(...args)
    /**
     * Print annoying fancy logo
     */
    const _initialize = [
      `                                       `,
      `  OOOO    WW              WW    OOOO   `,
      `OO    OO   WW            WW   OO    OO `,
      `OO    OO    WW          WW    OO    OO `,
      `OO    OO     WW   WW   WW     OO    OO `,
      `OO    OO      WW W  W WW      OO    OO `,
      `  OOOO          W    W          OOOO   `,
      `                                       `,
      `  Starting a Strandpipe...             `,
      `  version ${this.version}              `,
      `  Running a subset of Pipeline Task... `,
      `                                       `]

    this[_debugStackTrace](_initialize)

    this.version = packagemeta.version
    /**
     * Header for debugging
     */
    this.debugHeader = `[Pipeline] [Debug] `

    /**
     * Get current running Pipestream.
     * Will throw an error if no Pipestream is running.
     * @method getPipeStream
     * @returns {Pipe}
     */
    this.getPipeStream = () => {
      var pipe = Pipe.current
      if (pipe === undefined) throw new RangeError('SYNCJOB_ERROR', ' no Active Pipe detected..')
      return pipe
    }

    /**
     * Run a Task to circulate Asynchronous value into Synchronous value.
     * Need a running Pipestream, and needs to be placed inside a `Pipe`. Only for `.then()`-able function.
     * Use `streamSync()` for another type of callback.
     * @param {Function} next A Function/Task that needs to be executed in order to get the Promised value
     * @method sync
     * @returns {*} The result of running task
     */
    this.sync = (next) => {
      this[_debugStackTrace](['Starting a pipe...'])
      var pipe = Pipe.current
      var result
      next.then((value) => {
        pipe.run(value)
        this[_debugStackTrace](['Running pipe.. Value: ' + result])
      }).catch((err) => {
        this[_debugStackTrace](['Throwing error', err])
        throw new RangeError('SYNCJOB_ERROR', err.stack)
      })
      this[_debugStackTrace](['Yielding a value from runner..'])
      result = Pipe.yield()
      this[_debugStackTrace](['Returning value ', result])
      return result
    }

    /**
     * If method `.sync()` failed, use `.streamSync()`.
     * This method is specifically used for function that needs to handle error.
     * They utilize `function(err, value)` instead of `.then()`.
     * If error is called from callback, it will automatically thrown as `RangeError`
     * @param {Function} next A Function/Task that needs to be executed in order to get the Promised value
     * @method streamSync
     * @returns {*}
     */
    this.streamSync = (next, ...args) => {
      this[_debugStackTrace](['Starting a pipe...'])
      var pipe = Pipe.current
      var result
      next(...args, function (err, value) {
        if (err) throw new RangeError('SYNCJOB_ERROR', err.stack)
        this[_debugStackTrace](['Throwing error', err])
        pipe.run(value)
        this[_debugStackTrace](['Running pipe.. Value: ' + result])
      })
      this[_debugStackTrace](['Yielding a value from runner..'])
      result = Pipe.yield()
      this[_debugStackTrace](['Returning value ', result])
      return result
    }

    /**
     * Specialized method to runs an Array of Tasks.
     * Returns Array of results.
     * Only for `.then()`-able function.
     * @method flow
     * @param {Array<Function>}
     * @returns {Array}
     */
    this.flow = (fnarray) => {
      if (!check(fnarray, 'array')) throw new TypeError('EMITTED', 'passed argument is not Array!')
      this[_debugStackTrace](['Array received! Starting a pipe...', `Array length is ${fnarray.length}`])
      var pipe = Pipe.current
      var result
      fnarray.forEach((element, index) => {
        element.then(callback => {
          pipe.run(callback)
          this.emit('debug', `${this.debugHeader}Running pipe.. Value: ${callback} from ${element} with index ${index}`)
        }).catch(err => {
          if (err) {
            this.emit('debug', `${this.debugHeader}Throwing error ${err.stack}`)
            throw new RangeError('SYNCJOB_ERROR', err.stack)
          }
        })
      })
      result = Pipe.yield()
      this[_debugStackTrace](['Returning value as array', result])
      return result
    }

    // End of Internal methods
  }

  // External Private methods.

  /**
   * To run an Array of debugging stack trace.
   * @private
   * @method _debugStackTrace
   * @param {Array<String>} array The string that will be sent to the Debugger `.on()` event.
   */
  [_debugStackTrace] (array) {
    if (_.isArray(array)) {
      array.forEach(element => {
        const debugtrace = this.debugHeader + element
        return this.emit('debug', debugtrace)
      })
    } else {
      throw new TypeError('EMITTED', 'passed argument is not Array!')
    }
  }

  // End of External Private methods.
}

// Exports the module
module.exports = Strandpipe
