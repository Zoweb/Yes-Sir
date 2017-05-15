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