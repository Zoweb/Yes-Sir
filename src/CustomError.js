/**
 * Copyright (c) 2017, zoweb
 *
 * See the license in the LICENSE file (downloaded with this repository, in the root folder)
 * By using this code, you agree to the license in the file specified (the MIT license)
 */

/**
 * Creates an error with a custom name
 * @param {String} errorName The name of the error
 * @returns {{new(*=): {}}}
 */
function CustomError(errorName) {
    return class extends Error {
        constructor(message) {
            super();

            this.name = errorName;

            if (typeof message === "string") this.message = message;
            else this.message = "";
        };
    };
}