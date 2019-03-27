'use strict'

// Thanks to Discord.js for providing the code

const SCode = Symbol('code')
const messages = new Map()

function websocketThrow (Base) {
  return class websocketError extends Base {
    constructor (key, ...args) {
      super(message(key, args))
      this[SCode] = key
      if (Error.captureStackTrace) Error.captureStackTrace(this, websocketError)
    }

    get name () {
      return `${super.name} [${this[SCode]}]`
    }

    get code () {
      return this[SCode]
    }
  }
}

function message (key, args) {
  if (typeof key !== 'string') throw new Error('Error message key must be supplied by a string')
  const msg = messages.get(key)
  if (!msg) throw new Error(`An invalid error message key was used: ${key}.`)
  if (typeof msg === 'function') return msg(...args)
  if (args === undefined || args.length === 0) return msg
  args.unshift(msg)
  return String(...args)
}

function register (sym, val) {
  messages.set(sym, typeof val === 'function' ? val : String(val))
}

module.exports = {
  register,
  Error: websocketThrow(Error),
  TypeError: websocketThrow(TypeError),
  RangeError: websocketThrow(RangeError)
}
