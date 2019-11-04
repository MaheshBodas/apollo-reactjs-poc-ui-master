import { viewsingleriskConstants } from '../_constants';
import { viewsingleriskService } from '../_services';
import { alertActions } from './';
export const viewsingleriskActions = {
    getRisk,
    resetSingleRisk,    
    getRisksByRiskName
};

function getRisk(riskid, itemsPerRow) {
    return dispatch => {  
        console.log('getRisk dispatch riskid ' + riskid )        
        dispatch(request(riskid));

        return viewsingleriskService.getRisk(riskid, itemsPerRow)
            .then(
                output => {
                    console.log(output)
                    dispatch(success(output.riskinstance, output.itemsPerRow));
                    dispatch(alertActions.clear());                    
                },
                error => {
                    console.log(error.toString())
                    dispatch(failure(error.toString()));
                    dispatch(alertActions.error(error.toString()));
                }
            )           
            
    };

    function request(riskid) { return { type: viewsingleriskConstants.GET_SINGLE_RISK, riskid } }
    function success(riskinstance, itemsPerRow) { return { type: viewsingleriskConstants.GET_SINGLE_RISK_SUCCESS, riskinstance, itemsPerRow } }
    function failure(error) { return { type: viewsingleriskConstants.GET_SINGLE_RISK_FAILURE, error } }
}

function resetSingleRisk() {
    return dispatch => {  
        console.log('resetSingleRisk dispatched')        
        dispatch(request());
        dispatch(alertActions.clear());
    }
    function request() { return { type: viewsingleriskConstants.RESET_VIEW_SINGLE_RISK } }
}

//getRisksByRiskName

function getRisksByRiskName(risk_name, record_count, fetchAfterCursor) {
    return dispatch => {  
        console.log('getRisksByRiskName' )   
        dispatch(request(risk_name, record_count, fetchAfterCursor));             
        viewsingleriskService.getRisksByRiskName(risk_name, record_count, fetchAfterCursor)
            .then(
                riskinstances => {                    
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

    function request(risk_name, record_count, fetchAfterCursor) { return { type: viewsingleriskConstants.RISK_AUTO_COMPLETE_KEYS, risk_name, record_count, fetchAfterCursor} }
    function success(riskinstances) { return { type: viewsingleriskConstants.RISK_AUTO_COMPLETE_SUCCESS , riskinstances} }
    function failure(error) { return { type: viewsingleriskConstants.RISK_AUTO_COMPLETE_FAILURE, error } }
}