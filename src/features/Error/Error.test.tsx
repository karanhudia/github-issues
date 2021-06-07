import React from 'react';
import { render, screen } from '@testing-library/react';
import { Error } from './Error';

test('renders error component', () => {
    render(<Error />);
    const cardHeader = screen.getByText(/^error.title$/);
    const cardSubHeader = screen.getByText(/^error.subheader$/);

    expect(cardHeader).toBeInTheDocument();
    expect(cardSubHeader).toBeInTheDocument();
});
