<!-- markdownlint-disable-->
# Synchronous-ify
A minimum package to run asynchronous job synchronously

<p align="center">
  <a href="https://standardjs.com"><img src="https://badgen.net/badge/code%20style/standard/cyan" alt="Standard - JavaScript Style Guide"></a>
  <a href="https://travis-ci.com"><img src="https://travis-ci.com/discordbotsNation/synchronous-ify.svg?branch=master"></a>
  <a href="https://github.com/discordbotsNation/synchronous-ify/blob/master/LICENSE"><img src="https://badgen.net/github/license/discordbotsNation/synchronous-ify"></a>
  <a href="https://nodejs.org"><img src="https://badgen.net/badge/platform/nodejs?list=1"></a>
  <a href="https://github.com/discordbotsNation/synchronous-ify/"><img src="https://badgen.net/github/status/discordbotsNation/synchronous-ify"></a>
  <a href="https://www.patreon.com/lolization"><img src="https://badgen.net/badge/become/a%20patron/F96854"></a>
  <a href="https://discordapp.com/invite/pFQXau5"><img src="https://discordapp.com/api/guilds/440394363894235136/embed.png" alt="Join Discord server"/></a>
</p> 

## About
Synchronous-ify is a lightweight simple package consist of function wrappers and resolver for Async/Await and Promises. It is built above the blazingly fast Coroutines Thread module, [node-fibers](https://github.com/laverdet/node-fibers), to provide exposed API and make synchronous code runs with ease inside an asynchronous environment.

This Module is a SNAPSHOT, hence bugs are expected. Contribute to us via Pull Request.

## Installation
```sh
npm install --save github:jDevxyz/synchronous-ify
```

## Compatibility
Synchronous-ify relies a lot on node-fibers, hence the compatibility depends on whether node-fibers supports it or not. Check their [list of supported platforms](https://github.com/laverdet/node-fibers#supported-platforms) for more info.

## Examples
### Simple
This covers how to start a Pipestream session
```js
const { Pipe, Strandpipe } = require('synchronous-ify')
const stream = new Strandpipe()
Pipe(function() {
  do this
}).run()
...
```

### HTTP Request
You can quickly resolve a result from HTTP GET request.
```js
...
const fetch = require('node-fetch')
Pipe(function() { 
    const result = stream.sync(stream.sync(fetch('https://httpbin.org/get').json())) // Obtains the JSON result
    console.log(result)
}).run()
...
```

### Database
Or simply use it to obtains data from database
```js
...
const mysql = require('mysql')
const connection = mysql.createConnection(...blablabla)
Pipe(function() {
  // If any error happened, it will be thrown automatically
  const query = stream.sync(connection.query(`SELECT * FROM levels WHERE userId = '${user.uuid}'`))
  console.log(query)
}).run()
...
```

### Runner (Alpha)
You can also use runner to quickly jump-and-use Synchronous-ify API.
The runner will returns an instance of `Strandpipe` as callback. This way, you don't have to construct the stream by yourself.
```js
const { Threadify } = require('synchronous-ify')
Threadify.runner((stream) => {
  const fetch = require('node-fetch')
  const result = stream.sync(stream.sync(fetch('https://httpbin.org/get').json()))
  console.log(result)
})
...
```

### Listener (Alpha)
Need the value outside of Runner? No worries. Listener will handle that.
```js
const { PipeListener, Threadify } = require('synchronous-ify')
const listener = new PipeListener()
Threadify.runner((stream) => {
  const fetch = require('node-fetch')
  const result = stream.sync(stream.sync(fetch('https://httpbin.org/get').json()))
  listener.listen(result)
})
listener.on('resolve:result', (res) => {
  console.log(res) // you can access the result of node-fetch in here
})
...
```

WARNING! This example is written without consederation and lack of sleep. Mistakes may exist, and wrong use of library function are possible. [Documentation](./docs/README.md) is generated by jsdoc-to-markdown.

## Why Synchronous-ify?
There's a lots of module wrapper for node-fibers, but why Synchronous-ify?
Synchronous-ify is actively developed by a lots of people on the Community. Unlike others who dominantly developed in the ancient days of old NodeJS, Synchronous-ify is using latest compatibility of NodeJS 10. Furthermore, this module supports TypeScript as well.

## Synchronous-ify in action
Here some modules that use Synchronous-ify as their dependency.
- [node-fiberfetch](https://github.com/discordbotsNation/node-fiberfetch) - [node-fetch](https://github.com/bitinn/node-fetch) wrapper, using Synchronous-ify style.
- [Discord-Template](https://github.com/skymunn/Discord-Template/) - A TypeScript-Discord.JS bootstrapper project.

## License
synchronous-ify is licensed under the [GNU AGPL-3.0](./LICENSE) © [J-Dev](https://j-dev.xyz)

## Contribution
<p align="center">
  <a href="https://github.com/standard/standard"><img src="https://cdn.rawgit.com/standard/standard/master/badge.svg" alt="Standard - JavaScript Style Guide"></a>
</p>
Contribution is much appreciated. Do a pull request once you're done with your changes. Don't forget to put specifically which part you commited, and why. Open issue when you find something wrong with our package.
