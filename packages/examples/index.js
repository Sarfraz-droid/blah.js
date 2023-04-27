function $parcel$export(e, n, v, s) {
  Object.defineProperty(e, n, {get: v, set: s, enumerable: true, configurable: true});
}
var $fe673acc26d28f6f$exports = {};

$parcel$export($fe673acc26d28f6f$exports, "Blah", () => $fe673acc26d28f6f$export$8ba59ee53d0339a0, (v) => $fe673acc26d28f6f$export$8ba59ee53d0339a0 = v);
$parcel$export($fe673acc26d28f6f$exports, "default", () => $fe673acc26d28f6f$export$2e2bcd8739ae039, (v) => $fe673acc26d28f6f$export$2e2bcd8739ae039 = v);
var $a32bf89f10f59818$exports = {};

$parcel$export($a32bf89f10f59818$exports, "AppDOM", () => $a32bf89f10f59818$export$8a7e3c02f0a262c7, (v) => $a32bf89f10f59818$export$8a7e3c02f0a262c7 = v);
var $168feb6423e4d4f4$export$43a750ddd9f2303e;
(function(ErrorTypes) {
    ErrorTypes["NO_ELEMENT"] = "ERROR: No element with id ";
    ErrorTypes["NO_BLAH"] = "ERROR: No Blah instance found";
    ErrorTypes["NO_BLAH_ID"] = "ERROR: No Blah id found";
    ErrorTypes["NO_BLAH_DOM"] = "ERROR: No Blah DOM found";
    ErrorTypes["NO_BLAH_DOM_ELEMENT"] = "ERROR: No Blah DOM element found";
    ErrorTypes["NO_ID"] = "NO_ID";
})($168feb6423e4d4f4$export$43a750ddd9f2303e || ($168feb6423e4d4f4$export$43a750ddd9f2303e = {}));
class $168feb6423e4d4f4$export$2191b9da168c6cf0 {
    constructor(){}
    static throwError(errorType) {
        throw new Error(errorType);
    }
}



/**
 * Handles Functions for Blah
 * @class
 */ class $deb48d4823046876$export$e594a57fbda5c090 {
    constructor(value, root, uid){
        this.value = value;
        this.root = root;
        this.uid = uid;
        this.root.memory.setSignal(this.uid, this);
        this.value = value;
    }
    get data() {
        return this.value();
    }
    runFunction([...args]) {
        this.value(...args);
    }
    set data(value) {
        this.setValue(value);
        this.root.memory.setSignal(this.uid, this);
        console.log("====================================");
        console.log(this.id, this.value, "Updated");
        console.log("====================================");
    }
    get id() {
        return this.uid;
    }
    setValue(value) {
        this.value = value;
        this.root.updatedVariables.add(this.uid);
    }
}


