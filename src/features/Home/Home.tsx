import React from 'react';
import { Typography } from '@material-ui/core';
import { SearchRepository } from '../Repository/SearchRepository';
import { useTranslation } from 'react-i18next';

export const Home = () => {
    const { t } = useTranslation();

    return (
        <>
            <Typography variant="h6">{t('home.heading')}</Typography>
            <Typography variant="caption">{t('home.body')}</Typography>
            <SearchRepository />
        </>
    );
};
