import {ObjectId} from 'mongodb';
import {IEntity} from '../EntityInterface';
import {Difficulty, Team} from '../../__generated__/resolvers-types';

export type TeamEmbeddedGame = {
    difficulty: Difficulty;
    runTimeMinutes: number;
    routeId?: ObjectId;
    routeName?: string;
}

export type TeamDocuments = {
    name: string;
    primaryGroup: string;
    secondaryGroup: string;
    game: TeamEmbeddedGame;
    _id: ObjectId
}

export class TeamEntity implements IEntity<TeamDocuments, Team> {

    _id: ObjectId;
    primaryGroup: string;
    secondaryGroup: string;
    game?: TeamEmbeddedGame
    name: string;


    constructor(teamDocument: TeamDocuments) {
        this._id = teamDocument._id;
        this.primaryGroup = teamDocument.primaryGroup;
        this.secondaryGroup = teamDocument.secondaryGroup;
        this.game = teamDocument.game;
        this.name = teamDocument.name;
    }

    toDTO(): Team {
        return {
            _id: this._id.toHexString(),
            name: this.name,
            primaryGroup: this.primaryGroup,
            secondaryGroup: this.secondaryGroup,
            game: {
                ...this.game,
                routeId: this.game.routeId?.toHexString()
            }
        }
    }
}