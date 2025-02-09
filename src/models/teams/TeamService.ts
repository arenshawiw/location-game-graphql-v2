import {TeamDocuments, TeamEntity} from '../../mongo/documents/TeamDocuments';
import {TeamsRepository} from './TeamsRepository';
import {Db, ObjectId} from 'mongodb';
import {CreateTeamInput, Team} from '../../__generated__/resolvers-types';
import {TeamsValidation} from './TeamsValidation';

export class TeamService {

    repo: TeamsRepository;
    validation: TeamsValidation;

    constructor(db: Db) {
        this.repo = new TeamsRepository(db);
        this.validation = new TeamsValidation(this.repo);
    }

    async fetchAllTeams(): Promise<Team[]> {
        const teams = await this.repo.fetchAllTeams();
        return teams.map(team => new TeamEntity(team).toDTO());
    }

    async createTeam(team: CreateTeamInput): Promise<Team> {
        await this.validation.validateCreate(team);
        const outcome = await this.repo.saveTeam(this.mapToTeamDocument(team));
        return new TeamEntity(outcome).toDTO();
    }

    async updateTeam(team: CreateTeamInput, id: string): Promise<Team> {
        await this.validation.validateUpdate(team, id);
        const outcome = await this.repo.updateTeam(this.mapToTeamDocument(team, id), id);
        return new TeamEntity(outcome).toDTO();
    }

    private mapToTeamDocument(team: CreateTeamInput, id?: string): TeamDocuments {
        const {name, primaryGroup, secondaryGroup, runTimeMinutes, difficulty} = team;
        return {
            _id: new ObjectId(id),
            name,
            primaryGroup,
            secondaryGroup,
            game: {
                difficulty,
                runTimeMinutes,
            }
        }
    }
}