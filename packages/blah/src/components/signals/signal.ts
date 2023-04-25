import { Blah } from "../blah";
import { CreateFunction } from "./CreateFunction";
import { State } from "./state";

export class Signal {
    constructor(public root: Blah) {
    }

    public createState<T>(value: T, variableName: string): State<T> {
        const state = new State<T>(value, this.root, variableName);
        return state;
    }

    public createHook(func: () => any, variableName: string): CreateFunction {
        const state = new CreateFunction(func, this.root, variableName);
        return state;
    }
}
