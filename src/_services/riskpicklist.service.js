import client from '../api/apolloclient'
import { riskpicklistGraphQL } from '../_graphql';
export const riskpicklistService = {
    getRiskFieldTypeList,
    getRiskTypeKeys,
    getRiskKeys    
};

function getRiskFieldTypeList() {
    return new Promise((resolve, reject) => {
      const fieldtypeoptions = [
            { text: 'currency', value: 'currency' },
            { text: 'date', value: 'date' },
            { text: 'float', value: 'float' },
            { text: 'integer', value: 'integer' },
            { text: 'text', value: 'text' }
          ]
       // const selectedValue = 'text'
       // const output = {fieldtypeoptions: fieldtypeoptions, selectedValue: selectedValue}
       resolve(fieldtypeoptions)
      })
}

function getRiskTypeKeys() {
    return new Promise((resolve, reject) => {
      client.query({query: riskpicklistGraphQL.GET_RISK_TYPE_KEYS_QUERY}).then(response => {          
        const {data: {risktypekeys = null }} = response          
          if(risktypekeys !== null) {
            resolve(risktypekeys)
          }
          else {
            const strError  = 'No data found for Risk Type Keys'
            reject(strError)
          }
        }).catch(error => {
          console.log(error)
          console.log('Error in getRiskTypeKeys')
          reject(error)
        })
      })
}

function getRiskKeys() {
    return new Promise((resolve, reject) => {
      client.query({query: riskpicklistGraphQL.GET_RISK_KEYS_QUERY}).then(response => {          
        const {data: {riskkeys = null }} = response             
          if(riskkeys !== null) {
            resolve(riskkeys)
          }
          else {
            const strError  = 'No data found for Risk Keys'
            reject(strError)
          }
        }).catch(error => {
          console.log(error)
          console.log('Error in getRiskKeys')
          reject(error)
        })
      })
}

