# webpack-resolve-in-paths-plugin

[![Coverage Status](https://coveralls.io/repos/github/dimanech/webpack-resolve-in-paths-plugin/badge.svg?branch=master)](https://coveralls.io/github/dimanech/webpack-resolve-in-paths-plugin?branch=master)
[![Greenkeeper badge](https://badges.greenkeeper.io/dimanech/webpack-resolve-in-paths-plugin.svg)](https://greenkeeper.io/)
[![Known Vulnerabilities](https://snyk.io/test/github/dimanech/webpack-resolve-in-paths-plugin/badge.svg?targetFile=package.json)](https://snyk.io/test/github/dimanech/webpack-resolve-in-paths-plugin?targetFile=package.json)
[![npm version](https://badge.fury.io/js/webpack-resolve-in-paths-plugin.svg)](https://badge.fury.io/js/webpack-resolve-in-paths-plugin)

This resolver aimed to overlap imports from different directories.

It is helping to overload some translations, components files in some application part
without explicitly modify imports paths.

It acts similar to "fallback paths" - if path not resolved in current scope,
resolver try to resolve in next defined path until found the resolution. Context
of imports never changes.

Ex:
```
"component" <- required "./component/extension" <- required "./component/base/base"
```

imagine that on brand we need to modify "extension" or even "base" of component.

We could place './component/extension' file in brand cartridge and during the build
our brand-level "extension" would be picked up instead of core-level extension.

As the result brand could modify some component in the middle of dependency chain,
without overloading all child peers. It is not very good practice, but some times
we do not have any chance to do it differently. 

Based on https://www.npmjs.com/package/webpack-fallback-directory-resolver-plugin

## Getting started

```shell script
$ npm install webpack-resolve-in-paths --save-dev
```

**webpack.config.js**

 ```js
const ResolveInPaths = require('webpack-resolve-in-paths-plugin');

module.exports = {
    // ...
    resolve: {
        plugins: [
            new ResolveInPaths({paths: [
                path.resolve(__dirname, 'brand/js'),
                path.resolve(__dirname, 'core/js')
            ]})
        ]
    }
}
```

Imports in components always should be relative to components root

```js
import c from "./components/c.js"; // instead of "./c.js"
```

It would be great if we could deal with imports transparently, but as most simple solution
it use explicit relative to components root paths.

## Licence

Copyright © 2020, D. Nechepurenko. Published under MIT license.

