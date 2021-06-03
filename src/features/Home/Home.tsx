import React from 'react';
import { Typography } from '@material-ui/core';
import { Search } from '../Search/Search';

export const Home = () => {
    return (
        <div>
            <Typography variant="h6">Welcome to github issues!</Typography>
            <Typography variant="caption">
                You can use the search bar below to search for github repositories
            </Typography>
            <Search label="Find your repo" />
        </div>
    );
};
