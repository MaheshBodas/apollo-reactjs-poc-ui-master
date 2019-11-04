import { viewallrisksConstants } from '../_constants';
import * as utilsfunc from '../utils/commonutils'

function riskFieldCompare(a, b){
  var nameA=a.risk_type_field_description.toLowerCase(), nameB=b.risk_type_field_description.toLowerCase()
  if (nameA < nameB) //sort string ascending
      return -1 
  if (nameA > nameB)
      return 1
  return 0 //default return value (no sorting)
}

function appendCurrencySymbol(curvalue) {
  if (arguments.length === 0) {
    return null
  }
  var floatVal = parseFloat(curvalue)
  return '$ ' + floatVal.toFixed(2).replace(/(\d)(?=(\d{3})+(?:\.\d+)?$)/g, '$1,')
}

function getRiskTableColumn (riskfield) {
  return {
    label: utilsfunc.capitalize(riskfield.risk_type_field_description),                
    width: 200,
    prop: riskfield.risk_type_field_name
  }
}

function formatRiskField(riskField) {  
  if(riskField.risk_type_field_enum === 'currency') {
    riskField.risk_field_value = appendCurrencySymbol(riskField.risk_field_value)
  }
  return riskField
}
function createRiskTableRow(riskinstance) {
  var riskTableRow = {}
  riskinstance.risk_riskfields.sort(riskFieldCompare)
  riskinstance.risk_riskfields = riskinstance.risk_riskfields.map(formatRiskField)
  riskTableRow['risk_name'] = riskinstance.risk_name
  riskTableRow['risk_description'] = riskinstance.risk_description
  for(let riskField of riskinstance.risk_riskfields){
    riskTableRow[riskField.risk_type_field_name] = riskField.risk_field_value
  }
  return riskTableRow
}

export function viewallrisks(state = {}, action) {
  switch (action.type) {
    case viewallrisksConstants.GET_ALL_RISKS:
      return {
        loading: true
    };
    case viewallrisksConstants.GET_ALL_RISKS_SUCCESS:
      console.log('In viewallrisksConstants.GET_ALL_RISKS_SUCCESS')      
      // console.log('In viewallrisksConstants.GET_ALL_RISKS_SUCCESS action is' + action.riskinstances)      
      let riskinstances = action.riskinstances      
      let riskInstancesTable = riskinstances.map(createRiskTableRow)      
      let riskInstanceTableColumns = [
                                      { label: "Risk Name", width: 150, fixed: 'left', prop: "risk_name" },
                                      { label: "Risk Description", width: 225, fixed: 'left', prop: "risk_description" }
                                    ]
      let riskFieldColumns = []
      let risktype = ''
      if (riskinstances && riskinstances.length > 0) {
          var riskinstance = riskinstances[0]
          if (riskinstance.risk_riskfields && riskinstance.risk_riskfields.length > 0) {
            risktype =   riskinstance.risktype
            var riskfields = riskinstance.risk_riskfields
            riskFieldColumns = riskfields.map(getRiskTableColumn) 
            riskInstanceTableColumns.push(...riskFieldColumns)         
          }
      }
      return {
        risktype: risktype,
        riskInstancesTable: riskInstancesTable,
        riskInstanceTableColumns: riskInstanceTableColumns,
        loading: false
      };    
    case viewallrisksConstants.GET_ALL_RISKS_FAILURE:
      return { 
        error: action.error,
        loading: false
    };
    case viewallrisksConstants.RESET_ALL_RISKS:
      return {
          loading: true
      };    
    case viewallrisksConstants.RESET_ALL_RISKS_SUCCESS:
      console.log('In viewallrisksConstants.RESET_ALL_RISKS')     
      riskInstancesTable = []
      riskInstanceTableColumns = []
      return {
        riskInstancesTable: riskInstancesTable,
        columnNames: riskInstanceTableColumns,
        loading: false
      };
    case viewallrisksConstants.RESET_ALL_RISKS_FAILURE:
      return { 
          error: action.error,
          loading: false
      };
    default:
      return state
  }
}