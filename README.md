<!-- markdownlint-disable-->
# Synchronous-ify
A minimum package to run asynchronous job synchronously

<p align="center">
  <a href="https://standardjs.com"><img src="https://img.shields.io/badge/code_style-standard-brightgreen.svg" alt="Standard - JavaScript Style Guide"></a>
  <a href="https://github.com/standard/standard"><img src="https://cdn.rawgit.com/standard/standard/master/badge.svg" alt="Standard - JavaScript Style Guide"></a>
</p> 

## About
Synchronous-ify is a lightweight simple package consist of function wrappers and resolver for Async/Await and Promises. It is built above the blazingly fast Coroutines Thread module, [node-fibers](https://github.com/laverdet/node-fibers), to provide exposed API and make synchronous code runs with ease inside an asynchronous environment.

This Module is a SNAPSHOT, hence bugs are expected. Contribute to us via Pull Request.

## Installation
```sh
npm install --save github:DiscordBotsDev/synchronous-ify
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
})
```

You can quickly resolve a result from HTTP GET request.
```js
const fetch = require('node-fetch')
Pipe(function() { 
    const result = stream.sync(fetch('https://javfor.me'))
    console.log(result)
})
```

Or simply use it to obtains data from database
```js
const mysql = require('mysql')
const connection = mysql.createConnection(...blablabla)
Pipe(function() {
  // If any error happened, it will be thrown automatically
  const query = stream.sync(connection.query(`SELECT * FROM levels WHERE userId = '${user.uuid}'`))
  console.log(query)
})
```

WARNING! This example is written without consederation and lack of sleep. Mistakes may exist, and wrong use of library function are possible.

## Why Synchronous-ify?
There's a lots of module wrapper for node-fibers, but why Synchronous-ify?
Synchronous-ify is actively developed by a lots of people on the Community. Unlike others who dominantly developed in the ancient days of old NodeJS, Synchronous-ify is using latest compatibility of NodeJS 10. Furthermore, this module supports TypeScript as well.

## ToDo List
- Add more method to handle more difficult task
- Improve performance towards singe-core devices

## Contribution
Synchronous-ify using GNU AFFERO General Public License, and whoever obtains the code also gain access to every corner of this module. Contribution is much appreciated. Do a pull request once you're done with your changes.
