'use strict'

const { register } = require('./Error.js')

const Messages = {
  INVALID_OPTION: (property, must) => `The ${property} option value must be ${must}`,

  FILE_NOT_FOUND: file => `File could not be found: ${file}`,
  MODULE_NOT_FOUND: module => `Module ${module} is not installed`,
  SCRIPT_ERROR: (locate, error) => `Script Error on ${locate}, error stack: ${error}`,
  FATAL_ERROR: error => `FATAL ERROR! : ${error}`,

  SYNCJOB_ERROR: error => `There's an error on your Synchronous Job: ${error}`,
  EMITTED: message => `Strandpipe Error!, ${message}`
}

for (const [name, message] of Object.entries(Messages)) register(name, message)
