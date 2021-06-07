import React from 'react';
import { render, screen } from '@testing-library/react';
import { FixedHeader } from './FixedHeader';
import { BrowserRouter } from 'react-router-dom';

test('renders error component', () => {
    render(
        <BrowserRouter>
            <FixedHeader />
        </BrowserRouter>,
    );
    const title = screen.getByText(/^header.title$/);

    expect(title).toBeInTheDocument();
});
