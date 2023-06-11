import { ICustomElement } from "../../../@types/CustomElements.types";
import { Blah } from "../../blah";
import { ErrorTypes, ValidationError } from "../../error/error";
import { AppDOM } from "../AppDOM";

export class BLAH_IF {
    public static async If(blah: Blah, dom: HTMLElement) {
        try {
            console.log("Custom Element - IF", dom)

            const blahID = dom.getAttribute('blah-id') ?? '';
            console.log("CUSTOM_ELEMENT_IF", blahID)
            let _element: ICustomElement | undefined;
            console.log("CUSTOM_ELEMENT_IF", blah.memory.customElements)
            if (blah.memory.customElements.has(blahID))
                _element = blah.memory.customElements.get(blahID);
            else {
                _element = {
                    root: dom,
                    true: dom.getElementsByTagName('blah.true')[0].cloneNode(true) as Element,
                    false: dom.getElementsByTagName('blah.false')[0].cloneNode(true) as Element
                }
                blah.memory.customElements.set(blahID, _element);
            }

            if (_element == undefined) {
                ValidationError.throwError(ErrorTypes.NO_ELEMENT)
                return;
            }

            console.log("CUSTOM_ELEMENT_IF", _element)

            const _case = dom.getAttribute("case")?.trim() ?? '';

            let data = blah.memory.getSignalData();

            const ans = eval(_case)(data) as boolean;
            dom.innerHTML = '';
            if (ans && _element.true) {
                dom.appendChild(_element.true);

            } else if (!ans && _element.false)
                dom.appendChild(_element.false);
            console.log("CUSTOM ELEMENT - IF", ans)
            AppDOM.createDOM(blah, dom);
        } catch (err) {
            console.log("CUSTOM ELEMENT", err)
        }
    }

}