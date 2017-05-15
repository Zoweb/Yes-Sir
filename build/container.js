/*!
 * Copyright (c) 2017, zoweb
 *
 * See the license in the LICENSE file (downloaded with this repository, in the root folder)
 * By using this code, you agree to the license in the file specified (the MIT license)
 */

(function (global, factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        module.exports = global.document ?
            factory(global, true) :
            w => factory(w);
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

%PAGE_CONTENTS%


// Export Yes-Sir
if (typeof noGlobal === "undefined") {
    for (let current in exports) {
        if (!exports.hasOwnProperty(current)) continue;
        window[current] = exports[current];
    }
}

return exports;
}));