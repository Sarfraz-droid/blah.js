import { ErrorTypes, ValidationError } from "../error/error";
import { Blah } from "../blah";

export class DOMState {
    /** variables */
    private initialDOM: HTMLElement = document.createElement('div');
    private currentDOM: HTMLElement = document.createElement('div');


    constructor(public blah: Blah) {
    }

    /** getters */
    get getActiveDOM(): Element | null {
        return document.activeElement;
    }


    /**
     * @description Adds parser specific "blah-id" to the element component.
     * @param element HTMLElement
     * @returns 
     */
    public initializeElement(element: HTMLElement): void {
        if (element.getAttribute('blah-id') != null) {
            return;
        }
        const uid = window.crypto.getRandomValues(new Uint32Array(1))[0].toString();
        element.setAttribute('blah-id', uid);
        this.blah.domMap.set(uid, element.cloneNode(true) as HTMLElement);
    }

    public getInitialDOM(): HTMLElement {
        return this.initialDOM;
    }

    public setInitialDOM(element: HTMLElement | null): void {
        if (element == null) {
            ValidationError.throwError(ErrorTypes.NO_ELEMENT);
            return;
        }
        this.initialDOM = element;
    }
}