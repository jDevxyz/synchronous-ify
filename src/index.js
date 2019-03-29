module.exports = {
  Strandpipe: require('./cluster/Strandpipe'),
  Pipe: require('fibers'),
  Future: require('fibers/future'),
  Threadify: require('./cluster/Threadify')
}
