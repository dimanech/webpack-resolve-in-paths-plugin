const path = require('path');
const fs = require('fs');
const assert = require('assert').strict;
const ResolverFactory = require('enhanced-resolve').ResolverFactory;
const plugin = require('../index.js');

function resolveAndCheck(pathToResolve, expectedPath, options) {
    return done => {
        const resolver = ResolverFactory.createResolver({
            fileSystem: fs,
            plugins: [new plugin(options || {
	            paths: [
                    path.resolve(__dirname, 'fixtures/brand/js'),
                    path.resolve(__dirname, 'fixtures/core/js')
                ]
            })]
        });

        resolver.resolve({}, __dirname, pathToResolve, {}, (err, result) => {
            if (err) {
                return done(err);
            }

            assert.equal(result, path.resolve(__dirname, expectedPath));

            done();
        });
    }
}

describe('Proper matches', () => {
    const options = {
	    paths: [
            path.resolve(__dirname, 'fixtures/core/js')
        ]
    };

    it('core/a should match to core/a.js', resolveAndCheck(
        './components/a.js',
        './fixtures/core/js/components/a.js',
        options
    ));

    it('core/b should match to core/b.js', resolveAndCheck(
        './components/b.js',
        './fixtures/core/js/components/b.js',
        options
    ));

    it('core/c should match to core/c.js', resolveAndCheck(
        './components/c.js',
        './fixtures/core/js/components/c.js',
        options
    ));
});

describe('Fallback matches', () => {
    it('brand/a should match to core/a.js', resolveAndCheck(
        './components/a.js',
        './fixtures/core/js/components/a.js'
    ));

    it('brand/b should match to brand/b.js', resolveAndCheck(
        './components/b.js',
        './fixtures/brand/js/components/b.js'
    ));

    it('brand/c should match to core/c.js', resolveAndCheck(
        './components/c.js',
        './fixtures/core/js/components/c.js'
    ));
});

describe('Fallback not matched', () => {
});

describe('No fallback array', () => {
});
