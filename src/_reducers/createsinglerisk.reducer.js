import { createsingleriskConstants } from '../_constants';
import { RiskFieldInstance } from '../utils/riskfieldinstance'
import { Risk } from '../utils/risk'
import { /* RiskPostData, RiskCtrlConst,*/ RequiredValidatorBuilder, RequiredNumberValidatorBuilder, RequiredIntegerValidatorBuilder } from '../utils/inputvalidation'

function rowCount(riskfields, itemsPerRow) {
  if (riskfields !== null) {
    return Math.ceil(riskfields.length / itemsPerRow)
  } else {
    return 0
  }
}

function itemsInRow(riskfields,itemsPerRow,index) {
  if(riskfields)
    return riskfields.slice((index - 1) * itemsPerRow, index * itemsPerRow)
}

function createRiskField (risktypefield) {
  var risktype = risktypefield.risktype
  var id = risktypefield.id
  var risk_type_field_name = risktypefield.risk_type_field_name
  var risk_type_field_enum = risktypefield.risk_type_field_enum
  var risk_type_field_description = risktypefield.risk_type_field_description
  var risk_field_value = ''
  if (risk_type_field_enum === 'float' || 
      risk_type_field_enum === 'currency' || 
      risk_type_field_enum === 'integer') {  
      risk_field_value = 0
  } else if (risk_type_field_enum === 'date') {
      risk_field_value = ''
  }
  /* else if (risk_type_field_enum === 'integer') {
    risk_field_value = 1 
  } */
  return new RiskFieldInstance
              (risktype, id, risk_type_field_name, 
                risk_type_field_enum, risk_type_field_description, 
                risk_field_value)    
}

function riskFieldCompare(a, b){
  var nameA=a.risk_type_field_description.toLowerCase(), nameB=b.risk_type_field_description.toLowerCase()
  if (nameA < nameB) //sort string ascending
      return -1 
  if (nameA > nameB)
      return 1
  return 0 //default return value (no sorting)
}

function setFormFields(riskfield) {
 //  return { [riskfield.risk_type_field_name]: '' }
  return { [riskfield.risk_type_field_name]: riskfield.risk_field_value }
}

function createFieldPropValidator(riskfield){
  var oValidatorBuilder = null
  if (riskfield.risk_type_field_enum === 'text') {
    oValidatorBuilder = new RequiredValidatorBuilder(riskfield.risk_type_field_name, 'blur')
  } else if (riskfield.risk_type_field_enum === 'integer') {
    oValidatorBuilder = new RequiredIntegerValidatorBuilder(riskfield.risk_type_field_name, 'blur')
  } else if (riskfield.risk_type_field_enum === 'float') {
    oValidatorBuilder = new RequiredNumberValidatorBuilder(riskfield.risk_type_field_name, 'change')
  } else if (riskfield.risk_type_field_enum === 'date') {
    oValidatorBuilder = new RequiredValidatorBuilder(riskfield.risk_type_field_name, 'change')
  }
  if (oValidatorBuilder != null) {
    var ovalidationEntry = oValidatorBuilder.build()    
  }  
  return ovalidationEntry
}

function populateFieldPropValidatorArray(riskfields) {
  var oValidatorBuilder = null     
  const filteredriskfields = riskfields.filter(riskfield => riskfield.risk_type_field_enum === 'text' ||
                                  riskfield.risk_type_field_enum === 'integer' ||
                                  riskfield.risk_type_field_enum === 'float' ||
                                  riskfield.risk_type_field_enum === 'date'
                    ) 
  const propValidators = filteredriskfields.map(createFieldPropValidator)  
  oValidatorBuilder = new RequiredValidatorBuilder('risk_name', 'blur')
  if (oValidatorBuilder != null) {
    const ovalidationEntry = oValidatorBuilder.build()
    propValidators.push(ovalidationEntry)
    oValidatorBuilder = null
  }
  console.log('propValidators' + propValidators.length)
  // return propValidators
  const propValidatorsTypeKeyValue = propValidators.reduce((acc, cur) => {
    acc[cur.key] = cur.obj
    return acc
  }, {})
  const propValidators_rules = propValidatorsTypeKeyValue
  return propValidators_rules
}

