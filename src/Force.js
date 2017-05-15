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
}());