/**
 * Copyright (c) 2017, zoweb
 *
 * See the license in the LICENSE file (downloaded with this repository, in the root folder)
 * By using this code, you agree to the license in the file specified (the MIT license)
 */

const fs = require("fs");

module.exports = function(grunt) {
    grunt.initConfig({

        concat: {
            options: {
                separator: ";\n\n"
            },
            dist: {
                src: ["src/*.js"],
                dest: "dist/concat.js"
            }
        },

        babel: {
            options: {
                sourceMap: false,
                presets: ["babel-preset-env"]
            },
            dist: {
                files: {
                    "dist/yes-sir.js": "dist/yes-sir.es6.js"
                }
            }
        },

        uglify: {
            options: {
                banner: `/*! Yes-Sir by zoweb
 * Compiled: <%= grunt.template.today("dd-mm-yyyy") %>
 * 
 * Licenced under the MIT licence, (c) zoweb and other contributors 2017
 */

`,
                sourceMap: true,
                sourceMapName: "dist/yes-sir.map"
            },
            dist: {
                files: {
                    "dist/yes-sir.min.js": "dist/yes-sir.js"
                }
            }
        }

    });

    grunt.loadNpmTasks("grunt-contrib-concat");
    grunt.loadNpmTasks("grunt-contrib-handlebars");
    grunt.loadNpmTasks("grunt-contrib-uglify");
    grunt.loadNpmTasks("grunt-babel");

    grunt.registerTask("insert", function() {
        let container = fs.readFileSync("build/container.js").toString();
        let innards = fs.readFileSync("dist/concat.js").toString();

        container = container.replace(/\/\/ %PAGE_CONTENTS%/g, innards);

        fs.writeFileSync("dist/yes-sir.es6.js", container);
    });
    grunt.registerTask("delete", function() {
        fs.unlinkSync("dist/concat.js");
    });
    grunt.registerTask("info", function() {
        let file = fs.readFileSync("dist/yes-sir.js").toString();
        let fileEs6 = fs.readFileSync("dist/yes-sir.es6.js").toString();
        let fileMin = fs.readFileSync("dist/yes-sir.min.js").toString();

        console.log(`\n\nyes-sir.js:
    Minified: false
    ES6: false
    Size: ${file.length} chars (~${(file.length / 1000).toFixed(2)}KB)
    Length: ${file.split("\n").length} lines
    Percentages:
        Of yes-sir.es6.js: ${Math.round(file.length / fileEs6.length * 100)}%
        Of yes-sir.min.js: ${Math.round(file.length / fileMin.length * 100)}%`);

        console.log(`yes-sir.es6.js:
    Minified: false
    ES6: true
    Size: ${fileEs6.length} chars (~${(fileEs6.length / 1000).toFixed(2)}KB)
    Length: ${fileEs6.split("\n").length} lines
    Percentages:
        Of yes-sir.js: ${Math.round(fileEs6.length / file.length * 100)}%
        Of yes-sir.min.js: ${Math.round(fileEs6.length / fileMin.length * 100)}%`);

        console.log(`yes-sir.min.js:
    Minified: true
    ES6: false
    Size: ${fileMin.length} chars (~${(fileMin.length / 1000).toFixed(2)}KB)
    Length: ${fileMin.split("\n").length} lines
    Percentages:
        Of yes-sir.es6.js: ${Math.round(fileMin.length / fileEs6.length * 100)}%
        Of yes-sir.js: ${Math.round(fileMin.length / file.length * 100)}%`);

        console.log("\n\nYes-Sir has been built!")
    });

    console.log("\n\n\n\n\n");

    console.log("Building...\n\n");

    console.log(" __     __              _____ _      \n" +
        " \\ \\   / /             / ____(_)     \n" +
        "  \\ \\_/ /__  ___ _____| (___  _ _ __ \n" +
        "   \\   / _ \\/ __|______\\___ \\| | '__|\n" +
        "    | |  __/\\__ \\      ____) | | |   \n" +
        "    |_|\\___||___/     |_____/|_|_|   \n" +
        "                                     \n" +
        "                                     \n" +
        "          assertion library\n" +
        "           (c) zoweb 2017\n\n\n");

    grunt.registerTask("default", ["concat", "insert", "babel", "uglify", "delete", "info"]);
    grunt.registerTask("build", ["default"])
};