// @ts-check

/**
 * @param {{ env: string; }} ctx
 */
module.exports = (ctx) => ({
	plugins: {
		tailwindcss: {},
		'postcss-preset-env': ctx.env === 'production' ? {} : false,
		cssnano: ctx.env === 'production' ? {} : false,
	},
});
