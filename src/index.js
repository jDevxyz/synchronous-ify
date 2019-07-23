/*
 *   Copyright (c) 2019 Billy Addlers (Riichi Rusdiana)<finnsonalca123@gmail.com>
 *   All rights reserved.
 */

module.exports = {
  Strandpipe: require('./cluster/Strandpipe'),
  Pipe: require('fibers'),
  Future: require('fibers/future'),
  Threadify: require('./cluster/Threadify'),
  PipeListener: require('./cluster/PipeListener')
}
