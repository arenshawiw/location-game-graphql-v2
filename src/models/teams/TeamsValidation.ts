import {throwGraphqlValidationError, ValidationAsync} from '../../utils/validation/index';
import {CreateTeamInput} from '../../__generated__/resolvers-types';
import {TeamsRepository} from './TeamsRepository';
import {ObjectId} from 'mongodb';

export class TeamsValidation extends ValidationAsync<CreateTeamInput, CreateTeamInput> {

    repo: TeamsRepository;

    constructor(repo: TeamsRepository) {
        super();
        this.repo = repo;
    }

    async validateCreate(team: CreateTeamInput): Promise<void> {
        await this.doesTeamExist(team.name);
        this.isRunTimeValid(team.runTimeMinutes);
        if (this.errors.length > 0) {
            throwGraphqlValidationError(this.errors);
        }
    }

    async validateUpdate(team: CreateTeamInput, id: string): Promise<void> {
        const isPresent = await this.doesTeamIdExist(new ObjectId(id).toHexString());
        if (isPresent) {
            const originalTeam = await this.repo.findById(new ObjectId(id));
            const originalTeamName = originalTeam.name;
            if (team.name.toLowerCase() !== originalTeamName.toLowerCase()) {
                await this.doesTeamExist(team.name)
            }
            this.isRunTimeValid(team.runTimeMinutes);
        }

        if (this.errors.length > 0) {
            throwGraphqlValidationError(this.errors);
        }

    }

    private isRunTimeValid(runTimeMinutes: number) {
        if (runTimeMinutes < 30) {
            this.errors.push({
                field: "runTimeMinutes",
                message: `A teams runtime must be a minimum of 30 minutes`,
            });
        }
    };

    private async doesTeamExist(name: string): Promise<void> {
        const team = await this.repo.findByName(name);
        if (team) {
            this.errors.push({
                field: "name",
                message: `Team name: '${name}' already exists`,
            });
        }
    };


    private async doesTeamIdExist(id: string): Promise<boolean> {
        const team = await this.repo.findById(new ObjectId(id));
        if (team === undefined || team === null) {
            this.errors.push({
                field: "teamId",
                message: `Team with id: '${id}' does not exist`,
            });
            return false;
        }
        return true;
    };

}