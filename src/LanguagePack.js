(function() {
    let _languages = {
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
    let _currentLanguage = {
        // default, empty language
        format: "%value% %comparison% %expected%",

        not: "not ",

        comparisons: {
            shouldEvaluateTo: "should %not%evaluate to"
        },
    };

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
                FunctionTools.throw("Language is in the wrong format", languages[languageName] + " must be an Object");

            if (!(typeof _languages[languageName] === "undefined" || _languages[languageName] === null))
                FunctionTools.throw("Language already exists", _languages[languageName] + " must not exist");

            _languages[languageName] = languages[languageName];
        }

        if (IS_BROWSER && langAmnt === 0) {
            console.warn("Yes-Sir: A language pack loaded zero (0) languages.\n" +
                "         " +
                "As this is probably an error, you should put an issue on the creator's page.");
        }
    }

    function getLanguage(comparisonName, value, expected, useNot) {
        if (typeof _currentLanguage.db === "undefined") console.warn("It seems like no language has been set! It is recommended" +
            " that you always load one before doing any assertions!");

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
            if (!_currentLanguage.db) return "shouldEvaluateTo";
            return _currentLanguage.db[truthName] || "shouldEvaluateTo"
        }
    });

    exports.yessir.setLanguage = name => {
        if (typeof name === "undefined" || name === null)
            FunctionTools.throw("Argument `name`", name + " must exist");

        const FormatError = CustomError("FormatError");

        if (name.length !== 5) throw new FormatError("Invalid language format.");
        if (name.indexOf("-") !== 2) throw new FormatError("Invalid language format.");

        if (typeof _languages[name] === "undefined" || _languages[name] === null)
            FunctionTools.throw("Unknown language name", _languages[name] + " must exist");

        _currentLanguage = _languages[name];
    };
}());