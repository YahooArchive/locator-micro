/*
 * Copyright (c) 2013, Yahoo! Inc.  All rights reserved.
 * Copyrights licensed under the New BSD License.
 * See the accompanying LICENSE.txt file for terms.
 */

/*jslint nomen:true, node:true */

"use strict";

module.exports = function (bundleName, templateName, moduleName, compiled) {

    return [
        'YUI.add("' + moduleName + '",function(Y, NAME){',
        '   var fn = Y.Template.Micro.revive(' + compiled + ');',
        '   Y.Template.register("' + bundleName + '/' + templateName + '", fn);',
        '}, "", {requires: ["template-base", "template-micro"]});'
    ].join('\n');

};
