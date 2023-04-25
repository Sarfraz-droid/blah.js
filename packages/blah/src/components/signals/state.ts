import { Blah } from "../blah";

export class State<T> {

    constructor(
        public value: T,
        private root: Blah,
        private uid: string
    ) {
        this.root.memory.setSignal(this.uid, this);
        this.value = value;
    }

    get data(): T {
        return this.value;
    }

    set data(value: T) {
        this.setValue(value);
        console.log('====================================');
        console.log(this.id, this.value, "Updated");
        console.log('====================================');
    }

    get id(): string {
        return this.uid;
    }

    private setValue(value: T): void {
        this.value = value;
        this.root.memory.setSignal(this.uid, this);
        this.root.updatedVariables.add(this.uid);
    }
}