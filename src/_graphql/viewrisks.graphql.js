import gql from 'graphql-tag';
export const viewrisksGraphQL= {
  GET_RISKS_QUERY: gql`
  query getRisksByRisktype($risktypeid:Int!, $first: Int, $after: String ) {
    riskinstances:risks(risktype:$risktypeid, first:$first, after:$after ){
    pageInfo {
      startCursor
      endCursor
      hasNextPage
      hasPreviousPage
    }
    edges {
      cursor
      node {
            id,     
            risk_name,    
            risk_description,    
            risk_riskfields {
              id,    
              risktypefield,
              risk,        
              risk_field_value,
              risk_type_field_enum,
              risk_type_field_name,
              risk_type_field_description
            }
	     }
      }
    }     
  }`
};