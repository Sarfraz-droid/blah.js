export enum NodeType {
    TEMPLATE = 'TEMPLATE',
    IF = 'IF',
    LOOP = 'LOOP',
    CHILD = 'CHILD',
    TRUE = 'TRUE',
    FALSE = 'FALSE'
}

export interface ICustomElement {
    root: Element;
    true?: Element | null;
    false?: Element | null;
    child?: Element | null;
}
