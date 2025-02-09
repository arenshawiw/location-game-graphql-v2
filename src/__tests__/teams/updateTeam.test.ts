import {describe} from "node:test";
import assert from "node:assert";
import {Collection, ObjectId} from "mongodb";
import {CreateTeamInput, Difficulty} from '../../__generated__/resolvers-types';
import {teamFixtureOne, teamFixtureThree, teamFixtureTwo} from '../fixtures/Teams';
import {BaseTest, generateValidationError, SINGLE_RESULT} from '../utils';
import {TEAMS_COLLECTION} from '../../contants/index';

export const UPDATE_TEAM_MUTATION = `
    mutation UpdateTeam($teamId: String!, $input: CreateTeamInput!) {
      updateTeam(teamId: $teamId, input: $input) {
        _id
        name
        primaryGroup
        secondaryGroup
      }
    }
`;

type UpdateTeamPayload = {
    teamId: string;
    input: CreateTeamInput;
};


const DEFAULT_UPDATE = {
    teamId: 1234,
    input: {
        difficulty: Difficulty.Easy,
        name: "Team One",
        primaryGroup: "Prime Group",
        runTimeMinutes: 100,
        secondaryGroup: "Second Group",
    },
};

const base = new BaseTest();
let teamCollection: Collection;
describe("Testing team update", () => {
    beforeAll(async () => {
        await base.init();
        teamCollection = base.db.collection(TEAMS_COLLECTION);
        await teamCollection.deleteMany({});
        await teamCollection.insertMany([
            teamFixtureOne,
            teamFixtureTwo,
            teamFixtureThree,
        ]);
    });

    afterAll(async () => {
        await teamCollection.deleteMany({});
        await base.shutDown();

    });

    const nonExistentTeam = new ObjectId().toHexString();

    test.each([
        [
            "Test update a team than does not exist",
            {
                ...DEFAULT_UPDATE,
                teamId: nonExistentTeam,
            },
            generateValidationError([
                {
                    field: "teamId",
                    message: `Team with id: '${nonExistentTeam}' does not exist`,
                },
            ]),
        ],
        [
            "Test update invalid runtime",
            {
                input: {
                    ...DEFAULT_UPDATE.input,
                    runTimeMinutes: -1,
                },
                teamId: teamFixtureOne._id.toHexString(),
            },
            generateValidationError([
                {
                    field: "runTimeMinutes",
                    message: `A teams runtime must be a minimum of 30 minutes`,
                },
            ]),
        ],
        [
            "Test update change name already exists",
            {
                input: {
                    ...DEFAULT_UPDATE.input,
                    name: teamFixtureTwo.name,
                },
                teamId: teamFixtureOne._id.toHexString(),
            },
            generateValidationError([
                {
                    field: "name",
                    message: `Team name: 'B Team Fixture Two' already exists`,
                },
            ]),
        ],
    ])(
        "%s",
        async (
            testCase: string,
            payload: UpdateTeamPayload,
            validationErrors: any,
        ) => {
            const response = await base.server.executeOperation({
                    query: UPDATE_TEAM_MUTATION,
                    variables: payload,
                },
                {
                    contextValue: base.getContext()
                });

            if (SINGLE_RESULT in response.body) {
                const errors = (response.body as any).singleResult.errors ?? [];
                assert.equal(errors.length, 1);
                assert.deepEqual(errors[0].extensions, validationErrors);
            } else {
                fail("Expected single result with errors");
            }
        },
    );
});
