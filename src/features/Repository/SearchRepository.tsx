import React from 'react';
import { Autocomplete } from '@material-ui/lab';
import { GithubRepositoryFragment, useSearchGithubRepositoryLazyQuery } from '../../generated/graphql';
import { TextField } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import { DataCypress } from '../../constants/DataCypress';
import { useTranslation } from 'react-i18next';
import { SearchRepositoryListItem } from './SearchRepositoryListItem';
import { NodeBuilderEdge, validNodeBuilder } from '../../utils/validNodeBuilder';

export const SearchRepository = () => {
    const history = useHistory();
    const { t } = useTranslation();

    const [value, setValue] = React.useState<GithubRepositoryFragment | null>(null);
    const [inputValue, setInputValue] = React.useState('');
    const [options, setOptions] = React.useState<GithubRepositoryFragment[]>([]);
    const [searchGithubRepository, { loading }] = useSearchGithubRepositoryLazyQuery({
        variables: { query: '' },
        onCompleted: (data) => {
            if (data.search.edges) {
                const validOptions = validNodeBuilder<GithubRepositoryFragment>(
                    data.search.edges as NodeBuilderEdge<GithubRepositoryFragment>[],
                    'Repository',
                );
                setOptions(validOptions);
            }
        },
    });

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
            loading={loading}
            loadingText={t('repository.searching')}
            onChange={(_e, newValue: GithubRepositoryFragment | null) => {
                setValue(newValue);

                if (newValue) {
                    setOptions([newValue, ...options]);

                    history.push(`/repository/${newValue.nameWithOwner}`);
                }
            }}
            onInputChange={(_e, newInputValue) => {
                setInputValue(newInputValue);

                searchGithubRepository({
                    variables: {
                        query: newInputValue,
                    },
                });
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
