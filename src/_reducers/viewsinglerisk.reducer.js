import { viewsingleriskConstants } from '../_constants';
import { RiskFieldInstance } from '../utils/riskfieldinstance'
import { Risk } from '../utils/risk'

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

const initialState = {
    riskobj : new Risk(0,0,'','','',[]),
    nRows : 0,
    splicedRiskFieldArray : null,
    riskInstancesTable: [],
    risk_name: '',
    pageInfo: {
      lastFetchedCursor: undefined,
      endCursor: undefined,
      hasNextPage: false,
      hasPreviousPage: false
    }
  }
  
function createRiskTableRow(edgeInstance) {  
  let riskinstance = edgeInstance.node  
  return riskinstance
}

function processRiskInstances(riskinstances, riskInstancesTable, pageInfo) {                  
    console.log('processRiskInstances')
    console.log(riskinstances.edges)
    console.log('processRiskInstances pageInfo')
    console.log(pageInfo)
    
    if (riskinstances.edges && riskinstances.edges.length > 0) {
        pageInfo.endCursor = riskinstances.pageInfo.endCursor
        pageInfo.hasNextPage = riskinstances.pageInfo.hasNextPage        
        riskInstancesTable = riskinstances.edges.map(createRiskTableRow)
    }
    return {      
      pageInfo: pageInfo,
      riskInstancesTable: riskInstancesTable,      
    }
}


export function viewsinglerisk(state = initialState, action) {  
  switch (action.type) {
    case viewsingleriskConstants.GET_SINGLE_RISK:      
      let stateNew = Object.assign({}, state, {loading: true});
      return stateNew
    case viewsingleriskConstants.GET_SINGLE_RISK_SUCCESS:
      console.log('In viewsingleriskConstants.GET_SINGLE_RISK_SUCCESS')      
      console.log('In viewsingleriskConstants.GET_SINGLE_RISK_SUCCESS action is' + action.riskinstance)      
      console.log('riskinstance.risk_riskfields')
      console.log(action.riskinstance.risk_riskfields.length)
      let riskobj = {}
      let nRows = 0
      let splicedRiskFieldArray = []
      if (action.riskinstance && action.riskinstance.risk_riskfields) {
        console.log('riskinstance.risk_riskfields')
        console.log(action.riskinstance.risk_riskfields.length)
        console.log('itemsPerRow')
        console.log(action.itemsPerRow)
        riskobj = new Risk()
        riskobj.id = action.riskinstance.id
        riskobj.risktype = action.riskinstance.risktype
        riskobj.risk_type_name = action.riskinstance.risk_type_name
        riskobj.risk_name = action.riskinstance.risk_name
        riskobj.risk_description = action.riskinstance.risk_description
        // Populate RiskFields collection from data received from server
        const risk_riskfields = [...action.riskinstance.risk_riskfields]
        for (const riskfield of risk_riskfields) {
          var { risktypefield, risk_type_field_name, risk_type_field_description,  risk_type_field_enum, risk_field_value } =
                  { risktypefield: riskfield.risktypefield,
                    risk_type_field_name: riskfield.risk_type_field_name,
                    risk_type_field_description: riskfield.risk_type_field_description,
                    risk_type_field_enum: riskfield.risk_type_field_enum,
                    risk_field_value: riskfield.risk_field_value }
          if (risk_type_field_enum === 'currency') {
            risk_field_value = parseFloat(riskfield.risk_field_value)
          }
          var riskFieldInstance = new RiskFieldInstance(riskobj.risktype,
            risktypefield,
            risk_type_field_name,
            risk_type_field_enum,
            risk_type_field_description,
            risk_field_value)
          // console.log(riskInstance)
          riskobj.riskfields.push(riskFieldInstance)          
        }
      
        if(riskobj && riskobj.riskfields) {
          // Sort riskfields by risk_type_field_description
          riskobj.riskfields.sort(function(a, b){
              var nameA=a.risk_type_field_description.toLowerCase(), nameB=b.risk_type_field_description.toLowerCase()
              if (nameA < nameB) //sort string ascending
                  return -1 
              if (nameA > nameB)
                  return 1
              return 0 //default return value (no sorting)
            })
        }
        const itemsPerRow = action.itemsPerRow
        const riskfields = [...riskobj.riskfields ]        
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
      stateNew = Object.assign({}, state, 
        { riskid: riskobj.id },
        { singlerisk: riskobj },
        { rows: nRows },
        { riskFieldArray: splicedRiskFieldArray },
        { loading: false });
      return stateNew
    case viewsingleriskConstants.GET_SINGLE_RISK_FAILURE:
      return { 
        error: action.error,
        loading: false
      };
    case viewsingleriskConstants.RESET_VIEW_SINGLE_RISK:
      console.log('In viewsingleriskConstants.RESET_VIEW_SINGLE_RISK')      
      riskobj = new Risk()
      riskobj.risk_name = ''
      riskobj.risk_description = ''
      riskobj.riskfields = []
      nRows = 0
      splicedRiskFieldArray = null
      stateNew = Object.assign({}, state, 
        { riskid: riskobj.id },
        { singlerisk: riskobj },
        { rows: nRows },
        { riskFieldArray: splicedRiskFieldArray },
        { loading: false });
      return stateNew      
    case viewsingleriskConstants.RISK_AUTO_COMPLETE_KEYS: 
      let risk_name = action.risk_name     
      stateNew = Object.assign({}, state, {loading: true}, {risk_name: risk_name});
      return stateNew
    case viewsingleriskConstants.RISK_AUTO_COMPLETE_SUCCESS:
      console.log('In viewsingleriskConstants.RISK_AUTO_COMPLETE_SUCCESS')      
      const riskinstances = action.riskinstances
      console.log('RISK_AUTO_COMPLETE_SUCCESS state')
      console.log(state)
      // let riskinstances = action.riskinstances      
      state.riskInstancesTable = []
      let output = processRiskInstances(riskinstances, state.riskInstancesTable, state.pageInfo)
      console.log('output')
      console.log(output)
      state.pageInfo = output.pageInfo
      stateNew = Object.assign({}, state, {loading: false}, {riskinstances: output.riskInstancesTable} ,        
                  {pageInfo: output.pageInfo} ); 
      return stateNew
    case viewsingleriskConstants.RISK_AUTO_COMPLETE_FAILURE:
      return { 
        error: action.error,
        loading: false
      };
    default:
      return state
  }
}

export default viewsinglerisk