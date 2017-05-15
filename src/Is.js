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
}());