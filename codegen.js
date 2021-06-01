module.exports = {
    schema: [
        {
            [process.env.REACT_APP_GITHUB_URL]: {
                headers: {
                    Authorization: `bearer ${process.env.REACT_APP_GITHUB_TOKEN}`,
                },
            },
        },
    ],
    documents: ['src/**/*.graphql'],
    overwrite: true,
    generates: {
        'schema.json': {
            plugins: ['introspection'],
        },
        'schema.graphql': {
            plugins: ['schema-ast'],
        },
        'src/generated/graphql.ts': {
            plugins: [
                'add',
                'typescript',
                'typescript-operations',
                'typescript-react-apollo',
                'named-operations-object',
            ],
            config: {
                skipTypename: false,
                withHooks: true,
                withHOC: false,
                withComponent: false,
                content: '/* eslint-disable */',
            },
        },
    },
};
