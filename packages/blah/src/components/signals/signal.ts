import { Blah } from "../blah";
import { Hook } from "./Hook";
import { State } from "./state";

export class Signal {
    constructor(public root: Blah) {
    }

    public createState<T>(value: T, variableName: string): State<T> {
        const state = new State<T>(value, this.root, variableName);
        return state;
    }

    public createHook(func: () => any, variableName: string): Hook {
        const state = new Hook(func, this.root, variableName);
        return state;
    }
}
