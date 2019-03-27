const { EventEmitter } = require('events')
const _ = require('lodash')
const Pipe = require('fibers')
const packagemeta = require('../../package.json')
const { TypeError, RangeError } = require('../localization')

const _debugStackTrace = Symbol('debugStackTrace')

/**
 * @method Pipe
 * The base of Strandpipe, consist of method for running and yielding synchronous jobs.
 * Instance of Fibers.
 */
exports.Pipe = Pipe
/**
 * @module Strandpipe
 * @extends {EventEmitter}
 * The source of everything, control the flow of Async/Await and Promises function.
 */
module.exports = class Strandpipe extends EventEmitter {
  constructor() {
    super()

    this.version = packagemeta.version
    this.debugHeader = `[Pipeline] [Debug] `

    this.syncjob = (object, fn) => {
      return function() {
        let args = Array.prototype.slice.call(arguments)
        let result
        let pipe
        args.push(function(error, value) {
          this[_debugStackTrace](['Pushing function inside an Array, Stack Trace: ', error, value])
          result = error || value
          if (pipe) pipe.run(result)
          else pipe = true
        })
    
        let objectified = this[object]
        objectified[fn].apply(objectified, args)
        if (!pipe) {
          pipe = Pipe.current
          Pipe.yield()
          this[_debugStackTrace](['Yielding function inside a Pipe'])
        }
    
        if (result instanceof Error) {
          throw new RangeError('SYNCJOB_ERROR', result.stack)
        }
        this[_debugStackTrace](['Returning value ', result])
        return result
      }
    }

    this.sync = (fn) => {
      var pipe = Pipe.current
      fn().then(element => {
        pipe.run(element)
      }).catch(err => {
        if (err) {
          pipe.throwInto(err)
        }
      })
      const result = Pipe.yield()
      return result
    }
  }

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
}
