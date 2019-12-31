import React from 'react';
import { hot } from 'react-hot-loader/root';
import './App.css';

const App: React.FC = () => {
	const temperature = (Math.random() * (104 - 86) + 86).toFixed(1);

	return <h1>It&apos;s hot here! {temperature}° fahrenheit</h1>;
};

export default hot(App);
