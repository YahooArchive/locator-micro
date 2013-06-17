/*
 * Copyright (c) 2013, Yahoo! Inc.  All rights reserved.
 * Copyrights licensed under the New BSD License.
 * See the accompanying LICENSE.txt file for terms.
 */

/*jslint nomen:true, node:true, stupid: true */

"use strict";

var Micro = require('yui/template-micro').Template.Micro,
    libfs = require('fs'),
    libpath = require('path');

function getNameParts(bundleName, path, ext) {
    var parts = [bundleName];
    parts = parts.concat(libpath.dirname(path).split(libpath.sep));
    parts.push(libpath.basename(path, ext ? '.' + ext : ext));
    return parts;
}

module.exports = {

    describe: {
        summary: 'Micro compiler plugin',
        extensions: ['micro'],
        options: {}
    },

    fileUpdated: function (evt, api) {

        var self = this,
            file = evt.file,
            ext = file.ext,
            source_path = file.fullPath,
            relative_path = file.relativePath,
            bundleName = file.bundleName,
            name = getNameParts(bundleName, relative_path, ext).join('-'),
            id = getNameParts(bundleName, relative_path, ext).join('/'),
            destination_path = name + '.js';

        return api.promise(function (fulfill, reject) {

            // TODO: make this async
            var compiled = Micro.precompile(libfs.readFileSync(source_path, 'utf8'), self.describe.options || {});

            // trying to write the destination file which will fulfill or reject the initial promise
            api.writeFileInBundle(bundleName, destination_path,
                self._wrapAsYUI(name, id, libpath.join(bundleName, relative_path), compiled))
                .then(fulfill, reject);

        });

    },

    _wrapAsYUI: function (name, id, path, compiled) {

        return [
            'YUI.add("' + name + '",function(Y, NAME){',
            '   var fn = Y.Template.Micro.revive(' + compiled + '),',
            '       cache = Y.Template._cache = Y.Template._cache || {};',
            '   cache["' + path + '"] = cache[NAME] = cache["' + id + '"] = function (data) {',
            '       return fn(data);',
            '   };',
            '}, "", {requires: ["template-micro"]});'
        ].join('\n');

    }

};