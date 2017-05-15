/**
 * Copyright (c) 2017, zoweb
 *
 * See the license in the LICENSE file (downloaded with this repository, in the root folder)
 * By using this code, you agree to the license in the file specified (the MIT license)
 */

const FunctionTools = {
    defaultMessage: (message, value, expected) => {
        if (typeof message !== "string") message = "%value% must equal %expected%";
        if (typeof message === "function") expected = expected.name;

        return message.replace(/%value%/g, value).replace(/%expected%/g, expected);
    },

    throw: (message, value, expected, extended) => {
        throw new CustomError("AssertError")((message ? message + ": " : "") + FunctionTools.defaultMessage(extended, value, expected));
    },
    warn: (message, value, expected, extended) => {
        console.warn(CustomError("AssertWarn")((message ? message + ": " : "") + FunctionTools.defaultMessage(extended, value, expected)));
    },
    log: (message, value, expected, extended) => {
        console.log(CustomError("AssertLog")((message ? message + ": " : "") + FunctionTools.defaultMessage(extended, value, expected)));
    }
};