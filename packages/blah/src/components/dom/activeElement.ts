import { Blah } from "../blah";
import { AppDOM } from "./AppDOM";


enum ActiveElementTagName {
    INPUT = "INPUT",
    TEXTAREA = "TEXTAREA",
    SELECT = "SELECT",
    BUTTON = "BUTTON",
}

/**
 * @description Used to handle the active Elements after refresh of the page.
 */
export class ActiveElement {
    public static getActiveElement(): HTMLElement {
        return document.activeElement as HTMLElement;
    }

    public static handleActiveElement(
        id: string,
        clone: Element,
        root: Blah
    ): void {

        const element = AppDOM.getElementByBlahID(id);

        element.focus();


        switch (element.tagName) {
            case ActiveElementTagName.TEXTAREA:
            case ActiveElementTagName.INPUT:
                ActiveElement.handleInput(element as HTMLInputElement, clone as HTMLInputElement);
                break;
            default:
                break;
        }
    }

    public static handleInput(element: HTMLInputElement, clone: HTMLInputElement): void {
        // element.select();

        const caretPosition = clone.selectionStart;
        element.setSelectionRange(caretPosition, caretPosition);
        console.log('====================================');
        console.log(element.selectionStart, element.selectionEnd);
        console.log('====================================');
    }
}