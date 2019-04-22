declare module 'synchronous-ify' {
  import { EventEmitter } from 'events'
  import Fiber from 'fibers'
  import Future from 'fibers/future'

  export class Strandpipe extends EventEmitter {
    constructor()

    static version: String
    public getPipeStream: any
    public sync(next: Function): any
    public streamSync(next: Function): any
    public flow(fnarray: Array<Function>): Array<any>

    private _debugStackTrace(array: Array<String>): void
    private _check(data: any, desired: String): Boolean
  }
}