import React from 'react';
import { AppBar, Avatar, createStyles, Theme, Toolbar, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Logo from '../../assets/logo/GithubLogo.png';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        offset: theme.mixins.toolbar,
        title: {
            paddingLeft: theme.spacing(1),
        },
    }),
);

export const FixedHeader = () => {
    const classes = useStyles();
    const { t } = useTranslation();

    return (
        <>
            <AppBar position="fixed">
                <Toolbar>
                    <Avatar src={Logo} component={Link} to="/" />
                    <Typography variant="h6" className={classes.title}>
                        {t('header.title')}
                    </Typography>
                </Toolbar>
            </AppBar>
            <div className={classes.offset} />
        </>
    );
};
