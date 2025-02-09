import {Db} from 'mongodb';
import {ApolloServer} from '@apollo/server';
import {buildSubgraphSchema} from '@apollo/subgraph';
import gql from 'graphql-tag';
import {readFileSync} from 'fs';
import resolvers from '../resolvers/index';

export interface TestContext {
    db: Db
}

export const testServer = new ApolloServer<TestContext>({
    schema: buildSubgraphSchema({
        typeDefs: gql(
            readFileSync("schema.graphql", {
                encoding: "utf-8",
            })
        ),
        resolvers,
    }),
});