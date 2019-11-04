import {ApolloClient, InMemoryCache} from 'apollo-boost'
import { SchemaLink } from 'apollo-link-schema';
import { makeExecutableSchema, addMockFunctionsToSchema } from 'graphql-tools';
import { typeDefs  } from './schema';
const executableSchema = makeExecutableSchema({
  typeDefs,
  // resolvers 
});

const defaultOptions = {
    watchQuery: {
      fetchPolicy: 'no-cache',
      errorPolicy: 'ignore',
    },
    query: {
      fetchPolicy: 'no-cache',
      errorPolicy: 'all',
    },
  }

  const singleRisk = {
    "data": {
      "riskinstance": {
        "id": "1",
        "risktype": 1,
        "risk_type_name": "Automobile",
        "risk_name": "Toyota 1",
        "risk_description": "Toyota 1 Risk policy",
        "risk_riskfields": [
          {
            "id": "1",
            "risktypefield": "1",
            "risk": "1",
            "risk_type_field_enum": "text",
            "risk_field_value": "TYT1000",
            "risk_type_field_name": "model",
            "risk_type_field_description": "Model of Automobile"
          },
          {
            "id": "2",
            "risktypefield": "2",
            "risk": "1",
            "risk_type_field_enum": "integer",
            "risk_field_value": "4",
            "risk_type_field_name": "doors",
            "risk_type_field_description": "Number of doors"
          },
          {
            "id": "3",
            "risktypefield": "3",
            "risk": "1",
            "risk_type_field_enum": "currency",
            "risk_field_value": "1000.00",
            "risk_type_field_name": "amount",
            "risk_type_field_description": "Insurance Amount"
          },
          {
            "id": "4",
            "risktypefield": "4",
            "risk": "1",
            "risk_type_field_enum": "date",
            "risk_field_value": "11/01/2004",
            "risk_type_field_name": "issuedate",
            "risk_type_field_description": "License issued on date(MM/dd/yyyy)"
          }
        ]
      }
    }
  }
  const mocks = {
    Query: () => ({
      getSingleRisk: (riskid) => singleRisk
    }),
  };
  
  addMockFunctionsToSchema({ mocks, schema:executableSchema });
  export default new ApolloClient({
    link: new SchemaLink({ schema: executableSchema }),  
    cache:new InMemoryCache(),    
    defaultOptions: defaultOptions,
  });