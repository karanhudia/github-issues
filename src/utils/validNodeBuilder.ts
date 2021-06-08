export type NodeBuilderEdge<R> = {
    node: R & { __typename: string };
};

export const validNodeBuilder = <R>(edges: NodeBuilderEdge<R>[], typename: string): R[] => {
    const validNodes: R[] = [];

    edges.forEach((edge) => {
        if (edge && edge.node && edge.node && edge.node.__typename === typename) {
            validNodes.push(edge.node);
        }
    });

    return validNodes;
};
