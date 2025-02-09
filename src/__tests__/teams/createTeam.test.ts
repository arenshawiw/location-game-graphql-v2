import {Collection, ObjectId} from "mongodb";
import {describe} from "node:test";
import assert from "node:assert";
import {BaseTest, generateValidationError, SINGLE_RESULT} from '../utils';
import {teamFixtureOne} from '../fixtures/Teams';
import {TEAMS_COLLECTION} from '../../contants/index';
import {Game, Team} from '../../__generated__/resolvers-types';
import _ from 'lodash';

export const CREATE_TEAM_MUTATION = `
    mutation CreateTeam($args: CreateTeamInput!) {
      createTeam(input: $args) {
        _id
        game {
          difficulty
          routeId
          routeName
          runTimeMinutes
        }
        name
        primaryGroup
        secondaryGroup
      }
    }
`;

const STANDARD_ARGS = {
    difficulty: "EASY",
    name: "Cool name",
    primaryGroup: "PRIMARY",
    secondaryGroup: "SECONDARY",
    runTimeMinutes: 30,
};

const base = new BaseTest();
let collection: Collection;

describe("Testing team creation", () => {
    beforeAll(async () => {
        await base.init();
        collection = base.db.collection(TEAMS_COLLECTION);
        await collection.deleteMany({});
    });

    afterAll(async () => {
        await base.shutDown();
    });

    test.each([
        [
            "Test create team with team name exists validation error",
            {...STANDARD_ARGS, name: teamFixtureOne.name},
            generateValidationError([
                {
                    field: "name",
                    message: "Team name: 'A Team Fixture One' already exists",
                },
            ]),
        ],
        [
            "Test create team with run time too low validation error",
            {...STANDARD_ARGS, runTimeMinutes: 0},
            generateValidationError([
                {
                    field: "runTimeMinutes",
                    message: "A teams runtime must be a minimum of 30 minutes",
                },
            ]),
        ],
        [
            "Test create team with run time too low validation and team name exists error",
            {...STANDARD_ARGS, runTimeMinutes: 0, name: teamFixtureOne.name},
            generateValidationError([
                {
                    field: "name",
                    message: "Team name: 'A Team Fixture One' already exists",
                },
                {
                    field: "runTimeMinutes",
                    message: "A teams runtime must be a minimum of 30 minutes",
                },
            ]),
        ],
    ])("%s", async (testCase, args, validationErrors) => {
        await collection.insertOne(teamFixtureOne);
        const response = await base.server.executeOperation({
            query: CREATE_TEAM_MUTATION,
            variables: {
                args,
            },
        }, {
            contextValue: base.getContext()
        });

        if (SINGLE_RESULT in response.body) {
            const errors = (response.body as any).singleResult.errors;
            assert.equal(errors.length, 1);
            assert.deepEqual(errors[0].extensions, validationErrors);
        } else {
            fail("Expected single result with errors");
        }

        await collection.deleteMany({});
    });

    it("Test create team happy path", async () => {
        const response = await base.server.executeOperation({
            query: CREATE_TEAM_MUTATION,
            variables: {
                args: STANDARD_ARGS,
            },
        }, {
            contextValue: base.getContext()
        });

        const expected = {
            game: {
                difficulty: STANDARD_ARGS.difficulty,
                routeId: null,
                routeName: null,
                runTimeMinutes: 30,
            } as Game,
            name: STANDARD_ARGS.name,
            primaryGroup: STANDARD_ARGS.primaryGroup,
            secondaryGroup: STANDARD_ARGS.secondaryGroup,
        };

        if (SINGLE_RESULT in response.body) {
            assert.equal((response.body as any).singleResult.errors, undefined);
            const outcome = (response.body as any).singleResult.data.createTeam as Team;
            assert.ok(
                _.isMatch(outcome, expected),
                "Outcome matches expected values",
            );

            const dbResult = await collection.findOne({
                _id: new ObjectId(outcome._id),
            });
            assert.deepEqual(dbResult, {
                _id: new ObjectId(outcome._id),
                name: outcome.name,
                primaryGroup: outcome.primaryGroup,
                secondaryGroup: outcome.secondaryGroup,
                game: {
                    difficulty: outcome.game.difficulty,
                    runTimeMinutes: outcome.game.runTimeMinutes,
                }
            });
        } else {
            fail(`Result is expected got: ${JSON.stringify(response)}`);
        }
    });

});
