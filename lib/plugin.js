/*
 * Copyright (c) 2013, Yahoo! Inc.  All rights reserved.
 * Copyrights licensed under the New BSD License.
 * See the accompanying LICENSE.txt file for terms.
 */

/*jslint nomen:true, node:true */

"use strict";

var Micro = require('yui/template-micro').Template.Micro,
    libfs = require('fs'),
    libpath = require('path'),
    description = require('../package.json').description;

function PluginClass(config) {

    config = config || {};
    config.micro = config.micro || Micro;

    this.describe = {
        summary: description,
        extensions: ['micro'],
        options: config
    };

}

PluginClass.prototype = {

    fileUpdated: function (evt, api) {

        var file = evt.file,
            source_path = file.fullPath,
            bundleName = file.bundleName,
            templateName = libpath.basename(file.relativePath, '.' + file.ext),
            moduleName = bundleName + '-templates-' + templateName,
            destination_path = moduleName + '.js',
            micro = this.describe.options.micro,
            format = this.describe.options.format;

        return api.promise(function (fulfill, reject) {

            // TODO: make this async
            var source = libfs.readFileSync(source_path, 'utf8'),
                precompiled,
                compiled;

            try {
                compiled = micro.compile(source);
                precompiled = micro.precompile(source);
            } catch (e) {
                throw new Error('Error parsing micro template: ' +
                        file.relativePath + '. ' + e);
            }

            // provisioning the template entries for server side use
            // in a form of a compiled function
            evt.bundle.template = evt.bundle.template || {};
            evt.bundle.template[templateName] = compiled;

            if (format) {
                // trying to write the destination file which will fulfill or reject the initial promise
                api.writeFileInBundle(bundleName, destination_path,
                    require('./formats/' + format)(bundleName, templateName, moduleName, precompiled))
                    .then(fulfill, reject);
            } else {
                fulfill();
            }

        });

    }

};

module.exports = PluginClass;
