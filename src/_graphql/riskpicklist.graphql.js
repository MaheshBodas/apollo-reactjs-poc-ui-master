import gql from 'graphql-tag';
export const riskpicklistGraphQL = {    
    GET_RISK_TYPE_KEYS_QUERY: gql`
        query {
            risktypekeys:all_risktypes  {
                id,     
                risk_type_name
            }
        }`,
    GET_RISK_KEYS_QUERY: gql`
        query {
            riskkeys:all_risks  {
                id,     
                risk_name        
            }
        }
    `
}