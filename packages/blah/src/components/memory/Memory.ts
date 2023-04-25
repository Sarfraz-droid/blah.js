import { Blah } from "../blah";
import { ErrorTypes, ValidationError } from "../error/error";
import { CreateFunction } from "../signals/CreateFunction";
import { State } from "../signals/state";


// ? This class is used to store the state of the application
// ? It is used to store the signals and the DOM elements
export class Memory {

    constructor(public root: Blah) {

    }

    private signals = new Map<string, State<any> | CreateFunction>();
    // Track the signals used in DOM Element
    public signalMaps: Map<string, Set<string>> = new Map<string, Set<string>>();

    public domMap: Map<string, HTMLElement> = new Map<string, HTMLElement>();

    public updatedVariables: Set<string> = new Set<string>; // Track the updated variables

    public getSignal<T>(key: string): State<T> | CreateFunction | undefined {
        return this.signals.get(key);
    }

    public setSignal<T>(key: string, value: State<T> | CreateFunction): void {
        this.signals.set(key, value);
    }

    public linkSignalToDOM(signal: string, id: string): void {
        console.log('=========Linking Signal to DOM==============');
        console.log(signal, id);
        console.log('====================================');
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

        console.log(this.signalMaps);
    }

    public linkedDOMs(signal: string): Set<string> | undefined {
        return this.signalMaps.get(signal);
    }
}
