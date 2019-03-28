## Modules

<dl>
<dt><a href="#module_Strandpipe">Strandpipe</a> ⇐ <code>EventEmitter</code></dt>
<dd><p>The source of everything, control the flow of Async/Await and Promises function.</p>
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
    * [module.exports](#exp_module_Strandpipe--module.exports) ⏏
        * [new module.exports()](#new_module_Strandpipe--module.exports_new)
        * _instance_
            * [.debugHeader](#module_Strandpipe--module.exports+debugHeader)
            * [.getPipeStream()](#module_Strandpipe--module.exports+getPipeStream) ⇒ [<code>Pipe</code>](#Pipe)
            * [.sync(next)](#module_Strandpipe--module.exports+sync) ⇒ <code>\*</code>
            * [.streamSync(next)](#module_Strandpipe--module.exports+streamSync) ⇒ <code>\*</code>
            * [.flow(fnarray)](#module_Strandpipe--module.exports+flow) ⇒ <code>Array</code>
        * _inner_
            * [~DesiredValue](#module_Strandpipe--module.exports..DesiredValue)

<a name="exp_module_Strandpipe--module.exports"></a>

### module.exports ⏏
**Kind**: Exported class  
<a name="new_module_Strandpipe--module.exports_new"></a>

#### new module.exports()
Start a Strandpipe classConsist of function that will be used a lots in the Pipestream

<a name="module_Strandpipe--module.exports+debugHeader"></a>

#### module.exports.debugHeader
Header for debugging

**Kind**: instance property of [<code>module.exports</code>](#exp_module_Strandpipe--module.exports)  
<a name="module_Strandpipe--module.exports+getPipeStream"></a>

#### module.exports.getPipeStream() ⇒ [<code>Pipe</code>](#Pipe)
Get current running PipestreamWill throw an error if no Pipestream is running

**Kind**: instance method of [<code>module.exports</code>](#exp_module_Strandpipe--module.exports)  
<a name="module_Strandpipe--module.exports+sync"></a>

#### module.exports.sync(next) ⇒ <code>\*</code>
Run a Task to circulate Asynchronous value into Synchronous valueNeed a running Pipestream, and needs to be placed inside a `Pipe`

**Kind**: instance method of [<code>module.exports</code>](#exp_module_Strandpipe--module.exports)  
**Returns**: <code>\*</code> - The result of running task  

| Param | Type | Description |
| --- | --- | --- |
| next | <code>function</code> | A Function/Task that needs to be executed in order to get the Promised value |

<a name="module_Strandpipe--module.exports+streamSync"></a>

#### module.exports.streamSync(next) ⇒ <code>\*</code>
If method `.sync()` failed, use `.streamSync()`.This method is specifically used for function that needs to handle error.They utilize `function(err, value)` instead of `.then()`.If error is called from callback, it will automatically thrown as `RangeError`

**Kind**: instance method of [<code>module.exports</code>](#exp_module_Strandpipe--module.exports)  

| Param | Type | Description |
| --- | --- | --- |
| next | <code>function</code> | A Function/Task that needs to be executed in order to get the Promised value |

<a name="module_Strandpipe--module.exports+flow"></a>

#### module.exports.flow(fnarray) ⇒ <code>Array</code>
Specialized method to runs an Array of TasksReturns Array of results

**Kind**: instance method of [<code>module.exports</code>](#exp_module_Strandpipe--module.exports)  

| Param | Type |
| --- | --- |
| fnarray | <code>Array.&lt;function()&gt;</code> | 

<a name="module_Strandpipe--module.exports..DesiredValue"></a>

#### module.exports~DesiredValue
**Kind**: inner typedef of [<code>module.exports</code>](#exp_module_Strandpipe--module.exports)  
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
