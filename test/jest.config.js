module.exports = {
	roots: ['.'],
	preset: 'ts-jest',
	globals: {
		'ts-jest': {
			tsConfig: '.config/tsconfig.json',
		},
	},
	moduleNameMapper: {
		'.*\\.(css|scss)$': '<rootDir>/__mocks__/styleMock.js',
		'.*\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
			'<rootDir>/__mocks__/fileMock.js',
	},
};
