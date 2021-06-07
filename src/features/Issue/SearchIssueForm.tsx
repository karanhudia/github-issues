import React from 'react';
import { Button, FormControl, Grid, InputLabel, MenuItem, Select, TextField } from '@material-ui/core';
import { useForm } from 'react-hook-form';
import { IssueState } from '../../generated/graphql';
import { useTranslation } from 'react-i18next';

export type SearchIssueFormDataType = {
    title: string;
    state: string;
    body: string;
};

type SearchIssueFormType = {
    onSubmit: (data: SearchIssueFormDataType) => void;
};

export const SearchIssueForm = ({ onSubmit }: SearchIssueFormType) => {
    const { register, handleSubmit, setValue } = useForm();
    const { t } = useTranslation();

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <Grid container spacing={2}>
                <Grid item xs={4}>
                    <TextField label={t('issues.formTitle')} fullWidth {...register('title')} />
                </Grid>
                <Grid item xs={4}>
                    <TextField label={t('issues.formBody')} fullWidth {...register('body')} />
                </Grid>
                <Grid item xs={4}>
                    <FormControl fullWidth={true}>
                        <InputLabel id="issue-state" shrink={true}>
                            {t('issues.formState')}
                        </InputLabel>
                        <Select
                            displayEmpty={true}
                            labelId="issue-state"
                            onChange={(e) => setValue('state', e.target.value)}
                        >
                            <MenuItem value="">All</MenuItem>
                            <MenuItem value={IssueState.Open}>{IssueState.Open}</MenuItem>
                            <MenuItem value={IssueState.Closed}>{IssueState.Closed}</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={12}>
                    <Button type="submit" color="secondary" variant="contained">
                        {t('buttons.search')}
                    </Button>
                </Grid>
            </Grid>
        </form>
    );
};
