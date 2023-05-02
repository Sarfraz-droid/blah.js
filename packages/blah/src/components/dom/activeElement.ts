import { Blah } from "../blah";
import { AppDOM } from "./AppDOM";


enum ActiveElementTagName {
    INPUT = "INPUT",
    TEXTAREA = "TEXTAREA",
    SELECT = "SELECT",
    BUTTON = "BUTTON",
}

interface IActiveElementInfo {
    selectionStart: number
    blahId: string
}

/**
 * @description Used to handle the active Elements after refresh of the page.
 */
export class ActiveElement {
    public static getActiveElement(): HTMLElement {
        return document.activeElement as HTMLElement;
    }

    public static getActiveElementInfo(
        dom: HTMLElement
    ) {
        const selectionStart = (dom as HTMLInputElement).selectionStart;
        const blahID = AppDOM.getBlahID(dom);
        return {
            selectionStart,
            blahId: blahID
        } as IActiveElementInfo
    }

    public static handleActiveElement(
        element: HTMLElement,
        ActiveInfo: IActiveElementInfo,
        root: Blah
    ): void {


        element.focus();


        switch (element.tagName) {
            case ActiveElementTagName.TEXTAREA:
            case ActiveElementTagName.INPUT:
                ActiveElement.handleInput(element as HTMLInputElement, ActiveInfo);
                break;
            default:
                break;
        }
    }

    public static handleInput(element: HTMLInputElement, active: IActiveElementInfo): void {
        // element.select();

        console.log('====================================');
        console.log("handleInput", active.selectionStart);
        console.log('====================================');
        element.setSelectionRange(active.selectionStart + 1, active.selectionStart + 1);
    }

}