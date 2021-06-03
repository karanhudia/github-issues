export const githubSearchQueryBuilder = ({
    owner,
    name,
    state,
    title,
    body,
}: {
    owner: string;
    name: string;
    title?: string;
    body?: string;
    state?: string;
}) => {
    let query = `repo:${owner}/${name}`;

    if (title) {
        query = `${query} in:title ${title}`;
    }

    if (body) {
        query = `${query} in:body ${body}`;
    }

    if (state) {
        query = `${query} is:${state}`;
    }

    return query;
};
