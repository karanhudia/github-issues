import React from 'react';
import { DataCypress } from '../../constants/DataCypress';
import { ListItem, ListItemIcon, ListItemText } from '@material-ui/core';
import WebAssetIcon from '@material-ui/icons/WebAsset';
import { GithubRepositoryFragment } from '../../generated/graphql';
import { useTranslation } from 'react-i18next';

export const SearchRepositoryListItem = ({ nameWithOwner, issues }: GithubRepositoryFragment) => {
    const { t } = useTranslation();

    return (
        <ListItem data-cy={DataCypress.SearchRepositoryResultItem}>
            <ListItemIcon>
                <WebAssetIcon />
            </ListItemIcon>
            <ListItemText primary={nameWithOwner} secondary={t('issues.issuesCount', { count: issues.totalCount })} />
        </ListItem>
    );
};
