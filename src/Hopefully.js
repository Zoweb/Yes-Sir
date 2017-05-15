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
}());