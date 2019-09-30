import gql from 'graphql-tag';
export const viewallrisksGraphQL= {
  GET_ALL_RISK_QUERY: gql`
  query getAllRisksByRisktype($risktypeid:Int!) {
    riskinstances:all_risks(risktype:$risktypeid){
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
  }`
};