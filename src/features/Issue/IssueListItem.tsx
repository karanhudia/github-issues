import React from 'react';
import { ListItem, ListItemText, Typography } from '@material-ui/core';
import { GithubIssueCommentFragment } from '../../generated/graphql';

export const IssueListItem = ({ __typename, id, author, createdAt, bodyHTML }: GithubIssueCommentFragment) => {
    if (__typename !== 'IssueComment') {
        return <></>;
    }

    return (
        <ListItem key={id}>
            <ListItemText
                primary={
                    <div>
                        <Typography variant="body2" component="span">
                            {author?.login}
                        </Typography>
                        <Typography variant="caption" component="span">
                            {` commented at `}
                            {createdAt}
                        </Typography>
                    </div>
                }
                secondary={
                    <div
                        dangerouslySetInnerHTML={{
                            __html: bodyHTML,
                        }}
                    />
                }
            />
        </ListItem>
    );
};
