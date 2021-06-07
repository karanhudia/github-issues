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
    const header = screen.getByText(/^Welcome to github issues!$/);
    const body = screen.getByText(/^You can use the search bar below to search for github repositories$/);

    expect(header).toBeInTheDocument();
    expect(body).toBeInTheDocument();
});
