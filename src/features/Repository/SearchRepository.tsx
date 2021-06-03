import React, { useEffect } from 'react';
import { Autocomplete } from '@material-ui/lab';
import { GithubRepositoryFragment, useSearchGithubRepositoryQuery } from '../../generated/graphql';
import { ListItem, ListItemIcon, ListItemText, TextField } from '@material-ui/core';
import WebAssetIcon from '@material-ui/icons/WebAsset';
import { useHistory } from 'react-router-dom';

type SearchProps = {
    label: string;
};

export const SearchRepository = ({ label }: SearchProps) => {
    const history = useHistory();

    const [value, setValue] = React.useState<GithubRepositoryFragment | null>(null);
    const [inputValue, setInputValue] = React.useState('');
    const [options, setOptions] = React.useState<GithubRepositoryFragment[]>([]);
    const { refetch } = useSearchGithubRepositoryQuery({
        variables: { query: '' },
        fetchPolicy: 'cache-first',
    });

    useEffect(() => {
        refetch({ query: inputValue })
            .then((response) => {
                if (response.data.search.edges) {
                    const validOptions = response.data.search.edges.map((edge) => {
                        if (edge && edge.node && edge.node.__typename === 'Repository') {
                            return edge.node;
                        } else {
                            return {} as GithubRepositoryFragment;
                        }
                    });
                    setOptions(validOptions);
                }
            })
            .catch((error) => console.log(error));
    }, [inputValue]);

    return (
        <Autocomplete
            getOptionLabel={(option) => option.nameWithOwner}
            filterOptions={(x) => x}
            options={options}
            autoComplete
            includeInputInList
            filterSelectedOptions
            getOptionSelected={(option) => option.nameWithOwner === inputValue}
            value={value}
            onChange={(_event, newValue: GithubRepositoryFragment | null) => {
                setValue(newValue);

                if (newValue) {
                    setOptions([newValue, ...options]);

                    history.push(`/repository/${newValue.nameWithOwner}`);
                }
            }}
            onInputChange={(_event, newInputValue) => {
                setInputValue(newInputValue);
            }}
            renderInput={(params) => <TextField {...params} label={label} fullWidth />}
            renderOption={(option: GithubRepositoryFragment) => (
                <ListItem>
                    <ListItemIcon>
                        <WebAssetIcon />
                    </ListItemIcon>
                    <ListItemText
                        primary={option.nameWithOwner}
                        secondary={`Active issues count: ${option.issues.totalCount}`}
                    />
                </ListItem>
            )}
        />
    );
};
