/*!
 * Yes-Sir EN-gb language
 */
(function(yessir) {
    if (!yessir) throw new Error("Yes-Sir needs to be loaded before loading a language pack!");

    yessir.lang = {
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
}(typeof window === "object" ? window.yessir : module.exports));