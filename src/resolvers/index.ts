import { Query } from "./Query";
import { Mutation } from "./Mutation";
import {TeamQueries} from './teams/Resolver';

const resolvers = {
  ...Query,
  ...Mutation,
  ...TeamQueries
};


export default resolvers;


