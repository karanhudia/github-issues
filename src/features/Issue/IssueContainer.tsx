import React, { useState } from 'react';
import { useRouteMatch } from 'react-router';
import { useGetGithubIssueQuery } from '../../generated/graphql';
import {
    Box,
    Button,
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
import { IssueCommentListItem } from './IssueCommentListItem';
import { DataCypress } from '../../constants/DataCypress';

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

    const [numberOfComments, setNumberOfComments] = useState<number>(10);

    const { data, error, loading, refetch } = useGetGithubIssueQuery({
        variables: {
            owner: params.owner,
            name: params.name,
            issueNumber: +params.issueNumber,
            totalComments: numberOfComments,
        },
    });

    if (loading) return <LinearProgress color="secondary" />;
    if (error) return <Error />;

    if (!data?.repository?.issue) {
        return null;
    }

    const { title, state, bodyHTML, comments } = data.repository.issue;

    const handleSeeMoreButton = () => {
        refetch({
            totalComments: numberOfComments + 10,
        });

        setNumberOfComments(numberOfComments + 10);
    };

    return (
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <Card>
                    <CardHeader title={title} subheader={state} data-cy={DataCypress.IssueTitle} />
                    <CardContent
                        dangerouslySetInnerHTML={{
                            __html: bodyHTML,
                        }}
                        data-cy={DataCypress.IssueBody}
                    />
                </Card>
            </Grid>
            <Grid item xs={12}>
                <Box boxShadow={2}>
                    <List className={classes.root} disablePadding={true}>
                        {comments.edges &&
                            comments.edges.map((edge, i) => {
                                if (!edge?.node) {
                                    return <></>;
                                }

                                return (
                                    <>
                                        <IssueCommentListItem {...edge.node} />
                                        {comments.edges?.length !== i + 1 && <Divider component="li" />}
                                    </>
                                );
                            })}
                    </List>
                </Box>
            </Grid>
            {data.repository.issue.comments.pageInfo.hasNextPage && (
                <Grid item xs={12}>
                    <Button color="secondary" variant="contained" fullWidth={true} onClick={handleSeeMoreButton}>
                        See more
                    </Button>
                </Grid>
            )}
        </Grid>
    );
};
