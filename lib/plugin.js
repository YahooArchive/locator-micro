/*
 * Copyright (c) 2013, Yahoo! Inc.  All rights reserved.
 * Copyrights licensed under the New BSD License.
 * See the accompanying LICENSE.txt file for terms.
 */

/*jslint nomen:true, node:true */

"use strict";

var Micro = require('yui/template-micro').Template.Micro,
    libfs = require('fs'),
    libpath = require('path');

module.exports = {

    describe: {
        summary: 'Compile micro templates to yui modules',
        extensions: ['micro'],
        options: {}
    },

    fileUpdated: function (evt, api) {

        var self = this,
            file = evt.file,
            source_path = file.fullPath,
            bundleName = file.bundleName,
            templateName = libpath.basename(file.relativePath, '.' + file.ext),
            moduleName = bundleName + '-templates-' + templateName,
            destination_path = moduleName + '.js';

        return api.promise(function (fulfill, reject) {

            // TODO: make this async
            var source = libfs.readFileSync(source_path, 'utf8'),
                precompiled = Micro.precompile(source, self.describe.options || {}),
                compiled = Micro.compile(source, self.describe.options || {});

            // provisioning the template entries for server side use
            // in a form of a compiled function
            evt.bundle.templates = evt.bundle.templates || {};
            evt.bundle.templates[templateName] = compiled;

            // trying to write the destination file which will fulfill or reject the initial promise
            api.writeFileInBundle(bundleName, destination_path,
                self._wrapAsYUI(bundleName, templateName, moduleName, precompiled))
                .then(function () {

                    // provisioning the module to be used on the server side automatically
                    // TODO: this method of provision server side stuff is deprecated, and
                    // should be removed as soon as express-yui and express-view get ready!
                    evt.bundle.useServerModules = evt.bundle.useServerModules || [];
                    evt.bundle.useServerModules.push(moduleName);

                    // we are now ready to roll
                    fulfill();
                }, reject);

        });

    },

    _wrapAsYUI: function (bundleName, templateName, moduleName, compiled) {

        return [
            'YUI.add("' + moduleName + '",function(Y, NAME){',
            '   var fn = Y.Template.Micro.revive(' + compiled + '),',
            '       cache = Y.Template._cache = Y.Template._cache || {};',
            '   cache["' + bundleName + '/' + templateName + '"] = function (data) {',
            '       return fn(data);',
            '   };',
            '}, "", {requires: ["template-micro"]});'
        ].join('\n');

    }

};