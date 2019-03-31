const { EventEmitter } = require('events')

/**
 * Create a listener for Runner
 * @module PipeListener
 * @extends {EventEmitter}
 * @author Riichi_Rusdiana#6815
 */
class PipeListener extends EventEmitter {
  /**
   * @constructor
   */
  constructor (...args) {
    super(...args)
  }
}

module.exports = PipeListener
