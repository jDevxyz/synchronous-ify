const Strandpipe = require('./Strandpipe')
const Pipe = require('fibers')
const Future = require('fibers/future')
/**
 * Consist a bunch of stacked function to utilize Synchronous-ify API
 * @module Threadify
 * @author Riichi_Rusdiana#6815
 */
var modules = module.exports = {
  /**
   * Start a runner.
   * @method
   * @param {PipedFunction} next The code that will be executed inside a runner.
   * @return {void}
   */
  runner: (next) => {
    const stream = new Strandpipe()
    return Pipe(() => {
      stream.current = Pipe.current
      stream.pipe = Pipe
      next(stream)
    }).run()
  },
  /**
   * @callback PipedFunction
   * @param {Strandpipe} stream Contains an instance of Strandpipe. The object `Pipe` is available via `stream.pipe`, and current pipe via `stream.current`.
   */

  /**
   * Sleep for amount of time, before executing another process
   * @method sleep
   * @param {long} ms Sleep time in Millis
   * @returns {void}
   */
  sleep: (ms) => {
    var pipe = Pipe.current
    setTimeout(function () {
      pipe.run()
    }, ms)
    return Pipe.yield()
  }
}

Object.keys(module.exports).forEach(elements => { exports[elements] = module.exports[elements] })
