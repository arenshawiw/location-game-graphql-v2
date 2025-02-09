import {Db, MongoClient} from 'mongodb';
import {ApolloServer} from '@apollo/server';
import {buildSubgraphSchema} from '@apollo/subgraph';
import gql from 'graphql-tag';
import {readFileSync} from 'fs';
import resolvers from '../resolvers/index';
import {MongoMemoryServer} from 'mongodb-memory-server';
import {ValidationErrorEntry} from '../utils/validation/index';

export interface TestSuiteContext {
    db: Db;
}

export class BaseTest {

    mongoServer: MongoMemoryServer;
    mongoClient: MongoClient;
    db: Db;
    server: ApolloServer<TestSuiteContext>;

    async init() {
        this.mongoServer = await MongoMemoryServer.create();
        this.mongoClient = new MongoClient(this.mongoServer.getUri());
        await this.mongoClient.connect();
        this.db = this.mongoClient.db();
        this.server = new ApolloServer<TestSuiteContext>({
            schema: buildSubgraphSchema({
                typeDefs: gql(
                    readFileSync("schema.graphql", {
                        encoding: "utf-8",
                    })
                ),
                resolvers,
            }),
        });
    }

    getContext(): TestSuiteContext {
        return {
            db: this.db
        }
    }

    async shutDown() {
        await this.mongoClient.close();
        await this.mongoServer.stop();
    }

}

export function generateValidationError(errors: ValidationErrorEntry[]) {
    return {
        code: "VALIDATION_ERROR",
        errors,
    };
}

export const SINGLE_RESULT = "singleResult";
