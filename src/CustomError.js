/**
 * Creates an error with a custom name
 * @param {String} errorName The name of the error
 * @returns {{new(*=): {}}}
 */
function CustomError(errorName) {
    if (typeof errorName !== "string") errorName = "Error";

    return class extends Error {
        constructor(message) {
            super();

            this.name = errorName;

            if (typeof message === "string") this.message = message;
            else this.message = "";
        };
    };
}