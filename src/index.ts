import {readFileSync} from "fs";
import gql from "graphql-tag";
import {buildSubgraphSchema} from "@apollo/subgraph";
import {ApolloServer, ContextFunction} from "@apollo/server";
import {StandaloneServerContextFunctionArgument, startStandaloneServer,} from "@apollo/server/standalone";
import resolvers from "./resolvers";
import {DataSourceContext} from "./types/DataSourceContext";
import {Db, MongoClient} from 'mongodb';

const port = process.env.PORT ?? "4001";
const MONGO_URI = process.env.MONGO_URL ?? 'mongodb://rootuser:rootpassword@localhost:27017';
const DB_NAME = process.env.DB_NAME ?? 'locationChallenge';
const client = new MongoClient(MONGO_URI);
const subgraphName = require("../package.json").name;
let db: Db;

async function connectToDatabase(): Promise<Db> {
    if (!db) {
        await client.connect();
        db = client.db(DB_NAME); // Replace with your DB name
        console.log("✅ Connected to MongoDB");
    }
    return db;
}

const context: ContextFunction<
    [StandaloneServerContextFunctionArgument],
    DataSourceContext
> = async ({req}) => {

    const database = await connectToDatabase();

    return {
        auth: req.headers.authorization,
        db: database,
    };
};

async function main() {
    let typeDefs = gql(
        readFileSync("schema.graphql", {
            encoding: "utf-8",
        })
    );
    const server = new ApolloServer({
        schema: buildSubgraphSchema({typeDefs, resolvers}),
        formatError: (error) => {
            return {
                message: error.message,
                extensions: error.extensions,
            };
        }


    });
    const {url} = await startStandaloneServer(server, {
        context,
        listen: {port: Number.parseInt(port)},
    });

    console.log(`🚀  Subgraph ${subgraphName} ready at ${url}`);
    console.log(`Run rover dev --url ${url} --name ${subgraphName}`);
}

main();
