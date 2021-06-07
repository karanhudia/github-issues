import React from 'react';
import { Badge, ListItem, ListItemSecondaryAction, ListItemText } from '@material-ui/core';
import { Link } from 'react-router-dom';
import ChatBubbleOutlineIcon from '@material-ui/icons/ChatBubbleOutline';
import { SearchGithubIssueItemFragment } from '../../generated/graphql';
import { useRouteMatch } from 'react-router';

type IssuesListItemProps = {
    item: SearchGithubIssueItemFragment;
};

export const IssuesListItem = ({ item }: IssuesListItemProps) => {
    const { url } = useRouteMatch();

    return (
        <ListItem key={item.id} button component={Link} to={`${url}/issues/${item.number}`}>
            <ListItemText>{item.title}</ListItemText>
            <ListItemSecondaryAction>
                <Badge badgeContent={item.comments.totalCount} color="primary">
                    <ChatBubbleOutlineIcon />
                </Badge>
            </ListItemSecondaryAction>
        </ListItem>
    );
};
