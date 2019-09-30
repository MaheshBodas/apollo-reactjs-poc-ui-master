import client from '../api/apolloclient'
import { viewallrisksGraphQL } from '../_graphql';
export const viewallrisksService = {
    getRisks        
};

function getRisks(risk_type_id) {
  const variables = { risktypeid : risk_type_id };   
    return new Promise((resolve, reject) => {
      client.query({query: viewallrisksGraphQL.GET_ALL_RISK_QUERY, variables}).then(response => {          
          const {data: {riskinstances = null }} = response
          console.log('riskinstance')
          console.log(riskinstances)          
          if(riskinstances !== null) {
            resolve(riskinstances)
          }
          else {
            const strError  = 'No data found for Risks'
            reject(strError)
          }
        }).catch(error => {
          console.log('Error in getRisks')
          reject(error)
        })
      })
}