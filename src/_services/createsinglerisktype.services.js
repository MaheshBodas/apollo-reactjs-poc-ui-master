import client from '../api/apolloclient'
import { createrisktypeGraphQL } from '../_graphql';
import { RiskTypeData } from '../utils/createrisktypectrl'
export const createsingleriskTypeService = {    
    createRiskType
};

function createRiskType(riskTypeObj, risktypefields) {   
  const {risk_type_name, risk_type_description} = riskTypeObj      
  const risktypepostdata = processRiskTypeFields(risk_type_name, risk_type_description, risktypefields)
  const variables = { riskTypeInput : risktypepostdata }; 
  console.log('Posting data to server')
  var strPostData = JSON.stringify(risktypepostdata)
  console.log(strPostData)
    
  return new Promise((resolve, reject) => {
    client.mutate({mutation: createrisktypeGraphQL.CREATE_RISK_TYPE_MUTATION, variables}).then(response => {          
        var output = response
        console.log('createRiskType Response Data')
        console.log(output)        
        resolve(output)
      }).catch(error => {
        console.log(error)
        console.log('Error in createRiskType')
        reject(error)
      })
    })
}

function processRiskTypeFields(strRiskTypeName, strRiskTypeDesc, risktypefields) {        
  var risktypepostdata = new RiskTypeData(strRiskTypeName, strRiskTypeDesc)
  for (const v of risktypefields) {
    risktypepostdata.addRiskTypeField(v.risk_type_field_name, v.risk_type_field_enum, v.risk_type_field_description)
    }
  console.log('Inside processRiskTypeFields')
  return risktypepostdata
}