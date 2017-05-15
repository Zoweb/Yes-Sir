const FunctionTools = {
    /*defaultMessage: (message, value, expected, doInvert) => {
        if (typeof message !== "string") message = "%value% must %notornot%equal %expected%";
        if (typeof message === "function") expected = expected.name;

        return message.replace(/%value%/g, value).replace(/%expected%/g, expected).replace(/%notornot%/g, doInvert === true ? "not " : "");
    },

    throw: (message, value, expected, extended, doInvert) => {
        throw new (CustomError("AssertError"))("No, Sir! " + (message ? message + ": " : "") + FunctionTools.defaultMessage(extended, value, expected, doInvert));
    },
    warn: (message, value, expected, extended, doInvert) => {
        console.warn(new (CustomError("AssertWarn"))("No, Sir! " + (message ? message + ": " : "") + FunctionTools.defaultMessage(extended, value, expected, doInvert)));
    },
    log: (message, value, expected, extended, doInvert) => {
        console.log(new (CustomError("AssertLog"))("No, Sir! " + (message ? message + ": " : "") + FunctionTools.defaultMessage(extended, value, expected, doInvert)));
    }*/


    throw: (message, extended) => {
        throw new (CustomError("AssertError"))("No, Sir! " + (message ? message + ": " : "") + extended)
    },
    warn: (message, extended) => {
        console.warn(new (CustomError("AssertWarn"))("No, Sir! " + (message ? message + ": " : "") + extended))
    },
    log: (message, extended) => {
        console.log(new (CustomError("AssertLog"))("No, Sir! " + (message ? message + ": " : "") + extended))
    }
};