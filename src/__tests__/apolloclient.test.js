import { viewsingleriskGraphQL } from './../_graphql/viewsinglerisk.graphql'
import ApolloClient from './../__mocks__/ApolloClient'
describe('ApolloClient', () => {    
      describe("getRisk", () => {                
        it("fetches single Risk successfully'", () => {                                                   
          const variables = { riskid: 1 };             
          ApolloClient.query({query: viewsingleriskGraphQL.GET_SINGLE_RISK_QUERY, variables}).then(response => {
            var riskdata = response
            expect(riskdata !== null) 
            const {data: {riskinstance = null }} = riskdata
            expect(riskinstance !== null)
          })          
        });
    });
  });