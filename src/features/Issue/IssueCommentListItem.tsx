import React from 'react';
import { ListItem, ListItemText, Typography } from '@material-ui/core';
import { GithubIssueCommentFragment } from '../../generated/graphql';
import { DataCypress } from '../../constants/DataCypress';
import { useTranslation } from 'react-i18next';

export const IssueCommentListItem = ({ __typename, id, author, createdAt, bodyHTML }: GithubIssueCommentFragment) => {
    const { t } = useTranslation();

    if (__typename !== 'IssueComment') {
        return <></>;
    }

    return (
        <ListItem key={id} data-cy={DataCypress.SearchRepositoryResultItem}>
            <ListItemText
                primary={
                    <Typography
                        dangerouslySetInnerHTML={{
                            __html: t('issues.commentedAt', { user: author?.login, time: createdAt }),
                        }}
                    />
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
