//This interface is used with graphql-codegen to generate types for resolvers context
import {Db} from 'mongodb';

export interface DataSourceContext {
  auth?: string;
  db: Db;
}