/**
 * Handles Element parsing
 * @class
 */ class $dd33828ee214a960$export$d5148c7a9830c0dc {
    /**
     * Parses the element
     * @param element Element
     * @param root Blah
     */ static parse(element, root) {
        $dd33828ee214a960$export$d5148c7a9830c0dc.parseAttribute(element, root);
        $dd33828ee214a960$export$d5148c7a9830c0dc.parseVariable(element, root);
    }
    static handleActiveDOMUpdate(blahID) {
        const element = (0, $a32bf89f10f59818$exports.AppDOM).getElementByBlahID(blahID);
    }
    /**
     * Parses the attributes
     * @param element HTMLElement
     * @param root Blah
     */ static parseAttribute(element, root) {
        const attributes = element.attributes;
        console.log(element, attributes);
        for(let i = 0; i < attributes.length; i++){
            let attribName = attributes[i].name;
            let attribValue = attributes[i].value;
            if (attribName.startsWith("@")) {
                let eventName = attribName.replace("@", "");
                console.log(eventName, " added as event listener");
                element.addEventListener(eventName, (e)=>{
                    console.log("Event Triggered");
                    console.log(attribValue);
                    const value = root.memory.getSignal(attribValue.trim());
                    if (value instanceof (0, $deb48d4823046876$export$e594a57fbda5c090)) {
                        console.log("Function Called");
                        value.runFunction([
                            e
                        ]);
                    }
                    (0, $a32bf89f10f59818$exports.AppDOM).updateDOM(root);
                });
            }
            const variable = attribValue.match(this.variableRegex);
            console.log(variable);
            if (variable != null) {
                variable.forEach((variable)=>{
                    var _a, _b, _c;
                    const variableName = variable.replace(this.variableRegex, "$1");
                    const variableValue = root.memory.getSignal(variableName.trim());
                    attribValue = attribValue.replace(variable, (_b = (_a = variableValue === null || variableValue === void 0 ? void 0 : variableValue.data) === null || _a === void 0 ? void 0 : _a.toString()) !== null && _b !== void 0 ? _b : "");
                    root.memory.linkSignalToDOM(variableName.trim(), (_c = element.getAttribute("blah-id")) !== null && _c !== void 0 ? _c : "");
                });
                element.setAttribute(attribName, attribValue);
            }
        }
    }
    /**
     * Parses the variables inside the TEXT_NODEs
     * @param element Element
     * @param root Blah
     * @returns
     */ static parseVariable(element, root) {
        var _a;
        const textNode = element.childNodes[0];
        if ((textNode === null || textNode === void 0 ? void 0 : textNode.nodeType) != Node.TEXT_NODE) return;
        let text = (_a = textNode.textContent) !== null && _a !== void 0 ? _a : "";
        const variable = text.match(this.variableRegex);
        console.log(variable);
        if (variable != null) variable.forEach((variable)=>{
            var _a, _b, _c;
            const variableName = variable.replace(this.variableRegex, "$1");
            const variableValue = root.memory.getSignal(variableName.trim());
            console.log(variableName, variableValue, root.memory);
            text = text.replace(variable, (_b = (_a = variableValue === null || variableValue === void 0 ? void 0 : variableValue.data) === null || _a === void 0 ? void 0 : _a.toString()) !== null && _b !== void 0 ? _b : "");
            console.log(variableName);
            root.memory.linkSignalToDOM(variableName.trim(), (_c = element.getAttribute("blah-id")) !== null && _c !== void 0 ? _c : "");
        });
        textNode.textContent = text;
    }
}
// * Variables
$dd33828ee214a960$export$d5148c7a9830c0dc.variableRegex = /{{(.*?)}}/g;
$dd33828ee214a960$export$d5148c7a9830c0dc.bracketRegex = /{(.*?)}/g;



var $193bbf456b0d3da5$var$ActiveElementTagName;
(function(ActiveElementTagName) {
    ActiveElementTagName["INPUT"] = "INPUT";
    ActiveElementTagName["TEXTAREA"] = "TEXTAREA";
    ActiveElementTagName["SELECT"] = "SELECT";
    ActiveElementTagName["BUTTON"] = "BUTTON";
})($193bbf456b0d3da5$var$ActiveElementTagName || ($193bbf456b0d3da5$var$ActiveElementTagName = {}));
class $193bbf456b0d3da5$export$f8a370b5e5b9c82b {
    static getActiveElement() {
        return document.activeElement;
    }
    static handleActiveElement(id, clone, root) {
        const element = (0, $a32bf89f10f59818$exports.AppDOM).getElementByBlahID(id);
        element.focus();
        switch(element.tagName){
            case $193bbf456b0d3da5$var$ActiveElementTagName.TEXTAREA:
            case $193bbf456b0d3da5$var$ActiveElementTagName.INPUT:
                $193bbf456b0d3da5$export$f8a370b5e5b9c82b.handleInput(element, clone);
                break;
            default:
                break;
        }
    }
    static handleInput(element, clone) {
        // element.select();
        const caretPosition = clone.selectionStart;
        element.setSelectionRange(caretPosition, caretPosition);
        console.log("====================================");
        console.log(element.selectionStart, element.selectionEnd);
        console.log("====================================");
    }
}


