import React from 'react';
import { hot } from 'react-hot-loader/root';

const App: React.FC<{
	location?: string;
}> = ({ location }) => {
	if (location !== undefined) {
		return <h1>It&apos;s hot here in {location}!</h1>;
	}
	return <h1>It&apos;s hot here!</h1>;
};

export default hot(App);
