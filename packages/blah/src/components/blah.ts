import { AppDOM } from "./dom/AppDOM";
import { ErrorTypes, ValidationError } from "./error/error";
import { DOMState } from "./memory/DOMState";
import { Memory } from "./memory/Memory";
import { Signal } from "./signals/signal";

export class Blah {
    public dom: DOMState = new DOMState(this);
    public memory: Memory = new Memory(this);
    public signal: Signal = new Signal(this);
    public script: Object = {};

    private id: string = '';
    constructor() {
    }

    // ? Getters
    get domMap() {
        return this.memory.domMap;
    }

    get updatedVariables() {
        return this.memory.updatedVariables;
    }


    // ? For starting the Application
    public async StartApp(id: string) {
        this.id = id;
        console.log('StartApp');
        await AppDOM.createDOMTree(this, document.getElementById(id));
    }

    // ? For parsing .blah files
    // ? This is the entry point for the parser
    public async startBlah(id: string) {
        this.id = id;
        console.log('startBlah', id);
        this.dom.setInitialDOM(AppDOM.getElementByBlahID(id));
        console.log(this.dom.getInitialDOM());

        // for (let i = 0; i < this.dom.getInitialDOM().children.length; i++) {
        //     await AppDOM.createDOMTree(this, this.dom.getInitialDOM().children[i] as HTMLElement);
        // }

        AppDOM.createDOM(this, this.dom.getInitialDOM());
    }



    public getID(): string {
        return this.id;
    }

}

const blah = new Blah();

export default blah;