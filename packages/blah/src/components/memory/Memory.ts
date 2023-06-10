import { ICustomElement } from "../../@types/CustomElements.types";
import { Blah } from "../blah";
import { ErrorTypes, ValidationError } from "../error/error";
import { Hook } from "../signals/Hook";
import { State } from "../signals/state";


/**
 * @description This class is used to store the state of the application. It is used to store the signals and the DOM elements
 */
export class Memory {

    constructor(public root: Blah) {

    }

    public signals = new Map<string, State<any> | Hook>();
    // Track the signals used in DOM Element
    public signalMaps: Map<string, Set<string>> = new Map<string, Set<string>>();

    public domMap: Map<string, HTMLElement> = new Map<string, HTMLElement>();

    public updatedVariables: Set<string> = new Set<string>; // Track the updated variables

    public customElements: Map<string, ICustomElement> = new Map<string, ICustomElement>();

    /** get Signal or Hook Value */
    public getSignal<T>(key: string): State<T> | Hook | undefined {
        return this.signals.get(key);
    }

    /** set Signal or Hook Value */
    public setSignal<T>(key: string, value: State<T> | Hook): void {
        this.signals.set(key, value);
    }


    /** Add DOM id to the signal Map. All related dom elements to the signal will be added */
    public linkSignalToDOM(signal: string, id: string): void {
        if (this.signalMaps.has(signal)) {
            const signals = this.signalMaps.get(signal);
            if (signals) {
                signals.add(id);
            }
        } else {
            const doms = new Set<string>();
            doms.add(id);
            this.signalMaps.set(signal, doms);
        }
    }

    /** get linkedDOMs of the signal */
    public linkedDOMs(signal: string): Set<string> | undefined {
        return this.signalMaps.get(signal);
    }

    public getSignalData() {
        let _data = Object.fromEntries(this.signals);
        let data: {
            [key: string]: any
        } = {};
        Object.keys(_data).forEach((value) => {
            console.log("getSignalData", value, this.getSignal(value)?.value)
            data[value] = this.getSignal(value)?.value;
        })

        return data;
    }
}
