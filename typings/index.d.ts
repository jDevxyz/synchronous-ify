import { Pipe } from 'stream';
import { Fiber } from 'fibers';

declare module 'synchronous-ify' {
  import { EventEmitter } from 'events'
  import Fiber from 'fibers'
  // import Future from 'fibers/future' || Unefinitely

  //==============================================
  // BEGIN  MODULES
  //==============================================

  /**
   * Consist a bunch of stacked function to utilize Synchronous-ify API
   * @author Riichi_Rusdiana#6815
   */
  export var Threadify: IThreadify;

  /**
   * The source of everything, control the flow of Async/Await and Promises function.
   */
  export class Strandpipe extends EventEmitter {

    /**
     * Start a Strandpipe class Consist of function that will be used a lots in the Pipestream
     */
    constructor()

    /**
     * 
     */
    static version: String

    /**
     * Get current running Pipestream. Will throw an error if no Pipestream is running.
     */
    public getPipeStream: any

    /**
     * Add a listener.
     * @returns Listen to an event.
     */

    public listen(): EventEmitter
    /**
     * Run a Task to circulate Asynchronous value into Synchronous value. Need a running Pipestream,
     * and needs to be placed inside a `Pipe`. Only for `.then()`-able function.
     * Use `streamSync()` for another type of callback.
     * @param next A Function/Task that needs to be executed in order to get the Promised value
     */

    public sync(next: Function): any

    /**
     * If method `.sync()` failed, use `.streamSync()`.
     * This method is specifically used for function that needs to handle error.
     * They utilize `function(err, value)` instead of `.then()`.
     * If error is called from callback, it will automatically thrown as `RangeError`.
     * @param next A Function/Task that needs to be executed in order to get the Promised value
     */
    public streamSync(next: Function): any

    /**
     * Specialized method to runs an Array of Tasks.
     * Returns Array of results. Only for `.then()`-able function.
     */
    public flow(fnarray: Array<Function>): Array<any>

    private _debugStackTrace(array: Array<String>): void
    private _check(data: any, desired: String): Boolean
  }

  //==============================================
  // END MODULES
  //==============================================

  //==============================================
  // BEGIN GLOBAL FUNCTION
  //==============================================

  /**
   * The base of Strandpipe, consist of method for running and yielding synchronous jobs.
   * Instance of Fibers/Coroutines.
   */
  export var Pipe: Fiber;

  //==============================================
  // END GLOBAL FUNCTION
  //==============================================

  //==============================================
  // BEGIN DEFENITION
  //==============================================

  /**
  * Consist a bunch of stacked function to utilize Synchronous-ify API
  * @author Riichi_Rusdiana#6815
  */
  interface IThreadify {

    /**
     * Start a runner.
     * @param next - The code that will be executed inside a runner.
     */
    runner(next: PipedFunction): void

    /**
     * 
     * @param stream - You need to construct `Strandpipe` outside the Listener.
     * @param next - The code that will be executed inside a runner.
     */
    addListener(stream: Strandpipe, next: PipedFunction): void

    /**
     * Sleep for amount of time, before executing another process
     * @param ms - Sleep time in Millis.
     */
    sleep(ms: number): void
  }

  /**
   * Contains an instance of Strandpipe. The object Pipe is available via `stream.pipe`,
   * and current pipe via `stream.current`.
   */
  type PipedFunction = (stream: Strandpipe) => void

  //==============================================
  // END DEFENITION
  //==============================================
}
