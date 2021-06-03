import React from 'react';
import { Container, CssBaseline, makeStyles } from '@material-ui/core';
import { FixedHeader } from '../Header/FixedHeader';
import { Route } from 'react-router-dom';

import { RouteProps } from 'react-router';

const useStyles = makeStyles({
    container: {
        marginTop: 30,
    },
});

export const MainLayoutRoute = (props: RouteProps) => {
    const classes = useStyles();

    return (
        <>
            <CssBaseline />
            <FixedHeader />
            <Container className={classes.container}>
                <Route {...props} />
            </Container>
        </>
    );
};
