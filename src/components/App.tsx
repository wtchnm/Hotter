import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import React from 'react';
import { hot } from 'react-hot-loader/root';
import Dialog from './Dialog';

const theme = createMuiTheme({
	palette: {
		primary: {
			main: '#5399DB',
		},
		secondary: {
			main: '#172A3C',
		},
	},
	typography: {
		fontFamily: 'Lato, sans-serif',
	},
});

const App: React.FC = () => {
	return (
		<ThemeProvider theme={theme}>
			<Dialog />
		</ThemeProvider>
	);
};

export default hot(App);
