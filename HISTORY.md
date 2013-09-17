Locator Micro Change History
============================

@NEXT@

* the plugin is now a class definition that can be extended easily.
* leverage `Y.Template.register()` and `Y.Template.get()`, available in yui@3.12.x.
* a compiled version of the template is provisioned under the bundle object for runtime on the server side.
* yui output format is now opt-in.
* example does not use `express-yui` anymore, instead it uses `express-view`.
* the `micro` component can be controlled from outside by providing a custom version of it when creating an instance of the plugin.

0.1.1 (2013-09-16)

* relaxing the yui dependency to support 3.x.

0.1.0 (2013-06-27)
------------------

* example
* docs
* basic test structure

0.0.1 (2013-06-24)
------------------

* Initial release.
