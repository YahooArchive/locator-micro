locator-micro
=============

Micro template compiler for locator.

[![Build Status](https://travis-ci.org/yahoo/locator-micro.png?branch=master)](https://travis-ci.org/yahoo/locator-micro)

This component can be integrated with [Locator][] component from Yahoo! to compile [Micro][]' templates. The compiled templates could be used on the server thru `express-view` and on the client thru a module loader depending on the format you decide to compile to, by default it supports [YUI][] format to be able to use the templates with [YAF][].

The beauty of this is that you will NOT need to download the full `micro` parser component or the template itself, instead you use a loader to load modules that will provision the micro templates in a form of javascript functions ready to be execute to produce a html fragment.

[Micro]: http://yuilibrary.com/yui/docs/template/
[Locator]: https://github.com/yahoo/locator
[YUI]: https://github.com/yui/yui3
[YAF]: http://yuilibrary.com/yui/docs/app/


Installation
------------

Install using npm:

```shell
$ npm install locator-micro
```

By installing the module in your express application folder, you should be able to use it thru [Locator][].


Usage
-----

### Integration with `locator`

You can create an instance of the plugin and plug it into the locator instance, and locator will be able to analyze every file in your express app, and it will compile any `*.micro` into memory, making them available thru `express-view`.

Optionally, it will be able to compile it into the locator build folder using one of the supported output format (for now it supports `yui`, but in the future will support `amd` and `es6` as well).

The example below describes how to use the yui plugin with locator:

```
var Locator = require('locator'),
    LocatorMicro = require('locator-micro'),
    loc = new Locator();

// using locator-micro plugin
loc.plug(new LocatorMicro({ format: '<optional-output-format>' }));

### Integration with `express`, `express-view` and `yui`

You can try a working example here:

https://github.com/yahoo/locator-micro/tree/master/example

This example explores how to use `locator-micro` on the server side with `express` and `express-view`, while using `yui` on the client side as a medium to load the compiled templates on demand to refresh parts of the page without hitting the server to render the templates.


License
-------

This software is free to use under the Yahoo! Inc. BSD license.
See the [LICENSE file][] for license text and copyright information.

[LICENSE file]: https://github.com/yahoo/locator-micro/blob/master/LICENSE.txt


Contribute
----------

See the [CONTRIBUTE file][] for info.

[CONTRIBUTE file]: https://github.com/yahoo/locator-micro/blob/master/CONTRIBUTE.md
