export enum ErrorTypes {
    NO_ELEMENT = 'ERROR: No element with id ',
    NO_BLAH = 'ERROR: No Blah instance found',
    NO_BLAH_ID = 'ERROR: No Blah id found',
    NO_BLAH_DOM = 'ERROR: No Blah DOM found',
    NO_BLAH_DOM_ELEMENT = 'ERROR: No Blah DOM element found',
    NO_ID = "NO_ID"
}

/**
 * Error Handler
 */
export class ValidationError {
    constructor() {
    }
    static throwError(errorType: ErrorTypes) {
        throw new Error(errorType);
    }
}

