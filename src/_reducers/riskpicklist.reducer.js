import { riskpicklistConstants } from '../_constants';

export function riskpicklist(state = {}, action) {
  switch (action.type) {
    case riskpicklistConstants.RISK_FIELD_TYPE_LIST:
      return {
        loading: true
      };
    case riskpicklistConstants.RISK_FIELD_TYPE_LIST_SUCCESS:
      console.log('In riskpicklistConstants.RISK_FIELD_TYPE_LIST_SUCCESS')      
      // console.log('In riskpicklistConstants.RISK_FIELD_TYPE_LIST_SUCCESS action is' + action.fieldtypeoptions, action.selectedValue)      
      const fieldtypeoptions = [...action.fieldtypeoptions]
      return {
        fieldtypeoptions: fieldtypeoptions,
        loading: false      
      };
    case riskpicklistConstants.RISK_FIELD_TYPE_LIST_FAILURE:
      return { 
        error: action.error
      };    
    case riskpicklistConstants.RISK_TYPE_KEYS:
      return {
        loading: true
      };
    case riskpicklistConstants.RISK_TYPE_KEYS_SUCCESS:
      console.log('In riskpicklistConstants.RISK_TYPE_KEYS_SUCCESS')      
      // console.log('In riskpicklistConstants.RISK_TYPE_KEYS_SUCCESS action is' + action.risktypekeys)      
      const risktypekeys = [...action.risktypekeys]
      return {
        risktypekeys: risktypekeys,
        loading: false        
      };
    case riskpicklistConstants.RISK_TYPE_KEYS_FAILURE:
      return { 
        error: action.error
      };    
    case riskpicklistConstants.RISK_KEYS:
      return {
        loading: true
      };    
    case riskpicklistConstants.RISK_KEYS_SUCCESS:
      console.log('In riskpicklistConstants.RISK_KEYS_SUCCESS')      
      // console.log('In riskpicklistConstants.RISK_KEYS_SUCCESS action is' + action.riskkeys)      
      const riskkeys = [...action.riskkeys]
      return {
        riskkeys: riskkeys, 
        loading: false       
      };
    case riskpicklistConstants.RISK_KEYS_FAILURE:
      return { 
        error: action.error
      };        
    default:
      return state
  }
}