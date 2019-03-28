declare module 'synchronous-ify' {
  import { EventEmitter } from 'events'
  export class Strandpipe extends EventEmitter {
    constructor()

    static version: String
    public getPipeStream: any
    public sync(next: Function): any
    public streamSync(next: Function): any
    public flow(fnarray: Array<Function>): Array<any>

    private _debugStackTrace(array: Array<String>): void
    /**
     * @typedef DesiredValue
     * - array
     * - string
     * - integer
     * - not a number
     * - regexp
     */
    /**
     * To check wheter a value is a proper `DesiredValue`
     * @private
     * @method
     * @param {*} data
     * @param {DesiredValue} desired
     */
    private _check(data: any, desired: String): Boolean
  }
}