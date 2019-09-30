import gql from 'graphql-tag';
export const createrisktypeGraphQL= {
  CREATE_RISK_TYPE_MUTATION:  gql`
    mutation createRiskType($riskTypeInput:RiskTypeInput!) {
      create_risktype(input:$riskTypeInput) {
        ok,
        risktype{
          risk_type_name,
          risk_type_description,
          risktype_risktypefields {
            risk_type_field_name,
            risk_type_field_enum,
            risk_type_field_description
          }
        } 		
      }
    }`
};



