import React, { useMemo } from 'react';
import { hot } from 'react-hot-loader/root';

const App: React.FC = () => {
	const temperature = useMemo(
		() => (Math.random() * (104 - 86) + 86).toFixed(1),
		[]
	);

	return (
		<p className="text-center text-6xl text-orange-500">
			It&apos;s hot here! {temperature}° fahrenheit.
		</p>
	);
};

export default hot(App);
