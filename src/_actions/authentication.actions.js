import { authenticationConstants } from '../_constants';
import { authenticationService } from '../_services';
import { alertActions } from './';
import { history } from '../_helpers';

export const authenticationActions = {
    login,
    logout,    
    getUserDetails
};

function login(username, password) {
    return dispatch => {
        dispatch(request(username));
        dispatch(alertActions.clear());
        authenticationService.login(username, password)
            .then(
                user => { 
                    dispatch(success(user));
                    dispatch(alertActions.clear());
                    history.push('/');
                },
                error => {
                    console.log(error.toString())
                    dispatch(failure(error.toString()));
                    dispatch(alertActions.error(error.toString()));
                }
            );
    };

    function request(user) { return { type: authenticationConstants.LOGIN_REQUEST, user } }
    function success(user) { return { type: authenticationConstants.LOGIN_SUCCESS, user } }
    function failure(error) { return { type: authenticationConstants.LOGIN_FAILURE, error } }
}

function logout() {
    return dispatch => {
        authenticationService.logout()
            .then(
                () => { 
                    dispatch(success());
                    dispatch(alertActions.clear());
                    // history.push('/login');
                },
                error => {
                    console.log(error.toString())
                    // dispatch(failure(error.toString()));
                    dispatch(alertActions.error(error.toString()));
                }
            );
    };
    function success() { return { type: authenticationConstants.LOGOUT }  }    
}


function getUserDetails(userName) {
    return dispatch => {
        dispatch(request(userName));

        authenticationService.getUserDetails(userName)            
            .then(                
                userDetail => dispatch(success(userDetail)),
                error => dispatch(failure(error.toString()))
            );
    };

    function request(userName) { return { type: authenticationConstants.GET_USER_DETAIL_REQUEST, userName } }
    function success(userDetail) { return { type: authenticationConstants.GET_USER_DETAIL_REQUEST_SUCCESS, userDetail } }
    function failure(error) { return { type: authenticationConstants.GET_USER_DETAIL_REQUEST_FAILURE, error } }
}
