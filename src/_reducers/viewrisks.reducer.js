import { viewrisksConstants } from '../_constants';
import * as utilsfunc from '../utils/commonutils'
import { Stack } from '../utils/stack'

// function riskCompare(a, b) {
//   var nameA=a.node.risk_name.toLowerCase(), nameB=b.node.risk_name.toLowerCase()
//   if (nameA < nameB) //sort string ascending
//       return -1 
//   if (nameA > nameB)
//       return 1
//   return 0 //default return value (no sorting)
// }

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
function createRiskTableRow(edgeInstance) {
  var riskTableRow = {}
  let riskinstance = edgeInstance.node
  riskinstance.risk_riskfields.sort(riskFieldCompare)
  riskinstance.risk_riskfields = riskinstance.risk_riskfields.map(formatRiskField)
  riskTableRow['risk_name'] = riskinstance.risk_name
  riskTableRow['risk_description'] = riskinstance.risk_description
  for(let riskField of riskinstance.risk_riskfields){
    riskTableRow[riskField.risk_type_field_name] = riskField.risk_field_value
  }
  return riskTableRow
}

function processRiskInstances(riskinstances, riskInstancesTable, riskInstanceTableColumns, pageInfo) {                  
    let riskFieldColumns = []       
    console.log('processRiskInstances')
    console.log(riskinstances)
    if (riskinstances.edges && riskinstances.edges.length > 0) {
        pageInfo.endCursor = riskinstances.pageInfo.endCursor
        pageInfo.hasNextPage = riskinstances.pageInfo.hasNextPage
        // riskinstances.edges.sort(riskCompare)
        riskInstancesTable = riskinstances.edges.map(createRiskTableRow)         
        var riskinstance = riskinstances.edges[0].node
        if (riskinstance.risk_riskfields && riskinstance.risk_riskfields.length > 0) {          
          var riskfields = riskinstance.risk_riskfields
          riskFieldColumns = riskfields.map(getRiskTableColumn) 
          riskInstanceTableColumns.push(...riskFieldColumns)         
        }
    }
    return {      
      pageInfo: pageInfo,
      riskInstancesTable: riskInstancesTable,
      riskInstanceTableColumns: riskInstanceTableColumns,
    }
}

