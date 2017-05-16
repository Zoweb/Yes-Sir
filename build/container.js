/*!
 * Copyright (c) 2017, zoweb
 *
 * See the license in the LICENSE file (downloaded with this repository, in the root folder)
 * By using this code, you agree to the license in the file specified (the MIT license)
 */

(function (global, factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        module.exports = factory(module.exports, true);
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


// %PAGE_CONTENTS%


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
}/* else if (typeof module === "object" && typeof module.exports === "object") {
    exports.loadLanguage = function(location, languageName) {
        require(location);
        exports.setLanguage(languageName);
    };
}*/

return exports;
}));