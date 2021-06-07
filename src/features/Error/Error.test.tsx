import React from 'react';
import { render, screen } from '@testing-library/react';
import { Error } from './Error';

test('renders error with header github issues', () => {
    render(<Error />);
    const cardHeader = screen.getByText(/^Sorry! The schema could not be loaded.$/);
    const cardSubHeader = screen.getByText(/^There was some error while making the graphql request.$/);

    expect(cardHeader).toBeInTheDocument();
    expect(cardSubHeader).toBeInTheDocument();
});
