import { IssueState } from '../generated/graphql';
import { githubSearchQueryBuilder } from './githubSearchQueryBuilder';

test('returns the github search query for only title', () => {
    const query = githubSearchQueryBuilder({ owner: 'facebook', name: 'react', title: 'eslint' });

    expect(query).toMatch('repo:facebook/react in:title eslint');
});

test('returns the github search query for only state', () => {
    const query = githubSearchQueryBuilder({ owner: 'facebook', name: 'react', state: IssueState.Open });

    expect(query).toMatch(`repo:facebook/react is:${IssueState.Open}`);
});

test('returns the github search query for only body', () => {
    const query = githubSearchQueryBuilder({ owner: 'facebook', name: 'react', body: 'eslint' });

    expect(query).toMatch('repo:facebook/react in:body eslint');
});

test('returns the github search query for title, body and state', () => {
    const query = githubSearchQueryBuilder({
        owner: 'facebook',
        name: 'react',
        title: 'eslint',
        body: 'bug',
        state: IssueState.Closed,
    });

    expect(query).toMatch(`repo:facebook/react in:title eslint in:body bug is:${IssueState.Closed}`);
});
