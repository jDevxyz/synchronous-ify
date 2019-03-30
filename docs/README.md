## Modules

<dl>
<dt><a href="#module_Strandpipe">Strandpipe</a> ⇐ <code>EventEmitter</code></dt>
<dd><p>The source of everything, control the flow of Async/Await and Promises function.</p>
</dd>
<dt><a href="#module_Threadify">Threadify</a></dt>
<dd><p>Consist a bunch of stacked function to utilize Synchronous-ify API</p>
</dd>
</dl>

## Functions

<dl>
<dt><a href="#Pipe">Pipe()</a></dt>
<dd><p>The base of Strandpipe, consist of method for running and yielding synchronous jobs.
Instance of Fibers/Coroutines.</p>
</dd>
<dt><a href="#Future">Future()</a></dt>
<dd><p>The base of Future methods and stuff</p>
</dd>
</dl>

## Typedefs

<dl>
<dt><a href="#ErrorType">ErrorType</a></dt>
<dd></dd>
</dl>

<a name="module_Strandpipe"></a>

## Strandpipe ⇐ <code>EventEmitter</code>
The source of everything, control the flow of Async/Await and Promises function.

**Extends**: <code>EventEmitter</code>  
**Author**: Riichi_Rusdiana#6815  

* [Strandpipe](#module_Strandpipe) ⇐ <code>EventEmitter</code>
    * [~Strandpipe](#module_Strandpipe..Strandpipe)
        * [new Strandpipe()](#new_module_Strandpipe..Strandpipe_new)
        * [.debugHeader](#module_Strandpipe..Strandpipe+debugHeader)
    * [~getPipeStream()](#module_Strandpipe..getPipeStream) ⇒ [<code>Pipe</code>](#Pipe)
    * [~listen()](#module_Strandpipe..listen) ⇒ <code>EventEmitter</code>
    * [~sync(next)](#module_Strandpipe..sync) ⇒ <code>\*</code>
    * [~streamSync(next)](#module_Strandpipe..streamSync) ⇒ <code>\*</code>
    * [~flow()](#module_Strandpipe..flow) ⇒ <code>Array</code>
    * [~DesiredValue](#module_Strandpipe..DesiredValue)

<a name="module_Strandpipe..Strandpipe"></a>

### Strandpipe~Strandpipe
**Kind**: inner class of [<code>Strandpipe</code>](#module_Strandpipe)  

* [~Strandpipe](#module_Strandpipe..Strandpipe)
    * [new Strandpipe()](#new_module_Strandpipe..Strandpipe_new)
    * [.debugHeader](#module_Strandpipe..Strandpipe+debugHeader)

<a name="new_module_Strandpipe..Strandpipe_new"></a>

#### new Strandpipe()
Start a Strandpipe classConsist of function that will be used a lots in the Pipestream

<a name="module_Strandpipe..Strandpipe+debugHeader"></a>

#### strandpipe.debugHeader
Header for debugging

**Kind**: instance property of [<code>Strandpipe</code>](#module_Strandpipe..Strandpipe)  
<a name="module_Strandpipe..getPipeStream"></a>

### Strandpipe~getPipeStream() ⇒ [<code>Pipe</code>](#Pipe)
Get current running Pipestream.Will throw an error if no Pipestream is running.

**Kind**: inner method of [<code>Strandpipe</code>](#module_Strandpipe)  
<a name="module_Strandpipe..listen"></a>

### Strandpipe~listen() ⇒ <code>EventEmitter</code>
Add a listener.

**Kind**: inner method of [<code>Strandpipe</code>](#module_Strandpipe)  
**Returns**: <code>EventEmitter</code> - Listen to an event.  
<a name="module_Strandpipe..sync"></a>

### Strandpipe~sync(next) ⇒ <code>\*</code>
Run a Task to circulate Asynchronous value into Synchronous value.Need a running Pipestream, and needs to be placed inside a `Pipe`. Only for `.then()`-able function.Use `streamSync()` for another type of callback.

**Kind**: inner method of [<code>Strandpipe</code>](#module_Strandpipe)  
**Returns**: <code>\*</code> - The result of running task  

| Param | Type | Description |
| --- | --- | --- |
| next | <code>function</code> | A Function/Task that needs to be executed in order to get the Promised value |

<a name="module_Strandpipe..streamSync"></a>

### Strandpipe~streamSync(next) ⇒ <code>\*</code>
If method `.sync()` failed, use `.streamSync()`.This method is specifically used for function that needs to handle error.They utilize `function(err, value)` instead of `.then()`.If error is called from callback, it will automatically thrown as `RangeError`

**Kind**: inner method of [<code>Strandpipe</code>](#module_Strandpipe)  

| Param | Type | Description |
| --- | --- | --- |
| next | <code>function</code> | A Function/Task that needs to be executed in order to get the Promised value |

<a name="module_Strandpipe..flow"></a>

### Strandpipe~flow() ⇒ <code>Array</code>
Specialized method to runs an Array of Tasks.Returns Array of results.Only for `.then()`-able function.

**Kind**: inner method of [<code>Strandpipe</code>](#module_Strandpipe)  

| Type |
| --- |
| <code>Array.&lt;function()&gt;</code> | 

<a name="module_Strandpipe..DesiredValue"></a>

### Strandpipe~DesiredValue
**Kind**: inner typedef of [<code>Strandpipe</code>](#module_Strandpipe)  
<a name="module_Threadify"></a>

## Threadify
Consist a bunch of stacked function to utilize Synchronous-ify API

**Author**: Riichi_Rusdiana#6815  

* [Threadify](#module_Threadify)
    * _static_
        * [.runner(next)](#module_Threadify.runner) ⇒ <code>void</code>
        * [.addListener(stream, next)](#module_Threadify.addListener) ⇒ <code>void</code>
    * _inner_
        * [~sleep(ms)](#module_Threadify..sleep) ⇒ <code>void</code>
        * [~PipedFunction](#module_Threadify..PipedFunction) : <code>function</code>

<a name="module_Threadify.runner"></a>

### Threadify.runner(next) ⇒ <code>void</code>
Start a runner.

**Kind**: static method of [<code>Threadify</code>](#module_Threadify)  

| Param | Type | Description |
| --- | --- | --- |
| next | <code>PipedFunction</code> | The code that will be executed inside a runner. |

<a name="module_Threadify.addListener"></a>

### Threadify.addListener(stream, next) ⇒ <code>void</code>
Create a listener session for a runner.

**Kind**: static method of [<code>Threadify</code>](#module_Threadify)  

| Param | Type | Description |
| --- | --- | --- |
| stream | <code>Strandpipe</code> | You need to construct `Strandpipe` outside the Listener. |
| next | <code>function</code> | The code that will be executed inside a runner. |

<a name="module_Threadify..sleep"></a>

### Threadify~sleep(ms) ⇒ <code>void</code>
Sleep for amount of time, before executing another process

**Kind**: inner method of [<code>Threadify</code>](#module_Threadify)  

| Param | Type | Description |
| --- | --- | --- |
| ms | <code>long</code> | Sleep time in Millis |

<a name="module_Threadify..PipedFunction"></a>

### Threadify~PipedFunction : <code>function</code>
**Kind**: inner typedef of [<code>Threadify</code>](#module_Threadify)  

| Param | Type | Description |
| --- | --- | --- |
| stream | <code>Strandpipe</code> | Contains an instance of Strandpipe. The object `Pipe` is available via `stream.pipe`, and current pipe via `stream.current`. |

<a name="Pipe"></a>

## Pipe()
The base of Strandpipe, consist of method for running and yielding synchronous jobs.Instance of Fibers/Coroutines.

**Kind**: global function  
<a name="Future"></a>

## Future()
The base of Future methods and stuff

**Kind**: global function  
<a name="ErrorType"></a>

## ErrorType
**Kind**: global typedef  
