/*!
 * Copyright (c) 2017, zoweb
 *
 * See the license in the LICENSE file (downloaded with this repository, in the root folder)
 * By using this code, you agree to the license in the file specified (the MIT license)
 */

(function (global, factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        module.exports = global.document ?
            factory(global, true) :
            w => factory(w);
    } else {
        factory(global);
    }
}(typeof window !== "undefined" ? window : this, (window, noGlobal) => {


const IS_BROWSER = typeof window !== "undefined";
const exports = {
    yessir: {}
};
const defineExportProperty = (proto, val) => {
    Object.defineProperty(exports.yessir, proto, val);
};

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
};

// JSDocs
/**
 * @callback RootTruthfulCallback
 * @param {*} value1
 * @param {*} value2
 */



/**
 * Empty class, for use in JSDoc
 */
class EnglishFN {
    constructor() { return ()=>{} };
    not() {};
}


/**
 * "English" class
 */
class English {
    constructor() {
        this._truthfuls = {};
        this._rootTruthful = (value, value2) => value === value2;
    }

    /**
     * Adds a truthful function
     * @param {String} name The name that is used as xx.[name]
     * @param {Function} fn The function to be run to calculate the value
     */
    setTruthful(name, fn) {
        this._truthfuls[name] = fn;
    };

    /**
     * Sets the root truthful function, to be used as xx(value1, value2)
     * @param {RootTruthfulCallback} fn
     */
    setRootTruthful(fn) {
        this._rootTruthful = fn;
    };


    _getTruthfuls(value, onWrongFn) {
        let truth = value2 => this._rootTruthful(value, value2);

        for (let currentTruth in this._truthfuls) {
            if (!this._truthfuls.hasOwnProperty(currentTruth)) continue;
            truth[currentTruth] = value2 => {
                let hasCompleted = this._truthfuls[currentTruth](value, value2);
                return {
                    else: message => onWrongFn(message, value, value2, exports.yessir.lang[currentTruth]),
                    asValue: () => onWrongFn(null, value, value2, exports.yessir.lang[currentTruth])
                }
            };
        }

        return truth;
    };

    /**
     * Gives an English function
     * @param {*} value The input value
     * @param {Function} onWrongFn The on bad stuff function
     * @returns {EnglishFN} The truthful function
     */
    parse(value, onWrongFn) {
        let truthfuls = this._getTruthfuls(value);

        // set up truthfuls.not, by inverting all outputs
        truthfuls.not = value2 => !this._rootTruthful(value, value2);
        for (let currentTruth in truthfuls) {
            if (!truthfuls.hasOwnProperty(currentTruth)) continue;
            truthfuls.not[currentTruth] = (...args) => truthfuls[currentTruth](...args);
        }

        return truthfuls;
    };
};

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
};;

(function() {
    let is = {
        true: () => value === true,
        false: () => value === false,

        trueCoerced: () => !!value,
        falseCoerced: () => !value,

        null: () => value === null,
        undefined: () => typeof value === "undefined",

        a: type => typeof type === "string"
            ? typeof value === type
            : value instanceof type,

        equalTo: value2 => value === value2,
        like: value2 =>  value == value2
    };

    let engr = new English();
    let exported = value => engr.parse(value, FunctionTools.log);
    exported.set = name => ({to: val => is[name] = val});
}());;

(function() {
    let _languages = {};
    let _currentLanguage = {};

    defineExportProperty("lang", {
        /**
         * Adds a language
         * @param languages The language to add
         * @setter
         */
        set: languages => {
            const FormatError = CustomError("FormatError");

            // loop through the languages
            let langAmnt = 0;
            for (const languageName in languages) {
                if (!languages.hasOwnProperty(languageName)) continue;

                if (IS_BROWSER) console.log("Yes-Sir: Loading language:", languageName);

                langAmnt++;

                if (languageName.length !== 5) throw new FormatError("Invalid language format.");
                if (languageName.indexOf("-") !== 2) throw new FormatError("Invalid language format");

                if (!(languages[languageName] instanceof Object))
                    FunctionTools.throw("Language is in the wrong format", languages[languageName], "Object", "%value% must be an %extended%");

                if (!(typeof _languages[languageName] === "undefined" || _languages[languageName] === null))
                    FunctionTools.throw("Language already exists", _languages[languageName], null, "%value% must not exist");

                _languages[languageName] = languages[languageName];
            }

            if (IS_BROWSER && langAmnt === 0) {
                console.warn("Yes-Sir: A language pack loaded zero (0) languages.\n" +
                    "         " +
                    "As this is probably an error, you should put an issue on the creator's page.");
            }
        },

        /**
         * Gets the current language
         * @getter
         */
        get: () => _currentLanguage
    });

    exports.yessir.setLanguage = name => {
        if (typeof name === "undefined" || name === null)
            FunctionTools.throw("Argument `name`", name, null, "%value% must exist");

        const FormatError = CustomError("FormatError");

        if (name.length !== 5) throw new FormatError("Invalid language format.");
        if (name.indexOf("-") !== 2) throw new FormatError("Invalid language format.");

        if (typeof _languages[name] === "undefined" || _languages[name] === null)
            FunctionTools.throw("Unknown language name", _languages[name], null, "%value% must exist");

        _currentLanguage = _languages[name];
    };
}());


// Export Yes-Sir
if (typeof noGlobal === "undefined") {
    for (let current in exports) {
        if (!exports.hasOwnProperty(current)) continue;
        window[current] = exports[current];
    }
}

return exports;
}));