/**
 * Copyright (c) 2017, zoweb
 *
 * See the license in the LICENSE file (downloaded with this repository, in the root folder)
 * By using this code, you agree to the license in the file specified (the MIT license)
 */

function getDefaultEnglishAssertions() {
    return {
        true: value => value === true,
        false: value => value === false,

        trueCoerced: value => !!value,
        falseCoerced: value => !value,

        null: value => value === null,
        undefined: value => typeof value === "undefined",
        existant: value => !(typeof value === "undefined" || value === null),

        a: (value, type) => typeof type === "string"
            ? typeof value === type
            : value instanceof type,

        equalTo: (value, value2) => value === value2,
        like: (value, value2) =>  value == value2,

        lengthEqualTo: (value, length) => value.length === length,
        lengthOver: (value, length) => value.length > length,
        lengthOverOrEqualTo: (value, length) => value.length >= length,
        lengthUnder: (value, length) => value.length < length,
        lengthUnderOrEqualTo: (value, length) => value.length <= length,

        over: (value, value2) => value > value2,
        overOrEqualTo: (value, value2) => value >= value2,

        under: (value, value2) => value < value2,
        underOrEqualTo: (value, value2) => value <= value2,

        including: (value, includes) => value.indexOf(includes) > -1
    };
}