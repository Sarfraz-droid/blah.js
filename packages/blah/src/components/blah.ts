import { AppDOM } from "./dom/AppDOM";
import { ErrorTypes, ValidationError } from "./error/error";
import { DOMState } from "./memory/DOMState";
import { Memory } from "./memory/Memory";
import { Signal } from "./signals/signal";

/**
 * Represents the root component in the Application
 * @class
 */
export class Blah {

    /* ----------- variables -------------- */
    public dom: DOMState = new DOMState(this);
    public memory: Memory = new Memory(this);
    public signal: Signal = new Signal(this);
    public script: Object = {};
    private id: string = '';
    /*------------------------------------- */

    constructor() {
    }

    /**----------- Getters ----------------- */
    get domMap() {
        return this.memory.domMap;
    }

    get updatedVariables() {
        return this.memory.updatedVariables;
    }
    /**------------------------------------ */


    /**
     * Create state binding for blah 
     * @param value T
     * @param name string
     */
    public createState<T>(value: T, name: string) {
        this.signal.createState(value, name);
    }

    /**
     * createHook binding from signal.createHook
     * @param func () => any
     * @param name string
     */
    public createHook(func: () => any, name: string) {
        this.signal.createHook(func, name);
    }

    /**
     * @description Initialize the compiler for the application
     * @param id string (Document id)
     */
    public async StartApp(id: string) {
        this.id = id;
        console.log('StartApp');
        this.dom.setInitialDOM(document.getElementById(id));
        AppDOM.createDOMTree(this, this.dom.getInitialDOM());
    }

    /**
     * @description For parsing .blah files. This is the entry point for the parser
     * @param id string
     */
    public async startBlah(id: string) {
        this.id = id;
        console.log('startBlah', id);
        this.dom.setInitialDOM(AppDOM.getElementByBlahID(id));

        AppDOM.createDOM(this, this.dom.getInitialDOM());
    }



    public getID(): string {
        return this.id;
    }

}

const blah = new Blah();

export default blah;