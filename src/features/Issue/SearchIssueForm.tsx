import React from 'react';
import { Button, Grid, TextField } from '@material-ui/core';
import { useForm } from 'react-hook-form';

export type SearchIssueFormDataType = {
    title: string;
    status: string;
    body: string;
};

type SearchIssueFormType = {
    onSubmit: (data: SearchIssueFormDataType) => void;
};

export const SearchIssueForm = ({ onSubmit }: SearchIssueFormType) => {
    const { register, handleSubmit } = useForm();

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <Grid container spacing={2}>
                <Grid item xs={4}>
                    <TextField label="Title" fullWidth {...register('title')} />
                </Grid>
                <Grid item xs={4}>
                    <TextField label="Body" fullWidth {...register('body')} />
                </Grid>
                <Grid item xs={4}>
                    <TextField label="Status" fullWidth {...register('status')} />
                </Grid>
                <Grid item xs={12}>
                    <Button type="submit" color="secondary" variant="contained">
                        Search
                    </Button>
                </Grid>
            </Grid>
        </form>
    );
};
