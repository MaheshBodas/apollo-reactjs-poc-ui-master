import client from '../api/apolloclient'
import { viewsingleriskGraphQL } from '../_graphql';
export const viewsingleriskService = {
  getRisk,
  getRisksByRiskName
};


function getRisk(risk_id, itemsPerRow) {
  const variables = { riskid: risk_id };   
  return new Promise((resolve, reject) => {         
      client.query({query: viewsingleriskGraphQL.GET_SINGLE_RISK_QUERY, variables}).then(response => {
        var riskdata = response
        console.log('getRisk Response Data')
        console.log(riskdata)
        const {data: {riskinstance = null }} = riskdata
        console.log('riskinstance')
        console.log(riskinstance)
        if(riskinstance !== null) {          
          // console.log('riskdata.data.data')          
          const output = Object.assign({},{riskinstance , itemsPerRow}) 
          console.log('service output')
          console.log(output)
          // resolve(riskdata)
          resolve(output)
        }
        else {
          const strError  = 'No data found for Risk id ' + risk_id
          reject(strError)
        }
      }).catch(error => {
        console.log(error)
        console.log('Error in getRisk')
        reject(error)
      })
    })
}

function getRisksByRiskName(risk_name, records_count, fetchAfterCursor) {
  const variables = { riskname : risk_name, first: records_count, after: fetchAfterCursor  };   
    return new Promise((resolve, reject) => {      
        client.query({query: viewsingleriskGraphQL.GET_RISK_AUTO_COMPLETE_QUERY, variables}).then(response => {          
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