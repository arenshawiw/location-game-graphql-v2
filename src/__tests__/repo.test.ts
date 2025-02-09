import {BaseTest} from './utils';

let baseTest = new BaseTest();
beforeAll(async () => {
    await baseTest.init();
})

afterAll(async () => {
    await baseTest.shutDown();
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
        const res = await baseTest.server.executeOperation({
            query,
            variables,

        }, {
            contextValue: baseTest.getContext()
        });
        //Assert
        expect(res.body.kind).toEqual("single");
        expect((res.body as any).singleResult.data).toEqual({teams: []});
    });
});
