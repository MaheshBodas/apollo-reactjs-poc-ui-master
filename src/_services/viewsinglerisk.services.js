import client from '../api/apolloclient'
import { viewsingleriskGraphQL } from '../_graphql';
export const viewsingleriskService = {
  getRisk
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
