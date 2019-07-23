/*
 *   Copyright (c) 2019 Billy Addlers (Riichi Rusdiana)<finnsonalca123@gmail.com>
 *   All rights reserved.
 */

const { EventEmitter } = require('events')

/**
 * Create a listener for Runner
 * @module PipeListener
 * @extends {EventEmitter}
 * @author Riichi_Rusdiana#6815
 */
class PipeListener extends EventEmitter {
  /**
   * Add a Pipe Listener to listen inside a runner, and send the variable
   * out of the runner.
   * @constructor
   */
  constructor (...args) {
    super(...args)

    /**
     * Add a listener.
     * @method listen
     * @returns {EventEmitter} Listen to an event.
     */
    this.listen = (name, resolved) => {
      return this.emit(`resolve:${name}`, resolved)
    }
  }
}

module.exports = PipeListener
