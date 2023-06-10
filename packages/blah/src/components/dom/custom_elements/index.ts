import { Blah } from "../../blah";
import { ErrorTypes, ValidationError } from "../../error/error";
import { FileParser } from "../../parser/FileParser";
import { AppDOM } from "../AppDOM";
import { BLAH_IF } from "./IF";
import { BLAH_LOOP } from "./LOOP";

/**
 * Custom Element Functions
 * @class
 */
export class CustomElement {
    public static async Template(blah: Blah, path: string, dom: Element) {

        const data = await FileParser.parseFile(path);
        const templateDiv = data.template;

        blah.dom.initializeElement(dom as HTMLElement);
        const templateDuplicate = templateDiv?.content.cloneNode(true) as Node;
        dom.insertBefore(templateDuplicate, dom.firstChild);

        const _blah = new Blah();
        await FileParser.scriptRunner(data.script as string, _blah);
        console.log("Template", _blah)
        _blah.startBlah(dom.getAttribute('blah-id') as string);
    }

    public static async If(blah: Blah, dom: HTMLElement) {
        BLAH_IF.If(blah, dom)
    }

    public static async LOOP(blah: Blah, dom: HTMLElement) {
        BLAH_LOOP.run(blah, dom);
    }
}