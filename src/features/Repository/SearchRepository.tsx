import React, { useEffect } from 'react';
import { Autocomplete } from '@material-ui/lab';
import { GithubRepositoryFragment, useSearchGithubRepositoryQuery } from '../../generated/graphql';
import { TextField } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import { DataCypress } from '../../constants/DataCypress';
import { useTranslation } from 'react-i18next';
import { SearchRepositoryListItem } from './SearchRepositoryListItem';

export const SearchRepository = () => {
    const history = useHistory();
    const { t } = useTranslation();

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
            onChange={(_e, newValue: GithubRepositoryFragment | null) => {
                setValue(newValue);

                if (newValue) {
                    setOptions([newValue, ...options]);

                    history.push(`/repository/${newValue.nameWithOwner}`);
                }
            }}
            onInputChange={(_e, newInputValue) => {
                setInputValue(newInputValue);
            }}
            renderInput={(params) => (
                <TextField
                    {...params}
                    label={t('repository.searchLabel')}
                    fullWidth
                    data-cy={DataCypress.SearchRepositoryInputField}
                />
            )}
            renderOption={(option: GithubRepositoryFragment) => <SearchRepositoryListItem {...option} />}
        />
    );
};