const initialState = {
  loading: false,
  isForward: true,
  risk_type_id: 0,
  record_count: 0,
  riskInstancesTable: [],
  columnNames: [],
  stack : new Stack(),
  pageInfo: {
    lastFetchedCursor: undefined,
    endCursor: undefined,
    hasNextPage: false,
    hasPreviousPage: false
  }  
};
export function viewrisks(state = initialState, action) {
  let riskInstancesTable = []       
  let riskInstanceTableColumns = [
                                  { label: "Risk Name", width: 150, fixed: 'left', prop: "risk_name" },
                                  { label: "Risk Description", width: 225, fixed: 'left', prop: "risk_description" }
                                ]
  switch (action.type) {
    case viewrisksConstants.GET_RISKS:   
    let risk_type_id = action.risk_type_id
    let record_count = action.record_count
      let stateNew = Object.assign({}, state, {loading: true}, {risk_type_id: risk_type_id}, {record_count: record_count});
      return stateNew     
    case viewrisksConstants.GET_NEXT_RISKS:
        if(!state.isForward){
          state.stack.push(undefined)
        }
        stateNew = Object.assign({}, state, {loading: true});
        return stateNew
    case viewrisksConstants.GET_PREV_RISKS:
      console.log("Requesting using lastFetchedCursor value")
      console.log(state.pageInfo.lastFetchedCursor)
      if(state.isForward ){
          state.pageInfo.lastFetchedCursor = state.stack.pop()
      }
      stateNew = Object.assign({}, state, {loading: true}, {isForward: false});
      return stateNew
    case viewrisksConstants.GET_RISKS_SUCCESS:
      console.log('In viewrisksConstants.GET_RISKS_SUCCESS')      
      let riskinstances = action.riskinstances      
      let output = processRiskInstances(riskinstances, riskInstancesTable, riskInstanceTableColumns, state.pageInfo )
      console.log('viewrisksConstants.GET_RISKS_SUCCESS state')
      console.log(state)
      state.pageInfo = output.pageInfo
      state.pageInfo.lastFetchedCursor = undefined
      state.stack.push(state.pageInfo.lastFetchedCursor)
      state.pageInfo.hasPreviousPage = false
      stateNew = Object.assign({}, state, {loading: false}, {isForward: true}, {riskInstancesTable: output.riskInstancesTable} ,
                 {riskInstanceTableColumns: output.riskInstanceTableColumns},
                 {pageInfo: output.pageInfo} ); 
      console.log('stateNew')
      console.log(stateNew)
      return stateNew           
    case viewrisksConstants.GET_NEXT_RISKS_SUCCESS:
      console.log('In viewrisksConstants.GET_NEXT_RISKS_SUCCESS')            
      riskinstances = action.riskinstances    
      let prevFetchCursor = action.fetchAfterCursor
      output = processRiskInstances(riskinstances, riskInstancesTable, riskInstanceTableColumns, state.pageInfo )
      if(output.pageInfo.hasNextPage) {
        state.stack.push(prevFetchCursor)
        state.pageInfo.lastFetchedCursor = state.pageInfo.endCursor        
      } else {
         state.pageInfo.lastFetchedCursor = state.stack.peek()
      }
      state.pageInfo.hasPreviousPage = !(state.stack.isEmpty())
      stateNew = Object.assign({}, state, {loading: false}, {isForward: true}, {riskInstancesTable: output.riskInstancesTable} ,
        {riskInstanceTableColumns: output.riskInstanceTableColumns},
        {pageInfo: output.pageInfo} );
      return stateNew       
    //
    case viewrisksConstants.GET_PREV_RISKS_SUCCESS:
      console.log('In viewrisksConstants.GET_PREV_RISKS_SUCCESS')            
      riskinstances = action.riskinstances      
      output = processRiskInstances(riskinstances, riskInstancesTable, riskInstanceTableColumns, state.pageInfo )
      // if(!(state.stack.isEmpty())) {        
      // if(state.stack.peek() !== undefined) {
      // !(state.stack.isEmpty()          
      state.pageInfo.hasPreviousPage = !(state.stack.isEmpty()) 
      state.pageInfo.lastFetchedCursor = state.stack.pop() 
      console.log('Stack content')
      let stackContent = state.stack.printStack()
      console.log(stackContent)
      

      stateNew = Object.assign({}, state, {loading: false}, {isForward: false}, {riskInstancesTable: output.riskInstancesTable} ,
        {riskInstanceTableColumns: output.riskInstanceTableColumns},
        {pageInfo: output.pageInfo} );
      return stateNew    
    //
    
    case viewrisksConstants.GET_RISKS_FAILURE:
    case viewrisksConstants.GET_NEXT_RISKS_FAILURE:
    case viewrisksConstants.GET_PREV_RISKS_FAILURE:              
      return { 
        error: action.error,
        loading: false
    };
    case viewrisksConstants.RESET_RISKS:
      console.log(state)
      stateNew = Object.assign({}, state, {loading: true});
      return stateNew
    case viewrisksConstants.RESET_RISKS_SUCCESS:
      console.log('In viewallrisksConstants.RESET_ALL_RISKS')     
      // riskInstancesTable = []
      // riskInstanceTableColumns = []
      stateNew = Object.assign({}, state, {loading: false}, {stack: new Stack([])}, {riskInstancesTable:[]} , {riskInstanceTableColumns: []} );
      return stateNew
        // riskInstancesTable: riskInstancesTable,
        // columnNames: riskInstanceTableColumns,
        // loading: false
      
    case viewrisksConstants.RESET_RISKS_FAILURE:
      return { 
          error: action.error,
          loading: false
      };
    default:
      return state
  }
}