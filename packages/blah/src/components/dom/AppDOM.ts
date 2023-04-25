import { ErrorTypes, ValidationError } from "../error/error";
import { ElementParserRoot } from "../parser/ElementParser";
import { Blah } from "../blah";
import { ActiveElement } from "./activeElement";
import { CustomElement } from "./CustomElement";

enum NodeType {
    TEMPLATE = 'TEMPLATE',
}

export class AppDOM {
    static async handleCustomNodes(blah: Blah, dom: Element) {
        const nodeName = dom.nodeName.replace("BLAH.", "");
        console.log("Handling Custom Nodes", nodeName);
        switch (nodeName) {
            case NodeType.TEMPLATE:
                await CustomElement.Template(blah, dom.getAttribute('path') as string, dom);

                break;
            default:
                break;
        }
    }

    // ? Building and extracting the files
    static async createDOMTree(
        blah: Blah,
        dom: Element | null
    ) {

        console.log('createDOMTree', dom);
        if (dom == null) {
            ValidationError.throwError(ErrorTypes.NO_ELEMENT);
            return;
        }
        if (dom.nodeType != Node.ELEMENT_NODE) {
            return;
        }
        if (dom.nodeName.startsWith("BLAH")) {
            await AppDOM.handleCustomNodes(blah, dom);
            return;
        }

        for (let i = 0; i < dom.childNodes.length; i++) {
            const node = dom.childNodes[i];
            await AppDOM.createDOMTree(blah, node as Element);

        }
    }

    // ? Parsing the elements
    static createDOM(
        blah: Blah,
        dom: Element | null
    ) {
        console.log('createDOM', dom);
        if (dom == null) {
            ValidationError.throwError(ErrorTypes.NO_ELEMENT);
            return;
        }

        blah.dom.initializeElement(dom as HTMLElement);
        const nodes = dom.childNodes;

        nodes.forEach((node) => {
            AppDOM.handleNode(blah, node as Element);
        })

    }

    private static handleNode(
        blah: Blah,
        node: Element
    ) {
        if (node.nodeType == Node.ELEMENT_NODE) {
            AppDOM.createDOM(blah, node as HTMLElement);
            ElementParserRoot.parse(node as Element, blah);
        }
    }


    static handleNodeUpdate(
        blah: Blah,
        node: Node,
    ) {
        AppDOM.createDOM(blah, node as HTMLElement);
        ElementParserRoot.parse(node as Element, blah);
    }


    static updateDOM(
        blah: Blah,
    ) {
        console.log('updateDOM', blah.updatedVariables);
        let doms: Set<string> = new Set<string>();
        let active = ActiveElement.getActiveElement();

        console.log((active as HTMLInputElement).selectionStart);


        blah.updatedVariables.forEach((variable) => {
            const domsSet = blah.memory.linkedDOMs(variable);
            if (domsSet)
                domsSet.forEach((dom) => {
                    doms.add(dom);
                })

        })

        doms.forEach((dom) => {
            const element = blah.domMap.get(dom)?.cloneNode(true);
            console.log(element);
            if (element) {
                AppDOM.handleNodeUpdate(blah, element);
                document.querySelector(`[blah-id="${dom}"]`)?.replaceWith(element);
            }
        })

        ActiveElement.handleActiveElement(AppDOM.getBlahID(active), active, blah);

        blah.updatedVariables.clear();

    }

    public static getBlahID(element: HTMLElement): string {
        const blahID = element.getAttribute('blah-id');
        if (blahID == null) {
            ValidationError.throwError(ErrorTypes.NO_ID);
            return '';
        }
        return blahID;
    }

    public static getElementByBlahID(blahID: string): HTMLElement {
        const element = document.querySelector(`[blah-id="${blahID}"]`);
        if (element == null) {
            ValidationError.throwError(ErrorTypes.NO_ID);
        }
        return element as HTMLElement;
    }
}


