import React from 'react';
import { Card, CardContent, CardHeader } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import { ApolloError } from '@apollo/client';

type ErrorProps = {
    error: ApolloError;
};

export const Error = ({ error }: ErrorProps) => {
    const { t } = useTranslation();

    return (
        <Card>
            <CardHeader title={t('error.title')} subheader={t('error.subheader')} />
            <CardContent>{error.networkError?.message}</CardContent>
        </Card>
    );
};
