"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/*!
 * Copyright (c) 2017, zoweb
 *
 * See the license in the LICENSE file (downloaded with this repository, in the root folder)
 * By using this code, you agree to the license in the file specified (the MIT license)
 */

(function (global, factory) {
    if ((typeof module === "undefined" ? "undefined" : _typeof(module)) === "object" && _typeof(module.exports) === "object") {
        module.exports = factory(module.exports, true);
    } else {
        factory(global);
    }
})(typeof window !== "undefined" ? window : undefined, function (window, noGlobal) {

    var IS_BROWSER = typeof window !== "undefined";
    var exports = {
        yessir: {}
    };
    var defineExportProperty = function defineExportProperty(proto, val) {
        Object.defineProperty(exports.yessir, proto, val);
    };

    /*
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
    */

    /* HEY THERE! I SEE YOU'RE INSPECTING THE SOURCE CODE! */
    /* DO YOU WANT TO SPREAD THE WORD ABOUT Yes-Sir? IF YOUR */
    /* ANSWER WAS "Yes, sir!", THEN MAKE SURE YOU UN-COMMENT OUT THE LINES BELOW "say cheese"! */

    /**
     * Creates an error with a custom name
     * @param {String} errorName The name of the error
     * @returns {{new(*=): {}}}
     */
    function CustomError(errorName) {
        if (typeof errorName !== "string") errorName = "Error";

        return function (_Error) {
            _inherits(_class, _Error);

            function _class(message) {
                _classCallCheck(this, _class);

                var _this = _possibleConstructorReturn(this, (_class.__proto__ || Object.getPrototypeOf(_class)).call(this));

                _this.name = errorName;

                if (typeof message === "string") _this.message = message;else _this.message = "";
                return _this;
            }

            return _class;
        }(Error);
    };

    /**
     * Copyright (c) 2017, zoweb
     *
     * See the license in the LICENSE file (downloaded with this repository, in the root folder)
     * By using this code, you agree to the license in the file specified (the MIT license)
     */

    function getDefaultEnglishAssertions() {
        return {
            true: function _true(value) {
                return value === true;
            },
            false: function _false(value) {
                return value === false;
            },

            trueCoerced: function trueCoerced(value) {
                return !!value;
            },
            falseCoerced: function falseCoerced(value) {
                return !value;
            },

            null: function _null(value) {
                return value === null;
            },
            undefined: function undefined(value) {
                return typeof value === "undefined";
            },
            existant: function existant(value) {
                return !(typeof value === "undefined" || value === null);
            },

            a: function a(value, type) {
                return typeof type === "string" ? (typeof value === "undefined" ? "undefined" : _typeof(value)) === type : value instanceof type;
            },

            equalTo: function equalTo(value, value2) {
                return value === value2;
            },
            like: function like(value, value2) {
                return value == value2;
            },

            lengthEqualTo: function lengthEqualTo(value, length) {
                return value.length === length;
            },
            lengthOver: function lengthOver(value, length) {
                return value.length > length;
            },
            lengthOverOrEqualTo: function lengthOverOrEqualTo(value, length) {
                return value.length >= length;
            },
            lengthUnder: function lengthUnder(value, length) {
                return value.length < length;
            },
            lengthUnderOrEqualTo: function lengthUnderOrEqualTo(value, length) {
                return value.length <= length;
            },

            over: function over(value, value2) {
                return value > value2;
            },
            overOrEqualTo: function overOrEqualTo(value, value2) {
                return value >= value2;
            },

            under: function under(value, value2) {
                return value < value2;
            },
            underOrEqualTo: function underOrEqualTo(value, value2) {
                return value <= value2;
            },

            including: function including(value, includes) {
                return value.indexOf(includes) > -1;
            }
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

    var EnglishFN = function () {
        function EnglishFN() {
            _classCallCheck(this, EnglishFN);

            return function () {};
        }

        _createClass(EnglishFN, [{
            key: "not",
            value: function not() {}
        }]);

        return EnglishFN;
    }();

    /**
     * "English" class
     */


    var English = function () {
        _createClass(English, null, [{
            key: "result",
            value: function result() {
                return {
                    is: {
                        correct: true,
                        incorrect: false
                    }
                };
            }
        }]);

        function English(truthfuls, innerObject) {
            _classCallCheck(this, English);

            this._truthfuls = {};
            if (truthfuls instanceof Object) this._truthfuls = truthfuls;

            this._rootTruthful = function (value, value2) {
                return value === value2;
            };
            this._rootTruthfulName = "equalTo";

            this._innerObject = innerObject;

            this._throwWhen = English.result().is.incorrect;
        }

        _createClass(English, [{
            key: "throwWhen",


            /**
             * Sets when to throw an error
             * @param {*} when When to throw the error (
             */
            value: function throwWhen(when) {
                this._throwWhen = when;
            }

            /**
             * Adds a truthful function
             * @param {String} name The name that is used as xx.[name]
             * @param {Function} fn The function to be run to calculate the value
             */

        }, {
            key: "setTruthful",
            value: function setTruthful(name, fn) {
                this._truthfuls[name] = fn;
            }
        }, {
            key: "setRootTruthful",


            /**
             * Sets the root truthful function, to be used as xx(value1, value2)
             * @param {String} truthName
             */
            value: function setRootTruthful(truthName) {
                if (typeof this._truthfuls[truthName] !== "function") throw new TypeError("Invalid truth name");
                this._rootTruthful = this._truthfuls[truthName];
                this._rootTruthfulName = truthName;
            }
        }, {
            key: "_runFunction",
            value: function _runFunction(fn, truthName, value, value2, onWrongFn, doInvert) {
                var hasCompleted = fn(value, value2);
                if (doInvert === true) {
                    hasCompleted = !hasCompleted;
                }

                if (hasCompleted === this._throwWhen) {
                    onWrongFn(exports.yessir.lang(exports.yessir.langGetComparisonName(truthName), value, value2, doInvert ^ this._throwWhen));
                }

                return hasCompleted;
            }
        }, {
            key: "_getTruthfuls",
            value: function _getTruthfuls(value, onWrongFn) {
                var _this2 = this;

                var truth = function truth(value2) {
                    return _this2._runFunction(_this2._rootTruthful, null, value, value2, onWrongFn);
                };

                var _loop = function _loop(currentTruth) {
                    if (!_this2._truthfuls.hasOwnProperty(currentTruth)) return "continue";
                    truth[currentTruth] = function (value2) {
                        return _this2._runFunction(_this2._truthfuls[currentTruth], currentTruth, value, value2, onWrongFn);
                    };
                };

                for (var currentTruth in this._truthfuls) {
                    var _ret = _loop(currentTruth);

                    if (_ret === "continue") continue;
                }

                return truth;
            }
        }, {
            key: "parse",


            /**
             * Gives an English function
             * @param {*} value The input value
             * @param {Function} [onWrongFn] The on bad stuff function
             * @returns {EnglishFN|Object} The truthful function (or an object containing it)
             */
            value: function parse(value) {
                var _this3 = this;

                var onWrongFn = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : function () {};

                var truthfuls = this._getTruthfuls(value, onWrongFn);

                // set up truthfuls.not, by inverting all outputs
                truthfuls.not = function (value2) {
                    return _this3._runFunction(_this3._rootTruthful, null, value, value2, onWrongFn, true);
                };

                var _loop2 = function _loop2(currentTruth) {
                    if (!truthfuls.hasOwnProperty(currentTruth)) return "continue";
                    truthfuls.not[currentTruth] = function (value, value2) {
                        return _this3._runFunction(_this3._truthfuls[currentTruth], currentTruth, value, value2, onWrongFn, true);
                    };
                };

                for (var currentTruth in truthfuls) {
                    var _ret2 = _loop2(currentTruth);

                    if (_ret2 === "continue") continue;
                }

                if (this._innerObject) {
                    var returnVal = {};
                    returnVal[this._innerObject] = truthfuls;
                    return returnVal;
                }

                return truthfuls;
            }
        }, {
            key: "generateExport",


            /**
             * Quick and simple way to create an export so you don't have to type everything.
             * Pretty much useless though...
             * @param {Function} [errorFn] The "on bad stuff" function
             * @returns {EnglishFN|Object}
             */
            value: function generateExport() {
                var _this4 = this;

                var errorFn = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : function () {};

                return function (value) {
                    return _this4.parse(value, errorFn);
                };
            }
        }]);

        return English;
    }();

    ;

    /* THROW AND FORCE */
    (function () {
        var commands = getDefaultEnglishAssertions();

        // throw
        var Throw = new English(commands, "is");
        Throw.throwWhen(English.result().is.correct);
        exports.Throw = function (message) {
            return {
                if: Throw.generateExport(function () {
                    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
                        args[_key] = arguments[_key];
                    }

                    return FunctionTools.throw.apply(FunctionTools, [message].concat(args));
                })
            };
        };

        // force
        var Force = new English(commands, "as");
        exports.Force = Force.generateExport(function () {
            for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
                args[_key2] = arguments[_key2];
            }

            return FunctionTools.throw.apply(FunctionTools, [null].concat(args));
        });
    })();

    /* ASSERT */
    (function () {
        var commandsFromEnglish = getDefaultEnglishAssertions();

        var ohno = function ohno(message, nameAsEnglish, value, value2, not) {
            FunctionTools.throw(exports.yessir.lang(exports.yessir.langGetComparisonName(nameAsEnglish), value, value2, not));
        };

        exports.Assert = {
            true: function _true(value, message) {
                return value === true || ohno(message, "true", value);
            },
            notTrue: function notTrue(value, message) {
                return value !== true || ohno(message, "true", value, null, true);
            },

            false: function _false(value, message) {
                return value === false || ohno(message, "false", value);
            },
            notFalse: function notFalse(value, message) {
                return value !== false || ohno(message, "false", value);
            },

            eTrue: function eTrue(value, message) {
                return !!value || ohno(message, "trueCoerced", value);
            },
            eFalse: function eFalse(value, message) {
                return !value || ohno(message, "falseCoerced", value);
            },

            null: function _null(value, message) {
                return value === null || ohno(message, "null", value);
            },
            notNull: function notNull(value, message) {
                return value !== null || ohno(message, "null", value, null, true);
            },

            undefined: function undefined(value, message) {
                return typeof value === "undefined" || ohno(message, "undefined", value);
            },
            notUndefined: function notUndefined(value, message) {
                return typeof value !== "undefined" || ohno(message, "undefined", value, null, true);
            },

            exists: function exists(value, message) {
                return (typeof value === "undefined" || value === null) && ohno(message, "existant", value);
            },
            doesNotExist: function doesNotExist(value, message) {
                return typeof value === "undefined" || value === null || ohno(message, "existant", value, null, true);
            },

            lengthEqualTo: function lengthEqualTo(value, length, message) {
                return value.length === length || ohno(message, "lengthEqualTo", value, length);
            },
            lengthOver: function lengthOver(value, length, message) {
                return value.length > length || ohno(message, "lengthOver", value, length);
            },
            lengthOverOrEqualTo: function lengthOverOrEqualTo(value, length, message) {
                return value.length >= length || ohno(message, "lengthOverOrEqualTo", value, length);
            },
            lengthUnder: function lengthUnder(value, length, message) {
                return value.length < length || ohno(message, "lengthUnder", value, length);
            },
            lengthUnderOrEqualTo: function lengthUnderOrEqualTo(value, length, message) {
                return value.length <= length || ohno(message, "lengthUnderOrEqualTo", value, length);
            },

            over: function over(value, value2, message) {
                return value > value2 || ohno(message, "over", value, value2);
            },
            overOrEqualTo: function overOrEqualTo(value, value2, message) {
                return value >= value2 || ohno(message, "overOrEqualTo", value, value2);
            },

            under: function under(value, value2, message) {
                return value < value2 || ohno(message, "under", value, value2);
            },
            underOrEqualTo: function underOrEqualTo(value, value2, message) {
                return value <= value2 || ohno(message, "underOrEqualTo", value, value2);
            },

            includes: function includes(value, _includes, message) {
                return value.indexOf(_includes) > -1 || ohno(message, "including", value, _includes);
            }
        };
    })();;

    var FunctionTools = {
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

        throw: function _throw(message, extended) {
            throw new (CustomError("AssertError"))("No, Sir! " + (message ? message + ": " : "") + extended);
        },
        warn: function warn(message, extended) {
            console.warn(new (CustomError("AssertWarn"))("No, Sir! " + (message ? message + ": " : "") + extended));
        },
        log: function log(message, extended) {
            console.log(new (CustomError("AssertLog"))("No, Sir! " + (message ? message + ": " : "") + extended));
        }
    };;

    /* HOPEFULLY AND WARN */
    (function () {
        var commands = getDefaultEnglishAssertions();

        // throw
        var Warn = new English(commands, "is");
        Warn.throwWhen(English.result().is.correct);
        exports.Warn = function (message) {
            return {
                if: Warn.generateExport(function () {
                    for (var _len3 = arguments.length, args = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
                        args[_key3] = arguments[_key3];
                    }

                    return FunctionTools.warn.apply(FunctionTools, [message].concat(args));
                })
            };
        };

        // force
        var Hopefully = new English(commands, "is");
        exports.Hopefully = Hopefully.generateExport(function () {
            for (var _len4 = arguments.length, args = Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
                args[_key4] = arguments[_key4];
            }

            return FunctionTools.warn.apply(FunctionTools, [null].concat(args));
        });
    })();;

    /* IS AND LOG */
    (function () {
        var commands = getDefaultEnglishAssertions();

        // is
        var Is = new English(commands);
        exports.Is = Is.generateExport();

        // log
        var Log = new English(commands, "is");
        Log.throwWhen(English.result().is.correct);
        exports.Log = function (message) {
            return {
                if: Log.generateExport(function () {
                    for (var _len5 = arguments.length, args = Array(_len5), _key5 = 0; _key5 < _len5; _key5++) {
                        args[_key5] = arguments[_key5];
                    }

                    return FunctionTools.log.apply(FunctionTools, [message].concat(args));
                })
            };
        };
    })();;

    (function () {
        var _languages = {
            "EN-gb": {
                // The format to use for parsing the language.
                format: "%value% %comparison% %expected%",

                // The value used if a comparison should NOT happen
                not: "not ",

                // comparisons, pointed to by `db`
                comparisons: {
                    shouldBe: "should %not%be",
                    shouldEvaluateTo: "should %not%evaluate to",

                    shouldBeAn: "should %not%be a(n)",

                    shouldBeOver: "should %not%be over",
                    shouldBeOverOrEqualTo: "should %not%be over or equal to",

                    shouldBeUnder: "should %not%be under",
                    shouldBeUnderOrEqualTo: "should %not%be under or equal to",

                    shouldInclude: "should %not%include"
                },

                // database of comparison types (should be an object of every function used, to define how they work
                db: {
                    true: "shouldBe",
                    false: "shouldBe",

                    trueCoerced: "shouldEvaluateTo",
                    falseCoerced: "shouldEvaluateTo",

                    null: "shouldBe",
                    undefined: "shouldBe",
                    existant: "shouldBe",

                    a: "shouldBeAn",

                    equalTo: "shouldBe",
                    like: "shouldEvaluateTo",

                    lengthEqualTo: "shouldBe",
                    lengthOver: "shouldBeOver",
                    lengthOverOrEqualTo: "shouldBeOverOrEqualTo",
                    lengthUnder: "shouldBeUnder",
                    lengthUnderOrEqualTo: "shouldBeUnderOrEqualTo",

                    over: "shouldBeOver",
                    overOrEqualTo: "shouldBeOverOrEqualTo",

                    under: "shouldBeUnder",
                    underOrEqualTo: "shouldBeUnderOrEqualTo",

                    including: "shouldInclude"
                }
            }
        };
        var _currentLanguage = {
            // default, empty language
            format: "%value% %comparison% %expected%",

            not: "not ",

            comparisons: {
                shouldEvaluateTo: "should %not%evaluate to"
            }
        };

        function setLanguage(languages) {
            var FormatError = CustomError("FormatError");

            // loop through the languages
            var langAmnt = 0;
            for (var languageName in languages) {
                if (!languages.hasOwnProperty(languageName)) continue;

                if (IS_BROWSER) console.log("Yes-Sir: Loading language:", languageName);

                langAmnt++;

                if (languageName.length !== 5) throw new FormatError("Invalid language format.");
                if (languageName.indexOf("-") !== 2) throw new FormatError("Invalid language format");

                if (!(languages[languageName] instanceof Object)) FunctionTools.throw("Language is in the wrong format", languages[languageName] + " must be an Object");

                if (!(typeof _languages[languageName] === "undefined" || _languages[languageName] === null)) FunctionTools.throw("Language already exists", _languages[languageName] + " must not exist");

                _languages[languageName] = languages[languageName];
            }

            if (IS_BROWSER && langAmnt === 0) {
                console.warn("Yes-Sir: A language pack loaded zero (0) languages.\n" + "         " + "As this is probably an error, you should put an issue on the creator's page.");
            }
        }

        function getLanguage(comparisonName, value, expected, useNot) {
            if (typeof _currentLanguage.db === "undefined") console.warn("It seems like no language has been set! It is recommended" + " that you always load one before doing any assertions!");

            if (typeof _currentLanguage.format !== "string") throw new ReferenceError("No format has been set");
            if (typeof comparisonName !== "string") throw new TypeError("Comparison name must be a string");

            var comparison = _currentLanguage.comparisons[comparisonName];
            if (typeof comparison !== "string") throw new TypeError("Invalid comparison name");

            var format = _currentLanguage.format;
            var not = _currentLanguage.not,
                an = _currentLanguage.an;

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
            set: function set(languages) {
                return setLanguage(languages);
            },

            /**
             * Gets the current language
             * @getter
             */
            get: function get() {
                return function (comparisonName, value, expected, useNot) {
                    return getLanguage(comparisonName, value, expected, useNot);
                };
            }
        });

        defineExportProperty("langGetComparisonName", {
            get: function get() {
                return function (truthName) {
                    if (!_currentLanguage.db) return "shouldEvaluateTo";
                    return _currentLanguage.db[truthName] || "shouldEvaluateTo";
                };
            }
        });

        exports.yessir.setLanguage = function (name) {
            if (typeof name === "undefined" || name === null) FunctionTools.throw("Argument `name`", name + " must exist");

            var FormatError = CustomError("FormatError");

            if (name.length !== 5) throw new FormatError("Invalid language format.");
            if (name.indexOf("-") !== 2) throw new FormatError("Invalid language format.");

            if (typeof _languages[name] === "undefined" || _languages[name] === null) FunctionTools.throw("Unknown language name", _languages[name] + " must exist");

            _currentLanguage = _languages[name];
        };
    })();

    // Export Yes-Sir
    if (typeof noGlobal === "undefined") {
        // adds Exports object to window and sets window.YesSirNoConflict
        for (var current in exports) {
            if (!exports.hasOwnProperty(current)) continue;
            window[current] = exports[current];
        }

        /**
         * Returns the Yes-Sir object
         * @returns {Object} Yes-Sir object
         */
        window.YesSirNoConflict = function () {
            return exports;
        };
    } /* else if (typeof module === "object" && typeof module.exports === "object") {
         exports.loadLanguage = function(location, languageName) {
             require(location);
             exports.setLanguage(languageName);
         };
      }*/

    return exports;
});
