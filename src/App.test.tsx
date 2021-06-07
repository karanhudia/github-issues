import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders app with header github issues', () => {
    render(<App />);
    const headerTitleElement = screen.getByText(/^Github Issues$/);
    expect(headerTitleElement).toBeInTheDocument();
});
