import React from 'react';
import { useGetGithubRepositoryQuery } from '../../generated/graphql';
import { useRouteMatch } from 'react-router';
import { Card, CardHeader, Grid, LinearProgress } from '@material-ui/core';
import { SearchIssues } from '../Issue/SearchIssues';
import { Error } from '../Error/Error';
import { DataCypress } from '../../constants/DataCypress';
import { useTranslation } from 'react-i18next';

export const Repository = () => {
    const { t } = useTranslation();
    const { params } = useRouteMatch<{ owner: string; name: string }>();

    const { data, error, loading } = useGetGithubRepositoryQuery({
        variables: { owner: params.owner, name: params.name },
    });

    if (loading) return <LinearProgress color="secondary" />;
    if (error) return <Error />;

    return (
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <Card>
                    <CardHeader
                        title={data?.repository?.nameWithOwner}
                        subheader={t('repository.subHeading')}
                        data-cy={DataCypress.SearchRepositoryHeaderText}
                    />
                </Card>
            </Grid>
            <Grid item xs={12}>
                <SearchIssues owner={params.owner} name={params.name} />
            </Grid>
        </Grid>
    );
};
