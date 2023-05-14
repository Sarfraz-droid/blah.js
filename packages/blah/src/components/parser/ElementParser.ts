import blah, { Blah } from "../blah";
import { AppDOM } from "../dom/AppDOM";
import { CustomElement } from "../dom/CustomElement";
import { NodeType } from "../dom/types";
import { Hook } from "../signals/Hook";
import { TextParser } from "./conditional/TextParser";

/**
 * Handles Element parsing
 * @class
 */
export class ElementParserRoot {

    // * Variables
    static variableRegex = /{{(.*?)}}/g;
    static bracketRegex = /{(.*?)}/g;

    /**
     * Parses the element
     * @param element Element
     * @param root Blah
     */
    public static async parse(
        element: Element,
        root: Blah
    ) {
        root.dom.initializeElement(element as HTMLElement);
        await ElementParserRoot.parseQuery(element as Element, root);
        ElementParserRoot.parseAttribute(element as HTMLElement, root);
        ElementParserRoot.parseVariable(element as Element, root);
    }

    public static handleActiveDOMUpdate(
        blahID: string,
    ) {
        const element = AppDOM.getElementByBlahID(blahID);


    }

    /***
    * Handles Custom Nodes
    */
    static async handleCustomNodes(blah: Blah, dom: Element) {
        const nodeName = dom.nodeName.replace("BLAH.", "");
        switch (nodeName) {
            case NodeType.IF:
                await CustomElement.If(blah, dom as HTMLElement);
                break;
            default:
                break;
        }
    }



    /**
     * Parses the attributes
     * @param element HTMLElement
     * @param root Blah
     */
    public static parseAttribute(
        element: HTMLElement,
        root: Blah
    ) {
        const attributes = element.attributes;
        console.log(element, attributes);

        for (let i = 0; i < attributes.length; i++) {
            let attribName = attributes[i].name;
            let attribValue = attributes[i].value;

            if (attribName.startsWith("@")) {
                let eventName = attribName.replace("@", "");
                console.log(eventName, " added as event listener");
                element.addEventListener(eventName, (e) => {
                    console.log("Event Triggered");
                    console.log(attribValue);
                    const value = root.memory.getSignal(attribValue.trim());
                    if (value instanceof Hook) {
                        console.log("Function Called");
                        value.runFunction([
                            e
                        ]);
                    }

                    AppDOM.updateDOM(root);
                });
            }

            const variable = attribValue.match(this.variableRegex);
            console.log(variable);

            if (variable != null) {
                variable.forEach((variable) => {
                    const variableName = variable.replace(this.variableRegex, '$1');
                    const variableValue = root.memory.getSignal(variableName.trim());

                    attribValue = attribValue.replace(variable, variableValue?.data?.toString() ?? '');
                    root.memory.linkSignalToDOM(variableName.trim(), element.getAttribute("blah-id") ?? '');
                })
                element.setAttribute(attribName, attribValue);
            }
        }
    }

    /**
     * Parses the variables inside the TEXT_NODEs
     * @param element Element
     * @param root Blah
     * @returns 
     */
    public static parseVariable(
        element: Element,
        root: Blah
    ) {
        const textNode = element.childNodes[0];

        if (textNode?.nodeType != Node.TEXT_NODE) {
            return;
        }
        let text = textNode.textContent ?? '';

        const variable = text.match(this.variableRegex);
        console.log(variable);
        if (variable != null) {
            variable.forEach((variable) => {
                const variableName = variable.replace(this.variableRegex, '$1');
                const variableValue = root.memory.getSignal(variableName.trim());

                console.log(variableName, variableValue, root.memory);
                text = text.replace(variable, variableValue?.data?.toString() ?? '');
                console.log(variableName);
                root.memory.linkSignalToDOM(variableName.trim(), element.getAttribute("blah-id") ?? '');
            })
        }

        textNode.textContent = text;
    }

    public static async parseQuery(
        element: Element,
        root: Blah
    ) {
        await this.handleCustomNodes(root, element);
    }

}