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
}