// This example demonstrates a simple server with some
// relational data: Posts and Authors. You can get the
// posts for a particular author, and vice-versa

// Read the complete docs for graphql-tools here:
// http://dev.apollodata.com/tools/graphql-tools/generate-schema.html

import { find, filter } from 'lodash';
import { makeExecutableSchema } from 'graphql-tools';


export const typeDefs = `
	
  type RiskTypeFieldQL {
	id: ID!
	risk_type_field_name: String!
	risk_type_field_enum: String!
	risk_type_field_description: String!
	riskfield_set: [RiskFieldQL!]!
	risktype: String
  }

  type RiskTypeQL {
	id: ID!
	risk_type_name: String!
	risk_type_description: String!
	risktype_risktypefields: [RiskTypeFieldQL!]!
	risk_set: [RiskQL!]!
  }

  type RiskFieldQL{
	id: ID!
	risk_field_value: String!
	risk: String
	risktypefield: String
	risk_type_field_name: String
  risk_type_field_enum: String
  risk_type_field_description: String
  } 

  type RiskQL {
	id: ID!	
	risk_name: String!
	risk_description: String!	
	risktype: Int
	risk_type_name: String
	risk_riskfields: [RiskFieldQL!]!
  }  

  # the schema allows the following query:
  type Query {
    all_risktypes: [RiskQL]
	  all_risks: [RiskTypeFieldQL]
	  risktype(id: Int!): RiskTypeFieldQL
    risk(id: Int!): RiskQL
    getSingleRisk(riskid: Int!) : RiskQL
  }  
`;

export const resolvers = {
  Query: { 	
	risktype: (_, { id }) => find(all_risktypes , { id: id }),
	all_risktypes: () => all_risktypes,
	risk: (_, { id }) => find(all_risks , { id: id }),
  all_risks: (_, { risktype }) => find(all_risks, { risktype: risktype }),  
  },
};

export const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});


const all_risktypes = [
      {
        "id": "1",
        "risk_type_name": "Home",
        "risk_type_description": "Type for Home Risk",
        "risktype_risktypefields": [
          {
            "id": "1",
            "risktype": "1",
            "risk_type_field_name": "housenumber",
            "risk_type_field_enum": "text",
            "risk_type_field_description": "House number alloted by corporation"
          },
          {
            "id": "2",
            "risktype": "1",
            "risk_type_field_name": "floors",
            "risk_type_field_enum": "integer",
            "risk_type_field_description": "Number of floors"
          },
          {
            "id": "3",
            "risktype": "1",
            "risk_type_field_name": "sum",
            "risk_type_field_enum": "currency",
            "risk_type_field_description": "Sum Insurance Amount"
          },
          {
            "id": "4",
            "risktype": "1",
            "risk_type_field_name": "completion",
            "risk_type_field_enum": "date",
            "risk_type_field_description": "Construction completion date"
          }
        ]
      }
    ];

	
export const all_risks = [
      {
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
            "risk_field_value": "TYT1000",
            "risk_type_field_name": "model",
            "risk_type_field_enum": "text",
            "risk_type_field_description": "Model of Automobile",
          },
          {
            "id": "2",
            "risktypefield": "2",
            "risk": "1",
            "risk_field_value": "4",
            "risk_type_field_name": "doors",
            "risk_type_field_enum": "integer",
            "risk_type_field_description": "Number of doors"
          },
          {
            "id": "3",
            "risktypefield": "3",
            "risk": "1",
            "risk_field_value": "1000.00",
            "risk_type_field_name": "amount",
            "risk_type_field_enum": "currency",
            "risk_type_field_description": "Insurance Amount"
          },
          {
            "id": "4",
            "risktypefield": "4",
            "risk": "1",
            "risk_field_value": "11/01/2004",
            "risk_type_field_name": "issuedate",
            "risk_type_field_enum": "date",
            "risk_type_field_description": "License issued on date(MM/dd/yyyy)"
          }
        ]
      },
      {
        "id": "2",
        "risktype": 2,
        "risk_type_name": "Home",
        "risk_name": "HillView",
        "risk_description": "Risk policy for HillView home",
        "risk_riskfields": [
          {
            "id": "5",
            "risktypefield": "5",
            "risk": "2",
            "risk_field_value": "RL110107",
            "risk_type_field_name": "housenumber",
            "risk_type_field_enum": "text",
            "risk_type_field_description": "House number alloted by corporation"
          },
          {
            "id": "6",
            "risktypefield": "6",
            "risk": "2",
            "risk_field_value": "2",
            "risk_type_field_name": "floors",
            "risk_type_field_enum": "integer",
            "risk_type_field_description": "Number of floors"
          },
          {
            "id": "7",
            "risktypefield": "7",
            "risk": "2",
            "risk_field_value": "10000.00",
            "risk_type_field_name": "sum",
            "risk_type_field_enum": "currency",
            "risk_type_field_description": "Sum Insurance Amount"
          },
          {
            "id": "8",
            "risktypefield": "8",
            "risk": "2",
            "risk_field_value": "02/23/2001",
            "risk_type_field_name": "completion",
            "risk_type_field_enum": "date",
            "risk_type_field_description": "Construction completion date",
          }
        ]
      }                 
    ];

