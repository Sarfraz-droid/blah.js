import { Blah } from "../blah";

/**
 * FileParser
 * @description Parses the .blah files to build the dom and run scripts
 */
export class FileParser {



    static async parseFile(path: string) {

        // console.log(process.cwd());
        const template = await fetch(path);
        console.log(template);
        const templateText = await template.text();
        console.log(templateText);

        const templateElement = new DOMParser().parseFromString(templateText, 'text/html');

        const script = templateElement.querySelector('script');


        return {
            template: templateElement.querySelector('template'),
            script: script?.innerHTML
        }
    }

    static async scriptRunner(script: string, blah: Blah) {
        const _script = new Function("blah", script);

        console.log("Running Script", _script);
        blah.script = _script(blah);

        // console.log("Running Script", blah)

    }
}