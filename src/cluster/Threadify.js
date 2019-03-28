const Pipe = require('./Strandpipe').Pipe

exports.sleep = (ms) => {
  var pipe = Pipe.current
  setTimeout(function () {
    pipe.run()
  }, ms)
  Pipe.yield()
}
