import React from 'react';
import { SearchGithubIssueItemFragment, useSearchGithubIssuesLazyQuery } from '../../generated/graphql';
import { Box, Card, CardContent, CardHeader, Grid, LinearProgress, Typography } from '@material-ui/core';
import { SearchIssueForm, SearchIssueFormDataType } from './SearchIssueForm';
import { githubSearchQueryBuilder } from '../../utils/githubSearchQueryBuilder';
import { useTranslation } from 'react-i18next';
import { Error } from '../Error/Error';
import { NodeBuilderEdge, validNodeBuilder } from '../../utils/validNodeBuilder';
import { IssuesList } from './IssuesList';

type SearchIssuesProps = {
    owner: string;
    name: string;
};

export const SearchIssues = ({ owner, name }: SearchIssuesProps) => {
    const { t } = useTranslation();

    const [searchIssues, { loading, error, data, called }] = useSearchGithubIssuesLazyQuery();

    const handleSearchIssues = (values: SearchIssueFormDataType) => {
        const query = githubSearchQueryBuilder({ owner, name, ...values });

        searchIssues({ variables: { query } });
    };

    let renderElement = <></>;

    if (called && loading) {
        renderElement = <LinearProgress color="secondary" />;
    } else if (called && !loading && error) {
        renderElement = <Error error={error} />;
    } else if (called && !loading && !error && data?.search.edges) {
        const issuesList = validNodeBuilder<SearchGithubIssueItemFragment>(
            data.search.edges as NodeBuilderEdge<SearchGithubIssueItemFragment>[],
            'Issue',
        );

        renderElement = issuesList.length ? (
            <IssuesList items={issuesList} />
        ) : (
            <Box paddingBottom={1} paddingLeft={2}>
                <Typography variant="h5">{t('issues.noIssuesFound')}</Typography>
            </Box>
        );
    }

    return (
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <Card>
                    <CardHeader title={t('issues.title')} />
                    <CardContent>
                        <SearchIssueForm onSubmit={handleSearchIssues} />
                    </CardContent>
                </Card>
            </Grid>
            <Grid item xs={12}>
                {renderElement}
            </Grid>
        </Grid>
    );
};
