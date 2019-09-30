import client from '../api/apolloclient'
import { createriskGraphQL } from '../_graphql';
import { RiskPostData } from '../utils/createriskctrl'
export const createsingleriskService = {
    getRiskFromType,
    createRisk
};

function getRiskFromType(risk_type_id, itemsPerRow) {
  const variables = { risktypeid : risk_type_id }; 
    return new Promise((resolve, reject) => {
      client.query({query: createriskGraphQL.GET_SINGLE_RISK_TYPE_QUERY, variables}).then(response => {          
          const {data: {risktypeobj = null }} = response    
          console.log('risktypeobj')
          console.log(risktypeobj)  
          if(risktypeobj !== null ) {            
            var output = {risktypeobj: risktypeobj, itemsPerRow: itemsPerRow}
            resolve(output)
          }
          else {
            const strError  = 'No data found for Risk Type id ' + risk_type_id
            reject(strError)
          }
        }).catch(error => {
          console.log(error)
          console.log('Error in getRiskType')
          reject(error)
        })
      })
}

//
function createRisk(risktype, riskFieldArray, inputFormFields) {  
  const riskpostobj = processRiskFields(risktype, riskFieldArray, inputFormFields)
  const variables = { riskInput : riskpostobj }; 
  console.log('Posting data to server')
  var strPostData = JSON.stringify(riskpostobj)
  console.log(strPostData)
  // console.log(createriskGraphQL.CREATE_RISK_MUTATION)
  return new Promise((resolve, reject) => {
    client.mutate({mutation: createriskGraphQL.CREATE_RISK_MUTATION, variables}).then(response => {          
        var output = response
        console.log('createRisk Response Data')
        console.log(output)        
        resolve(output)
      }).catch(error => {
        console.log(error)
        console.log('Error in createRisk')
        reject(error)
      })
    })
}

function processRiskFields(risktype, riskFieldArray, inputFormFields) {
  let intRiskType = parseInt(risktype)
  var riskpostobj = new RiskPostData(intRiskType, 
                            inputFormFields.risk_name, inputFormFields.risk_description)
  let splicedRiskFields = null
  console.log('Inside processRiskFields')
  for(let i=0; i < riskFieldArray.length; ++i ) {
    splicedRiskFields = riskFieldArray[i]
    for (let splicedRiskField of splicedRiskFields) {
      console.log(splicedRiskField.risktypefield)
      console.log(splicedRiskField.risk_type_field_name)
      console.log(inputFormFields[splicedRiskField.risk_type_field_name])      
      let intRiskTypeField = parseInt(splicedRiskField.risktypefield)
      riskpostobj.addRiskField(intRiskTypeField,
        inputFormFields[splicedRiskField.risk_type_field_name])
    }   
  }
  // Object.keys(inputFormFields).forEach((key) => {
  //   console.log('key is' + key + 'Having value' + inputFormFields[key]);
  //   riskpostobj.addRiskField(key, inputFormFields[key])
  // });                            
  return riskpostobj
}