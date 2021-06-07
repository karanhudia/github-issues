import React from 'react';
import { useSearchGithubIssuesLazyQuery } from '../../generated/graphql';
import {
    Box,
    Card,
    CardContent,
    CardHeader,
    createStyles,
    Divider,
    Grid,
    LinearProgress,
    List,
    makeStyles,
    Theme,
    Typography,
} from '@material-ui/core';
import { SearchIssueForm, SearchIssueFormDataType } from './SearchIssueForm';
import { githubSearchQueryBuilder } from '../../utils/githubSearchQueryBuilder';
import { useTranslation } from 'react-i18next';
import { DataCypress } from '../../constants/DataCypress';
import { Error } from '../Error/Error';
import { IssuesListItem } from './IssuesListItem';

type SearchIssuesProps = {
    owner: string;
    name: string;
};

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            backgroundColor: theme.palette.background.paper,
        },
    }),
);

export const SearchIssues = ({ owner, name }: SearchIssuesProps) => {
    const { t } = useTranslation();

    const classes = useStyles();

    const [searchIssues, { loading, error, data, called }] = useSearchGithubIssuesLazyQuery();

    const handleSearchIssues = (values: SearchIssueFormDataType) => {
        const query = githubSearchQueryBuilder({ owner, name, ...values });

        searchIssues({ variables: { query } });
    };

    let renderElement = <></>;

    if (called && loading) {
        renderElement = <LinearProgress color="secondary" />;
    } else if (called && !loading && error) {
        renderElement = <Error />;
    } else if (called && !loading && !error && data?.search.edges?.length) {
        renderElement = (
            <>
                <Box paddingBottom={1} paddingLeft={2}>
                    <Typography variant="h5">{t('issues.issuesFound')}</Typography>
                </Box>
                <Box boxShadow={2}>
                    <List className={classes.root} disablePadding={true} data-cy={DataCypress.SearchIssuesList}>
                        {data.search.edges.map((result, i) => {
                            return result?.node && result.node.__typename === 'Issue' ? (
                                <>
                                    <IssuesListItem item={result.node} />
                                    {data.search.edges?.length !== i + 1 && <Divider component="li" />}
                                </>
                            ) : (
                                <></>
                            );
                        })}
                    </List>
                </Box>
            </>
        );
    } else if (called && !loading && !error && !data?.search.edges?.length) {
        renderElement = (
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
