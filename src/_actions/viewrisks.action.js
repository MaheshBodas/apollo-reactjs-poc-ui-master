import { viewrisksConstants } from '../_constants';
import { viewallrisksService } from '../_services';
import { alertActions } from './';
export const viewRisksActions = {
    getRisks,
    getNextRisks,
    getPrevRisks,
    resetRisks
};

function getRisks(risk_type_id, record_count, fetchAfterCursor) {
    return dispatch => {  
        console.log('getRisks dispatch risk_type_id ' + risk_type_id )        
        dispatch(request(risk_type_id, record_count, fetchAfterCursor));

        return viewallrisksService.getRisks(risk_type_id, record_count, fetchAfterCursor)
            .then(
                riskinstances => {
                    console.log(riskinstances);
                    dispatch(success(riskinstances));
                    dispatch(alertActions.clear());                    
                },
                error => {
                    console.log(error.toString())
                    dispatch(failure(error.toString()));
                    dispatch(alertActions.error(error.toString()));
                }
            )           
            
    };

    function request(risk_type_id, record_count, fetchAfterCursor) { return { type: viewrisksConstants.GET_RISKS, risk_type_id, record_count, fetchAfterCursor } }
    function success(riskinstances) { return { type: viewrisksConstants.GET_RISKS_SUCCESS, riskinstances } }
    function failure(error) { return { type: viewrisksConstants.GET_RISKS_FAILURE, error } }
}

function getNextRisks(risk_type_id, record_count, fetchAfterCursor) {
    return dispatch => {  
        console.log('getNextRisks dispatch risk_type_id ' + risk_type_id )        
        dispatch(request(risk_type_id, record_count, fetchAfterCursor));

        return viewallrisksService.getRisks(risk_type_id, record_count, fetchAfterCursor)
            .then(
                riskinstances => {
                    console.log(riskinstances);
                    dispatch(success(riskinstances, fetchAfterCursor));
                    dispatch(alertActions.clear());                    
                },
                error => {
                    console.log(error.toString())
                    dispatch(failure(error.toString()));
                    dispatch(alertActions.error(error.toString()));
                }
            )           
            
    };

    function request(risk_type_id, record_count, fetchAfterCursor) { return { type: viewrisksConstants.GET_NEXT_RISKS, risk_type_id, record_count, fetchAfterCursor } }
    function success(riskinstances, fetchAfterCursor) { return { type: viewrisksConstants.GET_NEXT_RISKS_SUCCESS, riskinstances, fetchAfterCursor } }
    function failure(error) { return { type: viewrisksConstants.GET_NEXT_RISKS_FAILURE, error } }
}

function getPrevRisks(risk_type_id, record_count, fetchAfterCursor) {
    return dispatch => {  
        console.log('getPrevRisks dispatch risk_type_id ' + risk_type_id )        
        dispatch(request(risk_type_id, record_count, fetchAfterCursor));

        return viewallrisksService.getRisks(risk_type_id, record_count, fetchAfterCursor)
            .then(
                riskinstances => {
                    console.log(riskinstances);
                    dispatch(success(riskinstances, fetchAfterCursor));                    
                    dispatch(alertActions.clear());                    
                },
                error => {
                    console.log(error.toString())
                    dispatch(failure(error.toString()));
                    dispatch(alertActions.error(error.toString()));
                }
            )           
            
    };

    function request(risk_type_id, record_count, fetchAfterCursor) { return { type: viewrisksConstants.GET_PREV_RISKS, risk_type_id, record_count, fetchAfterCursor } }    
    function success(riskinstances, fetchAfterCursor) { return { type: viewrisksConstants.GET_PREV_RISKS_SUCCESS, riskinstances, fetchAfterCursor } }
    function failure(error) { return { type: viewrisksConstants.GET_PREV_RISKS_FAILURE, error } }
}

function resetRisks() {
    return dispatch => {  
        console.log('resetRisks dispatched')        
        dispatch(request());
        dispatch(success());
        dispatch(alertActions.clear());
    }
    function request() { return { type: viewrisksConstants.RESET_RISKS } }
    function success() { return { type: viewrisksConstants.RESET_RISKS_SUCCESS } }
}
