import { Blah } from "../blah";
import { FileParser } from "../parser/FileParser";

export class CustomElement {
    public static async Template(blah: Blah, path: string, dom: Element) {
        console.log("Template Hot Reloaded", path);

        const data = await FileParser.parseFile(path);
        const templateDiv = data.template;

        console.log('====================================');
        console.log(data.template, data.script);
        console.log('====================================');

        blah.dom.initializeElement(dom as HTMLElement);
        const templateDuplicate = templateDiv?.content.cloneNode(true) as Node;
        dom.insertBefore(templateDuplicate, dom.firstChild);

        const _blah = new Blah();
        await FileParser.scriptRunner(data.script as string, _blah);
        console.log("Template", _blah)
        _blah.startBlah(dom.getAttribute('blah-id') as string);
    }
}