import { riskpicklistConstants } from '../_constants';
import { riskpicklistService } from '../_services';
import { alertActions } from './';
export const riskpicklistActions = {
    getRiskFieldTypeList,
    getRiskTypeKeys,
    getRiskKeys
};

function getRiskFieldTypeList() {
    return dispatch => {  
        console.log('getRiskFieldTypeList' )        
        dispatch(request());
        riskpicklistService.getRiskFieldTypeList()
            .then(
                fieldtypeoptions => {
                    dispatch(success(fieldtypeoptions));
                    dispatch(alertActions.clear());                    
                },
                error => {
                    console.log(error.toString())
                    dispatch(failure(error.toString()));
                    dispatch(alertActions.error(error.toString()));
                }
            )           
            
    };

    function request() { return { type: riskpicklistConstants.RISK_FIELD_TYPE_LIST} }
    function success(fieldtypeoptions) { return { type: riskpicklistConstants.RISK_FIELD_TYPE_LIST_SUCCESS , fieldtypeoptions} }
    function failure(error) { return { type: riskpicklistConstants.RISK_FIELD_TYPE_LIST_FAILURE, error } }
}
function getRiskTypeKeys() {
    return dispatch => {  
        console.log('getRiskTypeKeys' ) 
        dispatch(request());
        riskpicklistService.getRiskTypeKeys()
            .then(
                risktypekeys => {                    
                    dispatch(success(risktypekeys));
                    dispatch(alertActions.clear());                    
                },
                error => {
                    console.log(error.toString())
                    dispatch(failure(error.toString()));
                    dispatch(alertActions.error(error.toString()));
                }
            )           
            
    };

    function request() { return { type: riskpicklistConstants.RISK_TYPE_KEYS} }
    function success(risktypekeys) { return { type: riskpicklistConstants.RISK_TYPE_KEYS_SUCCESS , risktypekeys} }
    function failure(error) { return { type: riskpicklistConstants.RISK_KEYS_FAILURE, error } }
}
function getRiskKeys() {
    return dispatch => {  
        console.log('getRiskKeys' )   
        dispatch(request());             
        riskpicklistService.getRiskKeys()
            .then(
                riskkeys => {                    
                    dispatch(success(riskkeys));
                    dispatch(alertActions.clear());                    
                },
                error => {
                    console.log(error.toString())
                    dispatch(failure(error.toString()));
                    dispatch(alertActions.error(error.toString()));
                }
            )           
            
    };

    function request() { return { type: riskpicklistConstants.RISK_KEYS} }
    function success(riskkeys) { return { type: riskpicklistConstants.RISK_KEYS_SUCCESS , riskkeys} }
    function failure(error) { return { type: riskpicklistConstants.RISK_KEYS_FAILURE, error } }
}

