import client from '../api/apolloclient'
import { viewrisksGraphQL } from '../_graphql';
export const viewallrisksService = {
    getRisks        
};

function getRisks(risk_type_id, records_count, fetchAfterCursor) {
  const variables = { risktypeid : risk_type_id, first: records_count, after: fetchAfterCursor  };   
    return new Promise((resolve, reject) => {      
        client.query({query: viewrisksGraphQL.GET_RISKS_QUERY, variables}).then(response => {          
          const {data: {riskinstances = null }} = response
          console.log('riskinstance')
          console.log(riskinstances)          
          if(riskinstances !== null) {
            console.log('service output')
            console.log(riskinstances) 
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