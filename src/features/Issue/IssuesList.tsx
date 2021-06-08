import React from 'react';
import { SearchGithubIssueItemFragment } from '../../generated/graphql';
import { Box, createStyles, Divider, List, makeStyles, Theme, Typography } from '@material-ui/core';
import { DataCypress } from '../../constants/DataCypress';
import { IssuesListItem } from './IssuesListItem';
import { useTranslation } from 'react-i18next';

type IssuesListProps = {
    items: SearchGithubIssueItemFragment[];
};

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            backgroundColor: theme.palette.background.paper,
        },
    }),
);

export const IssuesList = ({ items }: IssuesListProps) => {
    const { t } = useTranslation();
    const classes = useStyles();

    return (
        <>
            <Box paddingBottom={1} paddingLeft={2}>
                <Typography variant="h5">{t('issues.issuesFound')}</Typography>
            </Box>
            <Box boxShadow={2}>
                <List className={classes.root} disablePadding={true} data-cy={DataCypress.SearchIssuesList}>
                    {items.map((item, i) => (
                        <>
                            <IssuesListItem item={item} />
                            {items.length !== i + 1 && <Divider component="li" />}
                        </>
                    ))}
                </List>
            </Box>
        </>
    );
};
