import React from 'react';
import { Issue, useSearchGithubIssuesLazyQuery } from '../../generated/graphql';
import {
    Badge,
    Box,
    Card,
    CardContent,
    CardHeader,
    createStyles,
    Divider,
    Grid,
    List,
    ListItem,
    ListItemSecondaryAction,
    ListItemText,
    makeStyles,
    Theme,
} from '@material-ui/core';
import { Link } from 'react-router-dom';
import { SearchIssueForm, SearchIssueFormDataType } from './SearchIssueForm';
import ChatBubbleOutlineIcon from '@material-ui/icons/ChatBubbleOutline';
import { useRouteMatch } from 'react-router';
import { githubSearchQueryBuilder } from '../../utils/githubSearchQueryBuilder';

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
    const { url } = useRouteMatch();
    const classes = useStyles();

    const [searchIssues, { loading, error, data, called }] = useSearchGithubIssuesLazyQuery();

    const handleSearchIssues = (values: SearchIssueFormDataType) => {
        const query = githubSearchQueryBuilder({ owner, name, ...values });

        searchIssues({ variables: { query } });
    };

    return (
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <Card>
                    <CardHeader title="Issues" />
                    <CardContent>
                        <SearchIssueForm onSubmit={handleSearchIssues} />
                    </CardContent>
                </Card>
            </Grid>
            <Grid item xs={12}>
                {!loading && called && !error && data?.search.edges && (
                    <Box boxShadow={2}>
                        <List className={classes.root} disablePadding={true}>
                            {data.search.edges.map((result, i) => {
                                return result?.node && result.node.__typename === 'Issue' ? (
                                    <>
                                        <ListItem
                                            key={i}
                                            button
                                            component={Link}
                                            to={`${url}/issues/${result.node.number}`}
                                        >
                                            <ListItemText>{result.node.title}</ListItemText>
                                            <ListItemSecondaryAction>
                                                <Badge badgeContent={result.node.comments.totalCount} color="primary">
                                                    <ChatBubbleOutlineIcon />
                                                </Badge>
                                            </ListItemSecondaryAction>
                                        </ListItem>
                                        {data.search.edges?.length !== i + 1 && <Divider component="li" />}
                                    </>
                                ) : (
                                    <></>
                                );
                            })}
                        </List>
                    </Box>
                )}
            </Grid>
        </Grid>
    );
};
