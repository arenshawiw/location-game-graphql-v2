import {GraphQLError} from 'graphql';

export const generateInternalServerError = (message: string): GraphQLError => {
    console.log(`Internal Server Error: ${message}`);
    return new GraphQLError(message, {
        extensions: { code: "INTERNAL_SERVER_ERROR" },
    });
};