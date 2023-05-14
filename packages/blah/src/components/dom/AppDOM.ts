import { ErrorTypes, ValidationError } from "../error/error";
import { ElementParserRoot } from "../parser/ElementParser";
import { Blah } from "../blah";
import { ActiveElement } from "./activeElement";
import { CustomElement } from "./CustomElement";
import { NodeType } from "./types";


export class AppDOM {

    /**
     * Builds the DOM Tree
     * @param Blah
     * @dom Element | Null
     */
    static async createDOMTree(
        blah: Blah,
        dom: Element | null
    ) {

        if (dom == null) {
            console.log("Error")
            ValidationError.throwError(ErrorTypes.NO_ELEMENT);
            return;
        }

        if (dom.nodeType != Node.ELEMENT_NODE) {
            return;
        }
        // console.log('createDOMTree', dom);
        if (dom.nodeName.startsWith("BLAH")) {
            const nodeName = dom.nodeName.replace("BLAH.", "");
            if (nodeName == NodeType.TEMPLATE)
                await CustomElement.Template(blah, dom.getAttribute("path") as string, dom);
        }

        for (let i = 0; i < dom.childNodes.length; i++) {
            const node = dom.childNodes[i];

            if (dom.nodeType == Node.ELEMENT_NODE) {
                await AppDOM.createDOMTree(blah, node as Element);
            }

        }
    }

    /**
     * Parses the dom.
     * @param blah Blah
     * @param dom Element
     * @returns 
     */
    static createDOM(
        blah: Blah,
        dom: Element | null
    ) {
        console.log('createDOM', dom);
        if (dom == null) {
            ValidationError.throwError(ErrorTypes.NO_ELEMENT);
            return;
        }

        this.createDomHelper(blah, dom);
    }

    private static createDomHelper(
        blah: Blah,
        dom: Element
    ) {
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
            ElementParserRoot.parse(node as Element, blah);
            AppDOM.createDOM(blah, node as HTMLElement);
        }
    }



    static async handleNodeUpdate(
        blah: Blah,
        node: Node,
    ) {
        AppDOM.createDOM(blah, node as HTMLElement);
        await ElementParserRoot.parse(node as Element, blah);
    }


    static async updateDOM(
        blah: Blah,
    ) {
        let doms: Set<string> = new Set<string>();
        let active = ActiveElement.getActiveElement();

        console.log((active as HTMLInputElement).selectionStart);

        console.log("Update Node", active, (active as HTMLInputElement).selectionEnd, (active.cloneNode(true) as HTMLInputElement).selectionStart);

        const ActiveInfo = ActiveElement.getActiveElementInfo(active)


        blah.updatedVariables.forEach((variable) => {
            const domsSet = blah.memory.linkedDOMs(variable);
            if (domsSet)
                domsSet.forEach((dom) => {
                    doms.add(dom);

                })

        })

        const customNodes = Object.values(Object.fromEntries(blah.memory.customElements))

        for (let _node of customNodes) {
            await AppDOM.handleNodeUpdate(blah, _node.root)
        }

        for (let dom of doms) {
            const element = blah.domMap.get(dom)?.cloneNode(true);
            console.log(element);
            if (element) {
                await AppDOM.handleNodeUpdate(blah, element);
                document.querySelector(`[blah-id="${dom}"]`)?.replaceWith(element);
            }
        }

        ActiveElement.handleActiveElement(AppDOM.getElementByBlahID(ActiveInfo.blahId), ActiveInfo, blah);

        blah.updatedVariables.clear();

    }

    /********** Utility functions ************************/
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

    /*****************************************************/
}


