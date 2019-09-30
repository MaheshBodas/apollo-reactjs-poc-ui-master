import gql from 'graphql-tag';
export const viewsingleriskGraphQL= {
  GET_SINGLE_RISK_QUERY: gql`
    query getSingleRisk($riskid:Int!) {
      riskinstance:risk(id:$riskid) {
        id,     
        risktype,
        risk_type_name,    
        risk_name,    
        risk_description,    
        risk_riskfields {
          id,    
          risktypefield,
          risk,  
          risk_type_field_enum,            
          risk_type_field_name,
          risk_field_value
        }    
      }
    }`
};