var $6ff1c4ed1526c2ce$exports = {};

$parcel$export($6ff1c4ed1526c2ce$exports, "CustomElement", () => $6ff1c4ed1526c2ce$export$e38207f28c74982d, (v) => $6ff1c4ed1526c2ce$export$e38207f28c74982d = v);

var $2bd1f20062293b2e$exports = {};

$parcel$export($2bd1f20062293b2e$exports, "FileParser", () => $2bd1f20062293b2e$export$bae81c2874b0adbf, (v) => $2bd1f20062293b2e$export$bae81c2874b0adbf = v);
var $2bd1f20062293b2e$var$__awaiter = undefined && undefined.__awaiter || function(thisArg, _arguments, P, generator) {
    function adopt(value) {
        return value instanceof P ? value : new P(function(resolve) {
            resolve(value);
        });
    }
    return new (P || (P = Promise))(function(resolve, reject) {
        function fulfilled(value) {
            try {
                step(generator.next(value));
            } catch (e) {
                reject(e);
            }
        }
        function rejected(value) {
            try {
                step(generator["throw"](value));
            } catch (e) {
                reject(e);
            }
        }
        function step(result) {
            result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
        }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
class $2bd1f20062293b2e$export$bae81c2874b0adbf {
    static parseFile(path) {
        return $2bd1f20062293b2e$var$__awaiter(this, void 0, void 0, function*() {
            // console.log(process.cwd());
            const template = yield fetch(path);
            console.log(template);
            const templateText = yield template.text();
            console.log(templateText);
            const templateElement = new DOMParser().parseFromString(templateText, "text/html");
            const script = templateElement.querySelector("script");
            return {
                template: templateElement.querySelector("template"),
                script: script === null || script === void 0 ? void 0 : script.innerHTML
            };
        });
    }
    static scriptRunner(script, blah) {
        return $2bd1f20062293b2e$var$__awaiter(this, void 0, void 0, function*() {
            const _script = new Function("blah", script);
            blah.script = _script(blah);
        });
    }
}


var $6ff1c4ed1526c2ce$var$__awaiter = undefined && undefined.__awaiter || function(thisArg, _arguments, P, generator) {
    function adopt(value) {
        return value instanceof P ? value : new P(function(resolve) {
            resolve(value);
        });
    }
    return new (P || (P = Promise))(function(resolve, reject) {
        function fulfilled(value) {
            try {
                step(generator.next(value));
            } catch (e) {
                reject(e);
            }
        }
        function rejected(value) {
            try {
                step(generator["throw"](value));
            } catch (e) {
                reject(e);
            }
        }
        function step(result) {
            result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
        }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
class $6ff1c4ed1526c2ce$export$e38207f28c74982d {
    static Template(blah, path, dom) {
        return $6ff1c4ed1526c2ce$var$__awaiter(this, void 0, void 0, function*() {
            // console.log("Template Hot Reloaded", path, dom);
            const data = yield (0, $2bd1f20062293b2e$exports.FileParser).parseFile(path);
            const templateDiv = data.template;
            // console.log('====================================');
            // console.log(data.template, data.script);
            // console.log('====================================');
            blah.dom.initializeElement(dom);
            const templateDuplicate = templateDiv === null || templateDiv === void 0 ? void 0 : templateDiv.content.cloneNode(true);
            dom.insertBefore(templateDuplicate, dom.firstChild);
            const _blah = new (0, $fe673acc26d28f6f$exports.Blah)();
            yield (0, $2bd1f20062293b2e$exports.FileParser).scriptRunner(data.script, _blah);
            console.log("Template", _blah);
            _blah.startBlah(dom.getAttribute("blah-id"));
        });
    }
}


var $a32bf89f10f59818$var$__awaiter = undefined && undefined.__awaiter || function(thisArg, _arguments, P, generator) {
    function adopt(value) {
        return value instanceof P ? value : new P(function(resolve) {
            resolve(value);
        });
    }
    return new (P || (P = Promise))(function(resolve, reject) {
        function fulfilled(value) {
            try {
                step(generator.next(value));
            } catch (e) {
                reject(e);
            }
        }
        function rejected(value) {
            try {
                step(generator["throw"](value));
            } catch (e) {
                reject(e);
            }
        }
        function step(result) {
            result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
        }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var $a32bf89f10f59818$var$NodeType;
(function(NodeType) {
    NodeType["TEMPLATE"] = "TEMPLATE";
})($a32bf89f10f59818$var$NodeType || ($a32bf89f10f59818$var$NodeType = {}));
class $a32bf89f10f59818$export$8a7e3c02f0a262c7 {
    /***
     * Handles Custom Nodes
     */ static handleCustomNodes(blah, dom) {
        return $a32bf89f10f59818$var$__awaiter(this, void 0, void 0, function*() {
            const nodeName = dom.nodeName.replace("BLAH.", "");
            switch(nodeName){
                case $a32bf89f10f59818$var$NodeType.TEMPLATE:
                    yield (0, $6ff1c4ed1526c2ce$exports.CustomElement).Template(blah, dom.getAttribute("path"), dom);
                    break;
                default:
                    break;
            }
        });
    }
    /**
     * Builds the DOM Tree
     * @param Blah
     * @dom Element | Null
     */ static createDOMTree(blah, dom) {
        return $a32bf89f10f59818$var$__awaiter(this, void 0, void 0, function*() {
            if (dom == null) {
                console.log("Error");
                (0, $168feb6423e4d4f4$export$2191b9da168c6cf0).throwError((0, $168feb6423e4d4f4$export$43a750ddd9f2303e).NO_ELEMENT);
                return;
            }
            if (dom.nodeType != Node.ELEMENT_NODE) return;
            // console.log('createDOMTree', dom);
            if (dom.nodeName.startsWith("BLAH")) yield $a32bf89f10f59818$export$8a7e3c02f0a262c7.handleCustomNodes(blah, dom);
            for(let i = 0; i < dom.childNodes.length; i++){
                const node = dom.childNodes[i];
                if (dom.nodeType == Node.ELEMENT_NODE) yield $a32bf89f10f59818$export$8a7e3c02f0a262c7.createDOMTree(blah, node);
            }
        });
    }
    /**
     * Parses the dom.
     * @param blah Blah
     * @param dom Element
     * @returns
     */ static createDOM(blah, dom) {
        console.log("createDOM", dom);
        if (dom == null) {
            (0, $168feb6423e4d4f4$export$2191b9da168c6cf0).throwError((0, $168feb6423e4d4f4$export$43a750ddd9f2303e).NO_ELEMENT);
            return;
        }
        blah.dom.initializeElement(dom);
        const nodes = dom.childNodes;
        nodes.forEach((node)=>{
            $a32bf89f10f59818$export$8a7e3c02f0a262c7.handleNode(blah, node);
        });
    }
    static handleNode(blah, node) {
        if (node.nodeType == Node.ELEMENT_NODE) {
            $a32bf89f10f59818$export$8a7e3c02f0a262c7.createDOM(blah, node);
            (0, $dd33828ee214a960$export$d5148c7a9830c0dc).parse(node, blah);
        }
    }
    static handleNodeUpdate(blah, node) {
        $a32bf89f10f59818$export$8a7e3c02f0a262c7.createDOM(blah, node);
        (0, $dd33828ee214a960$export$d5148c7a9830c0dc).parse(node, blah);
    }
    static updateDOM(blah) {
        console.log("updateDOM", blah.updatedVariables);
        let doms = new Set();
        let active = (0, $193bbf456b0d3da5$export$f8a370b5e5b9c82b).getActiveElement();
        console.log(active.selectionStart);
        blah.updatedVariables.forEach((variable)=>{
            const domsSet = blah.memory.linkedDOMs(variable);
            if (domsSet) domsSet.forEach((dom)=>{
                doms.add(dom);
            });
        });
        doms.forEach((dom)=>{
            var _a, _b;
            const element = (_a = blah.domMap.get(dom)) === null || _a === void 0 ? void 0 : _a.cloneNode(true);
            console.log(element);
            if (element) {
                $a32bf89f10f59818$export$8a7e3c02f0a262c7.handleNodeUpdate(blah, element);
                (_b = document.querySelector(`[blah-id="${dom}"]`)) === null || _b === void 0 || _b.replaceWith(element);
            }
        });
        (0, $193bbf456b0d3da5$export$f8a370b5e5b9c82b).handleActiveElement($a32bf89f10f59818$export$8a7e3c02f0a262c7.getBlahID(active), active, blah);
        blah.updatedVariables.clear();
    }
    /********** Utility functions ************************/ static getBlahID(element) {
        const blahID = element.getAttribute("blah-id");
        if (blahID == null) {
            (0, $168feb6423e4d4f4$export$2191b9da168c6cf0).throwError((0, $168feb6423e4d4f4$export$43a750ddd9f2303e).NO_ID);
            return "";
        }
        return blahID;
    }
    static getElementByBlahID(blahID) {
        const element = document.querySelector(`[blah-id="${blahID}"]`);
        if (element == null) (0, $168feb6423e4d4f4$export$2191b9da168c6cf0).throwError((0, $168feb6423e4d4f4$export$43a750ddd9f2303e).NO_ID);
        return element;
    }
}



class $9de9dced5e589ab7$export$657f8094468310ff {
    constructor(blah){
        this.blah = blah;
        /** variables */ this.initialDOM = document.createElement("div");
        this.currentDOM = document.createElement("div");
    }
    /** getters */ get getActiveDOM() {
        return document.activeElement;
    }
    /**
     * @description Adds parser specific "blah-id" to the element component.
     * @param element HTMLElement
     * @returns
     */ initializeElement(element) {
        if (element.getAttribute("blah-id") != null) return;
        const uid = window.crypto.getRandomValues(new Uint32Array(1))[0].toString();
        element.setAttribute("blah-id", uid);
        this.blah.domMap.set(uid, element.cloneNode(true));
    }
    getInitialDOM() {
        return this.initialDOM;
    }
    setInitialDOM(element) {
        if (element == null) {
            (0, $168feb6423e4d4f4$export$2191b9da168c6cf0).throwError((0, $168feb6423e4d4f4$export$43a750ddd9f2303e).NO_ELEMENT);
            return;
        }
        this.initialDOM = element;
    }
}


/**
 * @description This class is used to store the state of the application. It is used to store the signals and the DOM elements
 */ class $d2f41537570325bf$export$29d4d7bc03c348a5 {
    constructor(root){
        this.root = root;
        this.signals = new Map();
        // Track the signals used in DOM Element
        this.signalMaps = new Map();
        this.domMap = new Map();
        this.updatedVariables = new Set; // Track the updated variables
    }
    /** get Signal or Hook Value */ getSignal(key) {
        return this.signals.get(key);
    }
    /** set Signal or Hook Value */ setSignal(key, value) {
        this.signals.set(key, value);
    }
    /** Add DOM id to the signal Map. All related dom elements to the signal will be added */ linkSignalToDOM(signal, id) {
        if (this.signalMaps.has(signal)) {
            const signals = this.signalMaps.get(signal);
            if (signals) signals.add(id);
        } else {
            const doms = new Set();
            doms.add(id);
            this.signalMaps.set(signal, doms);
        }
    }
    /** get linkedDOMs of the signal */ linkedDOMs(signal) {
        return this.signalMaps.get(signal);
    }
}



class $c9f1e782a096f4ba$export$7254cc27399e90bd {
    constructor(value, root, uid){
        this.value = value;
        this.root = root;
        this.uid = uid;
        this.root.memory.setSignal(this.uid, this);
        this.value = value;
    }
    get data() {
        return this.value;
    }
    set data(value) {
        this.setValue(value);
        console.log("====================================");
        console.log(this.id, this.value, "Updated");
        console.log("====================================");
    }
    get id() {
        return this.uid;
    }
    setValue(value) {
        this.value = value;
        this.root.memory.setSignal(this.uid, this);
        this.root.updatedVariables.add(this.uid);
    }
}


class $730fd1ef0151d5f5$export$8210dfe1863c478 {
    constructor(root){
        this.root = root;
    }
    createState(value, variableName) {
        const state = new (0, $c9f1e782a096f4ba$export$7254cc27399e90bd)(value, this.root, variableName);
        return state;
    }
    createHook(func, variableName) {
        const state = new (0, $deb48d4823046876$export$e594a57fbda5c090)(func, this.root, variableName);
        return state;
    }
}


var $fe673acc26d28f6f$var$__awaiter = undefined && undefined.__awaiter || function(thisArg, _arguments, P, generator) {
    function adopt(value) {
        return value instanceof P ? value : new P(function(resolve) {
            resolve(value);
        });
    }
    return new (P || (P = Promise))(function(resolve, reject) {
        function fulfilled(value) {
            try {
                step(generator.next(value));
            } catch (e) {
                reject(e);
            }
        }
        function rejected(value) {
            try {
                step(generator["throw"](value));
            } catch (e) {
                reject(e);
            }
        }
        function step(result) {
            result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
        }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
class $fe673acc26d28f6f$export$8ba59ee53d0339a0 {
    /*------------------------------------- */ constructor(){
        /* ----------- variables -------------- */ this.dom = new (0, $9de9dced5e589ab7$export$657f8094468310ff)(this);
        this.memory = new (0, $d2f41537570325bf$export$29d4d7bc03c348a5)(this);
        this.signal = new (0, $730fd1ef0151d5f5$export$8210dfe1863c478)(this);
        this.script = {};
        this.id = "";
    }
    /**----------- Getters ----------------- */ get domMap() {
        return this.memory.domMap;
    }
    get updatedVariables() {
        return this.memory.updatedVariables;
    }
    /**------------------------------------ */ /**
     * Create state binding for blah
     * @param value T
     * @param name string
     */ createState(value, name) {
        this.signal.createState(value, name);
    }
    /**
     * createHook binding from signal.createHook
     * @param func () => any
     * @param name string
     */ createHook(func, name) {
        this.signal.createHook(func, name);
    }
    /**
     * @description Initialize the compiler for the application
     * @param id string (Document id)
     */ StartApp(id) {
        return $fe673acc26d28f6f$var$__awaiter(this, void 0, void 0, function*() {
            this.id = id;
            console.log("StartApp");
            this.dom.setInitialDOM(document.getElementById(id));
            (0, $a32bf89f10f59818$exports.AppDOM).createDOMTree(this, this.dom.getInitialDOM());
        });
    }
    /**
     * @description For parsing .blah files. This is the entry point for the parser
     * @param id string
     */ startBlah(id) {
        return $fe673acc26d28f6f$var$__awaiter(this, void 0, void 0, function*() {
            this.id = id;
            console.log("startBlah", id);
            this.dom.setInitialDOM((0, $a32bf89f10f59818$exports.AppDOM).getElementByBlahID(id));
            (0, $a32bf89f10f59818$exports.AppDOM).createDOM(this, this.dom.getInitialDOM());
        });
    }
    getID() {
        return this.id;
    }
}
const $fe673acc26d28f6f$var$blah = new $fe673acc26d28f6f$export$8ba59ee53d0339a0();
var $fe673acc26d28f6f$export$2e2bcd8739ae039 = $fe673acc26d28f6f$var$blah;




export {$fe673acc26d28f6f$export$2e2bcd8739ae039 as Blah};
//# sourceMappingURL=index.js.map
