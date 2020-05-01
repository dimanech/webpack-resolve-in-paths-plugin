const path = require('path');
const Promise = require('bluebird');
const fs = require('fs');

module.exports = class ImportFallback {
	constructor(options) {
		this.includePaths = options.paths;
		this.pathRegex = new RegExp(`^./`);
	}

	apply(resolver) {
		const target = resolver.ensureHook('resolve');
		resolver.getHook('before-resolve')
			.tapAsync('ResolveFallback', (request, resolveContext, callback) => {
				if (request.request.match(this.pathRegex)) {
					this.resolveInIncludes(request.request)
						.then(resolvedComponentPath => {
								const obj = {
									directory: request.directory,
									path: request.path,
									query: request.query,
									request: resolvedComponentPath,
								};

								resolver.doResolve(target, obj, null, resolveContext, callback);
							},
							() => {
								callback();
							},
						);
				} else {
					callback();
				}
			});
	}

	resolveInIncludes(reqPath) {
		if (this.includePaths.length) {
			return Promise.filter(
					this.includePaths.map(dir => path.join(dir, reqPath)),
					item => fs.existsSync(item),
			).any();
		}

		return Promise.reject('No fallback paths!');
	}
}
