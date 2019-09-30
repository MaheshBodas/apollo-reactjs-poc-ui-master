import { createsinglerisktypeConstants } from '../_constants';
import * as validationutils from './../utils/inputvalidation'


function isDuplicateRiskTypeField (risktypefields, risktypefield) {
    var bDuplicateRiskTypeFound = true
    // var value = this.newRiskTypeField.risk_type_field_name.toLowerCase()
    var value = risktypefield.risk_type_field_name
    var iIndex = risktypefields.findIndex((node) => node.risk_type_field_name === value)
    if (iIndex === -1) {
        bDuplicateRiskTypeFound = false
    }
    return bDuplicateRiskTypeFound
  }

  function buildRiskTypeFormValidion() {
    const fieldValidationEntries = [
      { propName: 'risk_type_name', eventTriggerType: 'blur'}
    ]
    const validationKeyValuePair = validationutils.buildPropValidationKeyValueFor(fieldValidationEntries)
    return validationKeyValuePair
  }

  function buildRiskTypeFieldFormValidion() {
    const fieldValidationEntries = [
      {propName: 'risk_type_field_name', eventTriggerType: 'blur'}
    ]
    const validationKeyValuePair = validationutils.buildPropValidationKeyValueFor(fieldValidationEntries)
    return validationKeyValuePair
  }

  export function risktypefield (state = {}, action) {
    const risktypefield = action.risktypefield
    // console.log('risktypefield reducer action type')
    // console.log(action.type)
    // console.log('risktypefield reducer risktypefield')
    // console.log(risktypefield)
    switch (action.type) {
      case createsinglerisktypeConstants.ADD_RISKTYPEFIELD_SUCCESS:
        return {
          id: risktypefield.id,
          risk_type_field_name: risktypefield.risk_type_field_name,
          risk_type_field_enum: risktypefield.risk_type_field_enum,
          risk_type_field_description: risktypefield.risk_type_field_description
        };
      case createsinglerisktypeConstants.EDIT_RISKTYPEFIELD_SUCCESS:
        if (state.id !== risktypefield.id) {
          console.log('state.id !== risktypefield.id')
          console.log(state.id)
          console.log(risktypefield.id)
          return state;
        }
        console.log('state.id === risktypefield.id')
        return {
          ...state,
          risk_type_field_enum: risktypefield.risk_type_field_enum,
          risk_type_field_description: risktypefield.risk_type_field_description
        };
      default:
        return state;
    }
  };
  
  export function risktypefields (state = [], action) { 
    // let state = state.risktypefields || []
    switch (action.type) {
      case createsinglerisktypeConstants.ADD_RISKTYPEFIELD_SUCCESS:
        const bDuplicateRiskTypeFound = isDuplicateRiskTypeField(state, action.risktypefield) 
        console.log('bDuplicateRiskTypeFound')       
        console.log(bDuplicateRiskTypeFound)       
        if(bDuplicateRiskTypeFound === false) {
            console.log('...state')
            console.log(state)
            return [
                ...state,
                risktypefield(undefined, action),
              ];                
        } else {
          return state
        }
      case createsinglerisktypeConstants.EDIT_RISKTYPEFIELD_SUCCESS:
        return state.map(t =>
          risktypefield(t, action)
        );
      case createsinglerisktypeConstants.DELETE_RISKTYPEFIELD_SUCCESS:
          return state.filter(risktypefield => risktypefield.id !== action.risktypefield.id);
      default:
        return state;
    }
  };

  const initialState = {
    loading: false,
    risktypefields: [],    
  };
  export function createsinglerisktype(state = initialState, action) {
    const risktypeform = {
      risk_type_name: ''
    }
    const risktypefieldform = {
      id: undefined,
      risk_type_field_name: '',
      risk_type_field_enum: 'text',
      risk_type_field_description: ''
    }
    const risktypefieldTableColumns = [
      { label: "Field Name", minWidth: 150, prop: "risk_type_field_name" },
      { label: "Field Description", minWidth: 150, prop: "risk_type_field_description" },
      { label: "Field Enum", minWidth: 150, prop: "risk_type_field_enum" }
    ]
    let risktypename_validator = buildRiskTypeFormValidion()
    let risktypefield_validator = buildRiskTypeFieldFormValidion()
    switch (action.type) {      
      case createsinglerisktypeConstants.GET_RISKTYPE:
        return {
          loading: true,
          risktypefields: [],
        };        
        case createsinglerisktypeConstants.GET_RISKTYPE_SUCCESS:                
        return {
            risktypeform: risktypeform,
            risktypefieldform: risktypefieldform,
            risktypename_validator: risktypename_validator,
            risktypefield_validator: risktypefield_validator,
            risktypefieldTableColumns: risktypefieldTableColumns,
            // risktypefields: risktypefields(state.risktypefields,action),
            risktypefields: [],
            loading: false
          };

      case createsinglerisktypeConstants.ADD_RISKTYPEFIELD:
      case createsinglerisktypeConstants.EDIT_RISKTYPEFIELD:
      case createsinglerisktypeConstants.DELETE_RISKTYPEFIELD:
        return {
          // risktypefields: risktypefields(state.risktypefields,action),
          risktypefields: state.risktypefields,
          loading: true
        };
      case createsinglerisktypeConstants.ADD_RISKTYPEFIELD_SUCCESS:
      case createsinglerisktypeConstants.EDIT_RISKTYPEFIELD_SUCCESS:
      case createsinglerisktypeConstants.DELETE_RISKTYPEFIELD_SUCCESS:
        return {
            risktypeform: risktypeform,
            risktypefieldform: risktypefieldform,
            risktypename_validator: risktypename_validator,
            risktypefield_validator: risktypefield_validator,
            risktypefieldTableColumns: risktypefieldTableColumns,          
            risktypefields: risktypefields(state.risktypefields,action),
            loading: false
          };        
      case createsinglerisktypeConstants.RESET_SINGLE_RISK_TYPE:
      console.log('In createsinglerisktypeConstants.RESET_SINGLE_RISK_TYPE')      
      return {
        risktypeform: risktypeform,
        risktypefieldform: risktypefieldform,
        risktypename_validator: risktypename_validator,
        risktypefield_validator: risktypefield_validator,
        risktypefieldTableColumns: risktypefieldTableColumns,          
        risktypefields: [],
        loading: false
      };
      case createsinglerisktypeConstants.CREATE_SINGLE_RISK_TYPE:        
      return {
        // risktypefields: risktypefields(state.risktypefields,action),
        risktypefields: state.risktypefields,
        loading: true
      };
      case createsinglerisktypeConstants.CREATE_SINGLE_RISK_TYPE_SUCCESS:
        console.log('In createsingleriskConstants.CREATE_SINGLE_RISK_TYPE_SUCCESS')      
        console.log('In createsingleriskConstants.CREATE_SINGLE_RISK_TYPE_SUCCESS action is' + action.output)      
        const output = action.output
        return {
          createsingleriskoutput: output,
          // risktypefields: state.risktypefields,
          risktypefields: [],
          loading: false       
        };
      case createsinglerisktypeConstants.CREATE_SINGLE_RISK_TYPE_FAILURE:
        return { 
          error: action.error,
          // risktypefields: state.risktypefields,
          risktypefields: [],
          loading: false 
        };         
      default:
        return state;            
    }
} 
  
  