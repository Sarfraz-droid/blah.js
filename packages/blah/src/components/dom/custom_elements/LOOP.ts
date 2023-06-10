import { ICustomElement } from "../../../@types/CustomElements.types";
import { Blah } from "../../blah";
import { ErrorTypes, ValidationError } from "../../error/error";
import { AppDOM } from "../AppDOM";

export class BLAH_LOOP {
    public static async run(blah: Blah, dom: HTMLElement) {
        try {
            console.log("CUSTOM ELEMENT - LOOP", dom)

            const blahID = dom.getAttribute('blah-id') ?? '';
            let _element: ICustomElement | undefined;

            console.log("CUSTOM_ELEMENT_IF", blah.memory.customElements)

            if (blah.memory.customElements.has(blahID))
                _element = blah.memory.customElements.get(blahID);
            else {
                _element = {
                    root: dom,
                    child: dom.getElementsByTagName('blah.child')[0].cloneNode(true) as Element
                }
                blah.memory.customElements.set(blahID, _element);
            }

            if (_element == undefined) {
                ValidationError.throwError(ErrorTypes.NO_ELEMENT)
                return;
            }

            let data = blah.memory.getSignalData();

            const _start = dom.getAttribute("start")?.trim() ?? '';
            const _end = dom.getAttribute("end")?.trim() ?? '';

            const start = eval(_start)(data)
            const end = eval(_end)(data)

            console.log('CUSTOM ELEMENT - LOOP', start, end)
            dom.innerHTML = '';
            for (let i = start; i <= end; i++) {
                if (_element.child) {
                    console.log('CUSTOM ELEMENT ADDING', i)
                    const elem = _element.child;
                    elem.setAttribute('loop-key', i);
                    dom.appendChild(elem.cloneNode(true))
                    console.log(dom)
                }
            }
            console.log("CUSTOM ELEMENT - LOOP", dom)
            AppDOM.createDOM(blah, dom);

        } catch (err) {
            console.error(err);
        }
    }
}