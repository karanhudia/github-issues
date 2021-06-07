import React from 'react';
import { render, screen } from '@testing-library/react';
import { Home } from './Home';
import { AuthenticatedApi } from '../Api/AuthenticatedApi';

test('renders home component', () => {
    render(
        <AuthenticatedApi>
            <Home />
        </AuthenticatedApi>,
    );
    const header = screen.getByText(/^home.heading$/);
    const body = screen.getByText(/^home.body$/);

    expect(header).toBeInTheDocument();
    expect(body).toBeInTheDocument();
});
