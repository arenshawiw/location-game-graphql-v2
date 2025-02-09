import {MongoClient} from 'mongodb';
import {MongoMemoryServer} from 'mongodb-memory-server';
import {testServer} from './utils';

let mongoServer: MongoMemoryServer;
let client: MongoClient;
let db: any;
// let server: ApolloServer;

beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create();
    const mongoUri = mongoServer.getUri();
    client = new MongoClient(mongoUri);
    await client.connect();
    db = client.db();
})

afterAll(async () => {
    await client.close();
    await mongoServer.stop();
})

describe("Repository Template Functionality", () => {
    it("Executes Location Entity Resolver", async () => {

        //Arrange
        const query = `
        query Teams {
  teams {
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
        const variables = {
            representations: [{__typename: "Thing", id: "1"}],
        };
        const expected = {
            _entities: [{name: "Name"}],
        };
        //Act
        const res = await testServer.executeOperation({
            query,
            variables,

        }, {
            contextValue: {
                db
            }
        });
        //Assert
        expect(res.body.kind).toEqual("single");
        expect((res.body as any).singleResult.data).toEqual({teams: []});
    });
});
