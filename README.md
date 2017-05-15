![Logo](https://cdn.rawgit.com/Zoweb/Yes-Sir/e6884de2/logo.png)


JavaScript Assertion Library
----------------------------

Have you ever wanted a nice and simple assertion library?<br/>
*Yes, sir!*<br/>
Do you want it to be easy to understand and use?<br/>
*Yes, sir!*<br/>
Do you want it to be multi-lingual?<br/>
*Um, I guess, sir!*<br/>
Well, that's good enough for me. Let's get into the intro.<br/>

## Yes-Sir is an assertion library.

But, not your usual assertion library. Unless you want it to be.<br/>
It's also got an simple and intuitive "is" system to make all the inevitable `if` statements in your code easier to read
and write.<br/>
Using its assertion system, you can check that an argument exists (or not) or if it is a `String`, for example. And, if
it isn't, Yes-Sir will automatically throw an error. *"No, sir"*

All functions in Yes-Sir return true if they completed successfully and false if not.

### Lets check out that "is" system:
It uses an English-like structure, mixed with a JavaScript-y style. To start a "sentence", just type `Is([value])`. You
can then do your checks, and see if they are correct:

    // is xx a
    Is(10).a(Object) // returns false
    Is({}).a(Object) // returns true
    Is("").a("string") // returns true
    Is("").a(Array) // returns false

    // is xx true
    Is("10").true() // returns false
    Is(true).true() // returns true

    // is xx not xx
    Is(10).not.a(Object) // returns true
    Is("").not.a("string") // returns false

However, this will not do anything except for return `true` or `false`. If you want the function to automatically log
any errors to the console, you can use `Log(message).if(value).xxx`:

    // log "oh no" if xx is a
    Log("oh no").if(10).is.a(Object) // returns false
    Log("oh no").if({}).is.a(Object) // returns true; logs "oh no"
    Log("oh no").if("").is.a("string") // returns true; logs "oh no"
    Log("oh no").if("").is.a(Array) // returns false
    
    // log "its true" if xx is true
    Log("its true").if("10").is.true() // returns false
    Log("its true").if(true).is.true() // returns true; logs "its true
    
    // log "it isnt" if xx is not xx
    Log("it isnt").if(10).is.not.a(Object) // returns true; logs "it isnt"
    Log("it isnt").if("").is.not.a("string") // returns false

This system (and its "parser") I have named "English". (Yes. Very original.)

### And also the assertion system
There are two ways that the assertion system can be used. Like above, and like normal.

To use it like above, use `Force`:

    Force(10).as.true() // AssertError: 10 must be true
       // [with EN-gb set as the current language]

    Force(true).as.true() // nothing

    Force(true).as.false() // AssertError: 10 must be false
       // [with EN-gb set as the current language]

    Force(true).as.not.false() // nothing

    Force(true).as.a("string"); // AssertError: true must be a(n) string
       // [with EN-gb set as the current language]
       
or `Throw` (like `Log`) if you want to throw an error with a custom message

    Throw("oh no").if(true).is.true() // AssertError: oh no: true must not be true
       // [with EN-gb set as the current language]

Or you can just warn to the console (not throw an error)

    Hopefully(true).is.false() // [warn] AssertWarn: true should be false
       // [with EN-gb set as the current language]
       
    Warn("just a warning").if(true).is.true() // [warn] AssertWarn: just a warning: true should not be true

You can also use it like a normal assertion library:

    Assert.true(10, "oh no"); // AssertError: oh no: 10 must be true
       // [with EN-gb set as the current language]
       // Much shorter than English, but harder to understand

    Assert.true(10); // AssertError: 10 must be true
       // [with EN-gb set as the current language]
       // Removing the second argument just removes the message

`Hopefully` cannot be used in this form, however.

## But how do I get it?

It's simple. Just:
1. Download it off [the website](http://static.zoweb.me/yes-sir/#download)
2. Include it: `<script src="/path/to/yes-sir.js"></script>`
3. Include a language: `<script src="/path/to/yes-sir.lang.js"></script>`
4. Set the current language: `yessir.setLanguage(language:ISOLanguage)` (e.g. language could be `EN-gb`)
5. You're ready to rock and roll!

## Everything included

 - `Is(value:*)`:
	 - `true()`: checks if the value is exactly equal to true
	 - `false()`: checks if the value is exactly equal to false

	 - `trueCoerced()`: checks if the value is "like" true (so 10 == true, 0 doesn't)
	 - `falseCoerced()`: checks if the value is "like" false (so "" == false, "foo" doesn't)

	 - `null()`: checks if the value is null
	 - `undefined()`: checks if the value is undefined (using `typeof`, not `===`)

	 - `a(type:String)`: checks if the `typeof [value]` is `type`
	 - `a(type:Constructor)`: checks if the `value` is an `instanceof [type]`

	 - `equalTo(value2:*)`: checks if the `value` is exactly equal to `value2`
	 - `like(value2:*)`: checks if the `value` is like (`==`) `value2` (`10 == true`, `"" == false`). May cause
	 unexpected type coercion.

	- `lengthEqualTo(length:Number)`: checks if `value`'s length is equal to `length`
	- `lengthOver(length:Number)`: checks if `value`'s length is over `length`
	- `lengthOverOrEqualTo(length:Number)`: checks if `value`'s length is over or equal to `length`
	- `lengthUnder(length:Number)`: checks if `value`'s length is under `length`
	- `lengthUnderOrEqualTo(length:Number)`: checks if `value`'s length is under or equal to `length`

	- `over(value2:Number)`: checks if `value` is over `value2`
	- `overOrEqualTo(value2:Number)`: checks if `value` is over or equal to `value2`

	- `under(value2:Number)`: checks if `value` is under `value2`
	- `underOrEqualTo(value2:Number)`: checks if `value` is under or equal to `value2`

	- `including(includes:*)`: checks if `value` includes `includes`

	 - `(value2:*)`: This line is confusing. It means `Is(value)(value2)`. Alias for `Is(value).equalTo(value2)`

	 - `not.***`: Includes all functions above, but reverses their output (so `Is(10).not.true()` returns `true`)
	 - `not(value2:*)`: Alias for `Is(value).not.equalTo(value2)`

 - All of the above functions are also returned by `Force(value:*).as.***` and `Hopefully(value:*).is.***` (and their message counterparts), however
 these throw errors and warnings respectively.

 - `Assert`:
	 - `like(value:*, expected:*, message:String)`: checks if the `value` is like (`==`) `value2` (`10 == true`,
	 `"" == false`) and throws `message` if not. May cause unexpected type coercion.

	 - `equal(value:*, expected:*, message:String)`: checks if `value` is exactly equal to `value2` and throws `message`
	 if not.
	 - `notEqual(value:*, notExpected:*, message:String)`: checks if `value` is not exactly equal to `value2`. Throws
	 `message` if this condition is not met.

	 - `null(value:*, message:String)`: checks if `value` is `null` and throws `message` if not.
	 - `notNull(value:*, message:String)`: checks if `value` is not `null`. Throws `message` if this condition is not met.

	 - `existant(value:*, message:String)`: checks if `value` is not null and not undefined. Throws `message` if this
	 condition is not met.
	 - `notExistant(value:*, message:String)`: checks if `value` is null or undefined and throws `message` if not.

	 - `true(value:*, message:String)`: checks if `value` is true and throws `message` if not.
	 - `false(value:*, message:String)`: checks if `value` is false and throws `message` if not.

	 - `eTrue(value:*, message:String)`: checks if `value` evaluates to true (`10 == true`, `0` doesn't) and throws
	 `message` if not
	 - `eFalse(value:*, message:String)`: checks if `value` evaluates to false (`"" == false"`, `"foo"` doesn't) and
	 throws `message` if not

	 - `typeOf(value:*, type:String, message:String)`: checks if `typeof [value]` is `type` and if not, throws `message`
	 - `typeOf(value:*, type:Constructor, message:String)`: checks if `value` is an `instanceof [type]` and if not,
	 throws `message`

## Language Packs
Yes-Sir includes the capability for multi-linguistics! To create a language, (after loading `yes-sir.js`), set
`window.yessir.lang` to an object like the following:

For example,

    window.yessir.lang = {
        "EN-gb": { // the language name, by ISO specs
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
        },
        "EN-us": { ... }
    };
(which is the quick `EN-gb` language that I made)

*See above for how to include a language*
