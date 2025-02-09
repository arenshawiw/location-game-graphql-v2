import {ObjectId} from 'mongodb';
import {Difficulty} from '../../__generated__/resolvers-types';
import {TeamDocuments} from '../../mongo/documents/TeamDocuments';

export const teamFixtureOne: TeamDocuments = {
    _id: new ObjectId("da623a46e492ded803ba2cf8"),
    game: {
        difficulty: Difficulty.Standard,
        runTimeMinutes: 20,
    },
    name: "A Team Fixture One",
    primaryGroup: "A Primary Group",
    secondaryGroup: "B Secondary Group",
};

export const teamFixtureTwo: TeamDocuments = {
    _id: new ObjectId("5d374c25d9ab663332baf515"),
    game: {
        difficulty: Difficulty.Easy,
        runTimeMinutes: 20,
    },
    name: "B Team Fixture Two",
    primaryGroup: "B Primary Group",
    secondaryGroup: "A Secondary Group",
};

export const teamFixtureThree: TeamDocuments = {
    ...teamFixtureTwo,
    secondaryGroup: teamFixtureOne.secondaryGroup,
    game: {
        difficulty: Difficulty.Standard,
        runTimeMinutes: 30,
    },
    name: "C Team Fixture three",
    _id: new ObjectId("5d374c25d9ab663332baf516"),
};