import { Blah } from "../blah";

export class CreateFunction {

    constructor(
        public value: Function,
        private root: Blah,
        private uid: string
    ) {
        this.root.memory.setSignal(this.uid, this);
        this.value = value;
    }

    get data(): () => any {
        return this.value();
    }

    public runFunction([
        ...args
    ]): void {
        this.value(
            ...args
        );
    }

    set data(value: () => any) {
        this.setValue(value);
        this.root.memory.setSignal(this.uid, this);
        console.log('====================================');
        console.log(this.id, this.value, "Updated");
        console.log('====================================');
    }

    get id(): string {
        return this.uid;
    }

    private setValue(value: () => any): void {
        this.value = value;
        this.root.updatedVariables.add(this.uid);
    }
}