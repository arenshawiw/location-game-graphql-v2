import {
    CreateTeamInput,
    Resolvers,
    ResolversParentTypes,
    ResolversTypes,
    Team
} from '../../__generated__/resolvers-types';
import {DataSourceContext} from '../../types/DataSourceContext';
import {TeamService} from '../../models/teams/TeamService';


export const TeamQueries: Resolvers = {
    Query: {
        teams: async (_parent: ResolversParentTypes['Query'], _: any, _context: DataSourceContext): Promise<ResolversTypes['Team'][]> => {
            const service = new TeamService(_context.db);
            return service.fetchAllTeams();
        }
    },

    Mutation: {
        createTeam: async (_parent: ResolversParentTypes['Mutation'], args: {input: CreateTeamInput}, _context: DataSourceContext): Promise<ResolversTypes['Team']> => {
            console.log(`Creating team: ${JSON.stringify(args.input)}`);
            const service = new TeamService(_context.db);
            return service.createTeam(args.input);
        },
        updateTeam: async (_parent: ResolversParentTypes['Mutation'], args: {input: CreateTeamInput, teamId: string}, _context: DataSourceContext): Promise<Team> => {
            console.log(`Updating team: ${JSON.stringify(args.input)}`);
            const service = new TeamService(_context.db);
            return service.updateTeam(args.input, args.teamId);

        }
    }
}