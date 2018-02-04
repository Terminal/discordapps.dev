import React from 'react';
import { render } from 'enzyme';
import { MemoryRouter } from 'react-router-dom';

import Application from './Application';

describe('when rendering the Application', () => {
	test('it renders without crashing', () => {
		const el = render(<MemoryRouter><Application /></MemoryRouter>);
		expect(el).toMatchSnapshot();
	});
});