export function createsinglerisk(state = {}, action) {
  switch (action.type) {
    case createsingleriskConstants.GET_SINGLE_RISK_FROM_TYPE:
      return {
        loading: true
      };
    case createsingleriskConstants.GET_SINGLE_RISK_FROM_TYPE_SUCCESS:
      // console.log('In createsingleriskConstants.GET_SINGLE_RISK_TYPE_SUCCESS')      
      // console.log('In viewsingleriskConstants.GET_SINGLE_RISK_TYPE_SUCCESS action is' + action.risktypeinstance)      
      // console.log('risktypeinstance.risktype_risktypefields')
      // console.log(action.risktypeobj.risktype_risktypefields.length)
      let riskobj = {}
      let risktypeobj = {}
      let nRows = 0
      let splicedRiskFieldArray = []
      let propValidators_rules = []
      let inputFormFields = []
      let inputFormFieldsObj = {}
      if (action.risktypeobj && action.risktypeobj.risktype_risktypefields) {        
        // console.log('risktypeobj.risktype_risktypefields')
        // console.log(action.risktypeobj.risktype_risktypefields.length)        
        // console.log('itemsPerRow')
        // console.log(action.itemsPerRow)
        risktypeobj = action.risktypeobj
        riskobj = new Risk()       
        
        // riskobj.risktype = risktypeobj.id
        // riskobj.risk_type_name = risktypeobj.risk_type_name        
        
        const risktypefields = risktypeobj.risktype_risktypefields
        // Create Risk Fields from RiskTypeFields
        const riskfieldArray = risktypefields.map(createRiskField)        
              


        riskobj.riskfields = riskobj.riskfields.concat(riskfieldArray)
        if(riskobj && riskobj.riskfields) {
          riskobj.riskfields.sort(riskFieldCompare)
        }
        // Copy RiskFields and create Prop validators array used for UI Form validation
        const riskfields = [...riskobj.riskfields ]

        //Create inputFormFields
        inputFormFields = riskfields.map(setFormFields)
        
        //Add Risk Name Risk Description property to inputFormFields collection
        inputFormFields.push({'risk_name': ''})
        inputFormFields.push({'risk_description': ''})        
        
        //Create inputFormFields object
        for (let inputFormField of inputFormFields) {
          inputFormFieldsObj = Object.assign({}, inputFormFieldsObj, inputFormField)
        }

        propValidators_rules = populateFieldPropValidatorArray(riskfields)          
        const itemsPerRow = action.itemsPerRow

        // Split RiskFields into two dimentional array in order 
        // to render two fields per a row its configurable
        console.log('...itemsPerRow' + action.itemsPerRow)
        console.log('...action.riskfields' + riskfields.length)
        splicedRiskFieldArray = []
        let splicedRiskFields = null      
        nRows = rowCount(riskfields, action.itemsPerRow)
        console.log('nRows ' + nRows)
        
        for(let i=0; i < nRows; ++i ) {
          splicedRiskFields = itemsInRow(riskfields, itemsPerRow, i+1) 
          splicedRiskFieldArray.push([...splicedRiskFields])       
        }        
      }      
      return {
        risktype: risktypeobj.id,        
        // singlerisk: riskobj,
        rows: nRows,
        riskFieldArray: splicedRiskFieldArray,
        propValidators_rules: propValidators_rules,
        inputFormFieldsObj: inputFormFieldsObj,
        loading: false
      };
    case createsingleriskConstants.GET_SINGLE_RISK_FAILURE:
      return { 
        error: action.error
      };
    case createsingleriskConstants.RESET_CREATE_SINGLE_RISK:
      console.log('In createsingleriskConstants.RESET_CREATE_SINGLE_RISK')      
      // riskobj = new Risk()
      // riskobj.risk_name = ''
      // riskobj.risk_description = ''
      // riskobj.riskfields = []
      nRows = 0
      splicedRiskFieldArray = []
      propValidators_rules = {}               
      inputFormFields = []      
      return {
        risktype: '',
        // singlerisk: riskobj,
        rows: nRows,
        riskFieldArray: splicedRiskFieldArray,
        propValidators_rules: propValidators_rules,
        inputFormFields: inputFormFields
      };
      case createsingleriskConstants.CREATE_SINGLE_RISK:
        riskobj = new Risk()
        riskobj.risk_name = ''
        riskobj.risk_description = ''
        riskobj.riskfields = []
        if (action.inputFormFields && action.inputFormFields.length > 0) {  
          const inputFormFields = action.inputFormFields      
          Object.keys(inputFormFields).forEach((key) => {
            console.log('key is' + key + 'Having value' + inputFormFields[key]);
          });
        }
      return {
        loading: true
      };
      case createsingleriskConstants.CREATE_SINGLE_RISK_SUCCESS:
        console.log('In createsingleriskConstants.CREATE_SINGLE_RISK_SUCCESS')      
        console.log('In createsingleriskConstants.CREATE_SINGLE_RISK_SUCCESS action is' + action.output)      
        const output = action.output
        return {
          createsingleriskoutput: output,
          loading: false       
        };
      case createsingleriskConstants.CREATE_SINGLE_RISK_FAILURE:
        return { 
          error: action.error
        };
    default:
      return state
  }
}