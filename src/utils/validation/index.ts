import {GraphQLError} from 'graphql';
import {ObjectId} from 'mongodb';

export abstract class ValidationAsync<C, U> {

    errors: ValidationErrorEntry[] = [];

    abstract validateCreate(entity: C): Promise<void> | void;

    abstract validateUpdate(entity: U, id: string | ObjectId): Promise<void> | void;

    getValidationErrors() {
        return this.errors;
    }

}

export type ValidationErrorEntry = {
    field: string;
    message: string;
};

export const throwGraphqlValidationError = (
    errors: ValidationErrorEntry[],
) => {
    console.log(`User validation error: ${JSON.stringify(errors)}`);
    throw new GraphQLError(`Validation error in input`, {
        extensions: {code: "VALIDATION_ERROR", errors},
    });
};
