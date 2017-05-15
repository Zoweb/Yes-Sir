/*!
 * Copyright (c) 2017, zoweb
 *
 * See the license in the LICENSE file (downloaded with this repository, in the root folder)
 * By using this code, you agree to the license in the file specified (the MIT license)
 */

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


    _getTruthfuls(value) {
        let truth = value2 => this._rootTruthful(value, value2);

        for (let currentTruth in this._truthfuls) {
            if (!this._truthfuls.hasOwnProperty(currentTruth)) continue;
            truth[currentTruth] = this._truthfuls[currentTruth];
        }

        return truth;
    };

    /**
     * Gives an English function
     * @param {*} value The input value
     * @returns {EnglishFN} The truthful function
     */
    getFn(value) {
        let truthfuls = this._getTruthfuls(value);

        // set up truthfuls.not, by inverting all outputs
        truthfuls.not = value2 => !this._rootTruthful(value, value2);
        for (let currentTruth in truthfuls) {
            if (!truthfuls.hasOwnProperty(currentTruth)) continue;
            truthfuls.not[currentTruth] = (...args) => truthfuls[currentTruth](...args);
        }

        return truthfuls;
    };
}