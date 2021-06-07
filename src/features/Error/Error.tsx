import React from 'react';
import { Card, CardHeader } from '@material-ui/core';
import { useTranslation } from 'react-i18next';

export const Error = () => {
    const { t } = useTranslation();
    return (
        <Card>
            <CardHeader title={t('error.title')} subheader={t('error.subheader')} />
        </Card>
    );
};
