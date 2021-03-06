/*
 * Copyright (c) 2013, Yahoo! Inc.  All rights reserved.
 * Copyrights licensed under the New BSD License.
 * See the accompanying LICENSE.txt file for terms.
 */


/*jslint nomen:true, node:true */
/*globals describe,it */

"use strict";

var libpath = require('path'),
    libfs = require('fs'),
    mockery = require('mockery'),
    expect = require('chai').expect,
    Plugin = require('../../lib/plugin.js');

describe('plugin', function () {

    describe('instance', function () {

        // we nee to write some tests here!
        it('extensions', function () {
            expect(new Plugin().describe.extensions[0]).to.equal('micro');
        });

    });

});
