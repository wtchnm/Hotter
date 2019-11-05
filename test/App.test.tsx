import '@testing-library/jest-dom/extend-expect';
import { render } from '@testing-library/react';
import React from 'react';
import App from '../src/components/App';

it('renders with or without a location', () => {
	const { container, getByText, rerender } = render(<App />);
	expect(getByText("It's hot here!")).toBeInTheDocument();
	expect(container.firstChild).toMatchInlineSnapshot(`
		<h1>
		  It's hot here!
		</h1>
	`);

	rerender(<App location="Miami" />);
	expect(getByText("It's hot here in Miami!")).toBeInTheDocument();
	expect(container.firstChild).toMatchInlineSnapshot(`
		<h1>
		  It's hot here in 
		  Miami
		  !
		</h1>
	`);
});
