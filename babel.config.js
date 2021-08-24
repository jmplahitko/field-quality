module.exports = function(api) {
	api.cache(true);

	return {
		presets: ["@babel/env", "@babel/typescript"],
		plugins: [],
		ignore: ["src/types.ts"],
	};
};
