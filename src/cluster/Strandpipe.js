const { EventEmitter } = require('events')
const _ = require('lodash')
const Pipe = require('fibers')
const packagemeta = require('../../package.json')
const { TypeError, RangeError } = require('../localization')

const _debugStackTrace = Symbol('debugStackTrace')
const _check = Symbol('check')

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

    this.syncjobdif = (object, fn) => {
      return function() {
        var args = Array.prototype.slice.call(arguments)
        var result
        var pipe
        args.push(function(error, value) {
          this[_debugStackTrace](['Pushing function inside an Array, Stack Trace: ', error, value])
          result = error || value
          if (pipe) pipe.run(result)
          else pipe = true
        })
    
        var objectified = this[object]
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
      fn.then(element => {
        pipe.run(element)
        this[_debugStackTrace](['Running pipe.. Value: ' + element])
      }).catch(err => {
        if (err) {
          this[_debugStackTrace](['Throwing error', err])
          throw new RangeError('SYNCJOB_ERROR', err.stack)
        }
      })
      const result = Pipe.yield()
      this[_debugStackTrace](['Returning value ', result])
      return result
    }

    this.flow = (fnarray) => {
      if (!this[_check](fnarray, 'array')) throw new TypeError('EMITTED', 'passed argument is not Array!')
      var pipe = Pipe.current
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
      const result = Pipe.yield()
      this[_debugStackTrace](['Returning value', result])
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

  [_check] (data, desired) {
    switch (desired) {
      case 'array':
        return _.isArray(data)
      case 'string':
        return _.isString(data)
      case 'integer':
        return _.isInteger(data)
      case 'not a number':
        return _.isNaN(data)
      case 'regexp':
        return _.isRegExp(data)
      default:
        break
    }
  }
}
