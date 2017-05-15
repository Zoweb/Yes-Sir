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
        module.exports = global.document ? factory(global, true) : function (w) {
            return factory(w);
        };
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

    /**
     * Creates an error with a custom name
     * @param {String} errorName The name of the error
     * @returns {{new(*=): {}}}
     */
    function CustomError(errorName) {
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
        function English() {
            _classCallCheck(this, English);

            this._truthfuls = {};
            this._rootTruthful = function (value, value2) {
                return value === value2;
            };
        }

        /**
         * Adds a truthful function
         * @param {String} name The name that is used as xx.[name]
         * @param {Function} fn The function to be run to calculate the value
         */


        _createClass(English, [{
            key: "setTruthful",
            value: function setTruthful(name, fn) {
                this._truthfuls[name] = fn;
            }
        }, {
            key: "setRootTruthful",


            /**
             * Sets the root truthful function, to be used as xx(value1, value2)
             * @param {RootTruthfulCallback} fn
             */
            value: function setRootTruthful(fn) {
                this._rootTruthful = fn;
            }
        }, {
            key: "_getTruthfuls",
            value: function _getTruthfuls(value, onWrongFn) {
                var _this2 = this;

                var truth = function truth(value2) {
                    return _this2._rootTruthful(value, value2);
                };

                var _loop = function _loop(currentTruth) {
                    if (!_this2._truthfuls.hasOwnProperty(currentTruth)) return "continue";
                    truth[currentTruth] = function (value2) {
                        var hasCompleted = _this2._truthfuls[currentTruth](value, value2);
                        return {
                            else: function _else(message) {
                                return onWrongFn(message, value, value2, exports.yessir.lang[currentTruth]);
                            },
                            asValue: function asValue() {
                                return onWrongFn(null, value, value2, exports.yessir.lang[currentTruth]);
                            }
                        };
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
             * @param {Function} onWrongFn The on bad stuff function
             * @returns {EnglishFN} The truthful function
             */
            value: function parse(value, onWrongFn) {
                var _this3 = this;

                var truthfuls = this._getTruthfuls(value);

                // set up truthfuls.not, by inverting all outputs
                truthfuls.not = function (value2) {
                    return !_this3._rootTruthful(value, value2);
                };

                var _loop2 = function _loop2(currentTruth) {
                    if (!truthfuls.hasOwnProperty(currentTruth)) return "continue";
                    truthfuls.not[currentTruth] = function () {
                        return truthfuls[currentTruth].apply(truthfuls, arguments);
                    };
                };

                for (var currentTruth in truthfuls) {
                    var _ret2 = _loop2(currentTruth);

                    if (_ret2 === "continue") continue;
                }

                return truthfuls;
            }
        }]);

        return English;
    }();

    ;

    var FunctionTools = {
        defaultMessage: function defaultMessage(message, value, expected) {
            if (typeof message !== "string") message = "%value% must equal %expected%";
            if (typeof message === "function") expected = expected.name;

            return message.replace(/%value%/g, value).replace(/%expected%/g, expected);
        },

        throw: function _throw(message, value, expected, extended) {
            throw new CustomError("AssertError")((message ? message + ": " : "") + FunctionTools.defaultMessage(extended, value, expected));
        },
        warn: function warn(message, value, expected, extended) {
            console.warn(CustomError("AssertWarn")((message ? message + ": " : "") + FunctionTools.defaultMessage(extended, value, expected)));
        },
        log: function log(message, value, expected, extended) {
            console.log(CustomError("AssertLog")((message ? message + ": " : "") + FunctionTools.defaultMessage(extended, value, expected)));
        }
    };;

    (function () {
        var is = {
            true: function _true() {
                return value === true;
            },
            false: function _false() {
                return value === false;
            },

            trueCoerced: function trueCoerced() {
                return !!value;
            },
            falseCoerced: function falseCoerced() {
                return !value;
            },

            null: function _null() {
                return value === null;
            },
            undefined: function undefined() {
                return typeof value === "undefined";
            },

            a: function a(type) {
                return typeof type === "string" ? (typeof value === "undefined" ? "undefined" : _typeof(value)) === type : value instanceof type;
            },

            equalTo: function equalTo(value2) {
                return value === value2;
            },
            like: function like(value2) {
                return value == value2;
            }
        };

        var engr = new English();
        var exported = function exported(value) {
            return engr.parse(value, FunctionTools.log);
        };
        exported.set = function (name) {
            return { to: function to(val) {
                    return is[name] = val;
                } };
        };
    })();;

    (function () {
        var _languages = {};
        var _currentLanguage = {};

        defineExportProperty("lang", {
            /**
             * Adds a language
             * @param languages The language to add
             * @setter
             */
            set: function set(languages) {
                var FormatError = CustomError("FormatError");

                // loop through the languages
                var langAmnt = 0;
                for (var languageName in languages) {
                    if (!languages.hasOwnProperty(languageName)) continue;

                    if (IS_BROWSER) console.log("Yes-Sir: Loading language:", languageName);

                    langAmnt++;

                    if (languageName.length !== 5) throw new FormatError("Invalid language format.");
                    if (languageName.indexOf("-") !== 2) throw new FormatError("Invalid language format");

                    if (!(languages[languageName] instanceof Object)) FunctionTools.throw("Language is in the wrong format", languages[languageName], "Object", "%value% must be an %extended%");

                    if (!(typeof _languages[languageName] === "undefined" || _languages[languageName] === null)) FunctionTools.throw("Language already exists", _languages[languageName], null, "%value% must not exist");

                    _languages[languageName] = languages[languageName];
                }

                if (IS_BROWSER && langAmnt === 0) {
                    console.warn("Yes-Sir: A language pack loaded zero (0) languages.\n" + "         " + "As this is probably an error, you should put an issue on the creator's page.");
                }
            },

            /**
             * Gets the current language
             * @getter
             */
            get: function get() {
                return _currentLanguage;
            }
        });

        exports.yessir.setLanguage = function (name) {
            if (typeof name === "undefined" || name === null) FunctionTools.throw("Argument `name`", name, null, "%value% must exist");

            var FormatError = CustomError("FormatError");

            if (name.length !== 5) throw new FormatError("Invalid language format.");
            if (name.indexOf("-") !== 2) throw new FormatError("Invalid language format.");

            if (typeof _languages[name] === "undefined" || _languages[name] === null) FunctionTools.throw("Unknown language name", _languages[name], null, "%value% must exist");

            _currentLanguage = _languages[name];
        };
    })();

    // Export Yes-Sir
    if (typeof noGlobal === "undefined") {
        for (var current in exports) {
            if (!exports.hasOwnProperty(current)) continue;
            window[current] = exports[current];
        }
    }

    return exports;
});
