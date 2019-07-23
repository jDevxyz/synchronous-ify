/*
 *   Copyright (c) 2019 Billy Addlers (Riichi Rusdiana)<finnsonalca123@gmail.com>
 *   All rights reserved.
 */

// Core of the libs
const _ = require('lodash')

/**
 * @typedef DesiredValue
 * - array
 * - string
 * - integer
 * - not a number
 * - regexp
 */
/**
 * To check wheter a value is a proper `DesiredValue`.
 * @private
 * @method _check
 * @param {*} data
 * @param {DesiredValue} desired
 */
const check = (data, desired) => {
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

module.exports = check
