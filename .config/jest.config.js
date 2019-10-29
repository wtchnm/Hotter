module.exports = {
	roots: ['../test'],
	preset: 'ts-jest',
	globals: {
		'ts-jest': {
			tsConfig: './.config/tsconfig.json',
		},
	},
};
