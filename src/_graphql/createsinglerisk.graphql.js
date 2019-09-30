import gql from 'graphql-tag';
export const createriskGraphQL= {
    GET_SINGLE_RISK_TYPE_QUERY: gql`
      query getSingleRisktype($risktypeid:Int!) {
        risktypeobj:risktype(id:$risktypeid){
            id,	
            risk_type_name,
            risk_type_description,
            risktype_risktypefields {
            id,
            risktype,
            risk_type_field_name,
            risk_type_field_enum,
            risk_type_field_description
            }
        }
    }`,    
  CREATE_RISK_MUTATION:  gql`
    mutation createRisk($riskInput:RiskInput!) {
      create_risk(input:$riskInput) {
        ok
        risk {
          id,
          risktype,
          risk_type_name,
          risk_name,
          risk_description,
          risk_riskfields {
            id,
            risktypefield,
            risk,
            risk_field_value,
            risk_type_field_enum,
            risk_type_field_name
          }
        }
      }
    }`
};