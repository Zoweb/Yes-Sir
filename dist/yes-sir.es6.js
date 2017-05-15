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

// say cheese
if (IS_BROWSER) console.log("      %cYes-Sir Assertion Libary\n" +
    "(c) zoweb 2017 | github/zoweb/yes-sir", "color:purple;font-weight:bold;");
else console.log(" __     __              _____ _      \n" +
    " \\ \\   / /             / ____(_)     \n" +
    "  \\ \\_/ /__  ___ _____| (___  _ _ __ \n" +
    "   \\   / _ \\/ __|______\\___ \\| | '__|\n" +
    "    | |  __/\\__ \\      ____) | | |   \n" +
    "    |_|\\___||___/     |_____/|_|_|   \n" +
    "                                     \n" +
    "                                     \n" +
    "          assertion library\n");


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
};

/**
 * Copyright (c) 2017, zoweb
 *
 * See the license in the LICENSE file (downloaded with this repository, in the root folder)
 * By using this code, you agree to the license in the file specified (the MIT license)
 */

function getDefaultEnglishAssertions() {
    return {
        true: value => value === true,
        false: value => value === false,

        trueCoerced: value => !!value,
        falseCoerced: value => !value,

        null: value => value === null,
        undefined: value => typeof value === "undefined",
        existant: value => !(typeof value === "undefined" || value === null),

        a: (value, type) => typeof type === "string"
            ? typeof value === type
            : value instanceof type,

        equalTo: (value, value2) => value === value2,
        like: (value, value2) =>  value == value2,

        lengthEqualTo: (value, length) => value.length === length,
        lengthOver: (value, length) => value.length > length,
        lengthOverOrEqualTo: (value, length) => value.length >= length,
        lengthUnder: (value, length) => value.length < length,
        lengthUnderOrEqualTo: (value, length) => value.length <= length,

        over: (value, value2) => value > value2,
        overOrEqualTo: (value, value2) => value >= value2,

        under: (value, value2) => value < value2,
        underOrEqualTo: (value, value2) => value <= value2,

        including: (value, includes) => value.indexOf(includes) > -1
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
    static result() {
        return {
            is: {
                correct: true,
                incorrect: false
            }
        }
    };

    constructor(truthfuls, innerObject) {
        this._truthfuls = {};
        if (truthfuls instanceof Object) this._truthfuls = truthfuls;

        this._rootTruthful = (value, value2) => value === value2;
        this._rootTruthfulName = "equalTo";

        this._innerObject = innerObject;

        this._throwWhen = English.result().is.incorrect;
    };

    /**
     * Sets when to throw an error
     * @param {*} when When to throw the error (
     */
     throwWhen(when) {
         this._throwWhen = when;
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
     * @param {String} truthName
     */
    setRootTruthful(truthName) {
        if (typeof this._truthfuls[truthName] !== "function") throw new TypeError("Invalid truth name");
        this._rootTruthful = this._truthfuls[truthName];
        this._rootTruthfulName = truthName;
    };

    _runFunction(fn, truthName, value, value2, onWrongFn, doInvert) {
        let hasCompleted = fn(value, value2);
        if (doInvert === true) {
            hasCompleted = !hasCompleted;
        }

        if (hasCompleted === this._throwWhen) {
            onWrongFn(
                exports.yessir.lang(
                    exports.yessir.langGetComparisonName(truthName),
                    value, value2,
                    doInvert ^ this._throwWhen
                )
            );
        }

        return hasCompleted;
    };

    _getTruthfuls(value, onWrongFn) {
        let truth = value2 => this._runFunction(this._rootTruthful, null, value, value2, onWrongFn);

        for (let currentTruth in this._truthfuls) {
            if (!this._truthfuls.hasOwnProperty(currentTruth)) continue;
            truth[currentTruth] = value2 => {
                return this._runFunction(this._truthfuls[currentTruth], currentTruth, value, value2, onWrongFn);
            };
        }

        return truth;
    };

    /**
     * Gives an English function
     * @param {*} value The input value
     * @param {Function} [onWrongFn] The on bad stuff function
     * @returns {EnglishFN|Object} The truthful function (or an object containing it)
     */
    parse(value, onWrongFn = function(){}) {
        let truthfuls = this._getTruthfuls(value, onWrongFn);

        // set up truthfuls.not, by inverting all outputs
        truthfuls.not = value2 => this._runFunction(this._rootTruthful, null, value, value2, onWrongFn, true);
        for (let currentTruth in truthfuls) {
            if (!truthfuls.hasOwnProperty(currentTruth)) continue;
            truthfuls.not[currentTruth] = (value, value2) => this._runFunction(this._truthfuls[currentTruth], currentTruth, value, value2, onWrongFn, true);
        }

        if (this._innerObject) {
            let returnVal = {};
            returnVal[this._innerObject] = truthfuls;
            return returnVal;
        }

        return truthfuls;
    };

    /**
     * Quick and simple way to create an export so you don't have to type everything.
     * Pretty much useless though...
     * @param {Function} [errorFn] The "on bad stuff" function
     * @returns {EnglishFN|Object}
     */
    generateExport(errorFn = function(){}) {
        return value => this.parse(value, errorFn);
    }
};

/* THROW AND FORCE */
(function() {
    let commands = getDefaultEnglishAssertions();

    // throw
    let Throw = new English(commands, "is");
    Throw.throwWhen(English.result().is.correct);
    exports.Throw = message => ({
        if: Throw.generateExport((...args) => FunctionTools.throw(message, ...args)),
    });

    // force
    let Force = new English(commands, "as");
    exports.Force = Force.generateExport((...args) => FunctionTools.throw(null, ...args));
}());


/* ASSERT */
(function() {
    let commandsFromEnglish = getDefaultEnglishAssertions();

    let ohno = function(message, nameAsEnglish, value, value2, not) {
        FunctionTools.throw(
            exports.yessir.lang(
                exports.yessir.langGetComparisonName(nameAsEnglish),
                value, value2, not
            )
        );
    };

    exports.Assert = {
        true: (value, message) => (value === true) || ohno(message, "true", value),
        notTrue: (value, message) => (value !== true) || ohno(message, "true", value, null, true),

        false: (value, message) => (value === false) || ohno(message, "false", value),
        notFalse: (value, message) => (value !== false) || ohno(message, "false", value),

        eTrue: (value, message) => (!!value) || ohno(message, "trueCoerced", value),
        eFalse: (value, message) => (!value) || ohno(message, "falseCoerced", value),

        null: (value, message) => (value === null) || ohno(message, "null", value),
        notNull: (value, message) => (value !== null) || ohno(message, "null", value, null, true),

        undefined: (value, message) => (typeof value === "undefined") || ohno(message, "undefined", value),
        notUndefined: (value, message) => (typeof value !== "undefined") || ohno(message, "undefined", value, null, true),

        exists: (value, message) => (typeof value === "undefined" || value === null) && ohno(message, "existant", value),
        doesNotExist: (value, message) => (typeof value === "undefined" || value === null) || ohno(message, "existant", value, null, true),

        lengthEqualTo: (value, length, message) => (value.length === length) || ohno(message, "lengthEqualTo", value, length),
        lengthOver: (value, length, message) => (value.length > length) || ohno(message, "lengthOver", value, length),
        lengthOverOrEqualTo: (value, length, message) => (value.length >= length) || ohno(message, "lengthOverOrEqualTo", value, length),
        lengthUnder: (value, length, message) => (value.length < length) || ohno(message, "lengthUnder", value, length),
        lengthUnderOrEqualTo: (value, length, message) => (value.length <= length) || ohno(message, "lengthUnderOrEqualTo", value, length),

        over: (value, value2, message) => (value > value2) || ohno(message, "over", value, value2),
        overOrEqualTo: (value, value2, message) => (value >= value2) || ohno(message, "overOrEqualTo", value, value2),

        under: (value, value2, message) => (value < value2) || ohno(message, "under", value, value2),
        underOrEqualTo: (value, value2, message) => (value <= value2) || ohno(message, "underOrEqualTo", value, value2),

        includes: (value, includes, message) => (value.indexOf(includes) > -1) || ohno(message, "including", value, includes)
    };
}());;

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
};;

/* HOPEFULLY AND WARN */
(function() {
    let commands = getDefaultEnglishAssertions();

    // throw
    let Warn = new English(commands, "is");
    Warn.throwWhen(English.result().is.correct);
    exports.Warn = message => ({
        if: Warn.generateExport((...args) => FunctionTools.warn(message, ...args)),
    });

    // force
    let Hopefully = new English(commands, "is");
    exports.Hopefully = Hopefully.generateExport((...args) => FunctionTools.warn(null, ...args));
}());;

/* IS AND LOG */
(function() {
    let commands = getDefaultEnglishAssertions();

    // is
    let Is = new English(commands);
    exports.Is = Is.generateExport();

    // log
    let Log = new English(commands, "is");
    Log.throwWhen(English.result().is.correct);
    exports.Log = message => ({
        if: Log.generateExport((...args) => FunctionTools.log(message, ...args))
    });
}());;

(function() {
    let _languages = {};
    let _currentLanguage = {};

    function setLanguage(languages) {
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
                FunctionTools.throw("Language is in the wrong format", languages[languageName], "Object", "%value% must be an %expected%");

            if (!(typeof _languages[languageName] === "undefined" || _languages[languageName] === null))
                FunctionTools.throw("Language already exists", _languages[languageName], null, "%value% must not exist");

            _languages[languageName] = languages[languageName];
        }

        if (IS_BROWSER && langAmnt === 0) {
            console.warn("Yes-Sir: A language pack loaded zero (0) languages.\n" +
                "         " +
                "As this is probably an error, you should put an issue on the creator's page.");
        }
    }

    function getLanguage(comparisonName, value, expected, useNot) {
        if (typeof _currentLanguage.format !== "string") throw new ReferenceError("No format has been set");
        if (typeof comparisonName !== "string") throw new TypeError("Comparison name must be a string");

        let comparison = _currentLanguage.comparisons[comparisonName];
        if (typeof comparison !== "string") throw new TypeError("Invalid comparison name");

        let format = _currentLanguage.format;
        let not = _currentLanguage.not, an = _currentLanguage.an;

        comparison = comparison.replace(/%not%/g, useNot ? not : "");

        if (typeof expected === "function") expected = expected.name;

        return format.replace(/%value%/g, value).replace(/%expected%/g, expected).replace(/%comparison%/g, comparison);
    }

    defineExportProperty("lang", {
        /**
         * Adds a language
         * @param languages The language to add
         * @setter
         */
        set: languages => setLanguage(languages),

        /**
         * Gets the current language
         * @getter
         */
        get: () => (comparisonName, value, expected, useNot) => getLanguage(comparisonName, value, expected, useNot)
    });

    defineExportProperty("langGetComparisonName", {
        get: () => truthName => {
            return _currentLanguage.db[truthName] || "shouldEvaluateTo"
        }
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
    // adds Exports object to window and sets window.YesSirNoConflict
    for (let current in exports) {
        if (!exports.hasOwnProperty(current)) continue;
        window[current] = exports[current];
    }

    /**
     * Returns the Yes-Sir object
     * @returns {Object} Yes-Sir object
     */
    window.YesSirNoConflict = function() {
        return exports;
    };
}

return exports;
}));