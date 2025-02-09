import {Collection, Db, ObjectId} from 'mongodb';
import {TeamDocuments} from '../../mongo/documents/TeamDocuments';
import {generateInternalServerError} from '../../utils/errors/index';
import {TEAMS_COLLECTION} from '../../contants/index';


export class TeamsRepository {

    collection: Collection<TeamDocuments>

    constructor(db: Db) {
        this.collection = db.collection(TEAMS_COLLECTION);
    }

    async fetchAllTeams(): Promise<TeamDocuments[]> {
        return this.collection.find({}).toArray();
    }

    async findById(_id: ObjectId): Promise<TeamDocuments> {
        return this.collection.findOne({_id});
    }

    async findByName(name: string): Promise<TeamDocuments> {
        return this.collection.findOne({name});
    }

    async saveTeam(team: TeamDocuments): Promise<TeamDocuments> {
        await this.collection.insertOne(team);
        const insertedTeam = await this.collection.findOne({_id: team._id});
        if (!insertedTeam?._id) {
            throw generateInternalServerError(`Error saving team: ${team.name}`);
        }
        return insertedTeam;
    }

    async updateTeam(team: TeamDocuments, id: string): Promise<TeamDocuments> {
        const outcome = await this.collection.replaceOne({_id: new ObjectId(id)}, team);
        if (outcome.matchedCount === 1) {
            const updatedTeam = await this.collection.findOne({_id: team._id});
            return updatedTeam;
        }
        throw generateInternalServerError(`Error updating team: ${team.name}`);

    }
}