import React from 'react';
import { useRouteMatch } from 'react-router';
import { useGetGithubIssueQuery } from '../../generated/graphql';
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
} from '@material-ui/core';
import { Error } from '../Error/Error';
import { IssueListItem } from './IssueListItem';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            backgroundColor: theme.palette.background.paper,
        },
    }),
);

export const IssueContainer = () => {
    const classes = useStyles();
    const { params } = useRouteMatch<{ owner: string; name: string; issueNumber: string }>();

    const { data, error, loading } = useGetGithubIssueQuery({
        variables: {
            owner: params.owner,
            name: params.name,
            issueNumber: +params.issueNumber,
        },
    });

    if (loading) return <LinearProgress color="secondary" />;
    if (error) return <Error />;

    if (!data?.repository?.issue) {
        return null;
    }

    const { title, state, bodyHTML, comments } = data.repository.issue;

    return (
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <Card>
                    <CardHeader title={title} subheader={state} />
                    <CardContent
                        dangerouslySetInnerHTML={{
                            __html: bodyHTML,
                        }}
                    />
                </Card>
            </Grid>
            <Grid item xs={12}>
                <Box boxShadow={2}>
                    <List className={classes.root} disablePadding={true}>
                        {comments.nodes &&
                            comments.nodes.map((node, i) => {
                                if (!node) {
                                    return <></>;
                                }

                                return (
                                    <>
                                        <IssueListItem {...node} />
                                        {comments.nodes?.length !== i + 1 && <Divider component="li" />}
                                    </>
                                );
                            })}
                    </List>
                </Box>
            </Grid>
        </Grid>
    );
};
