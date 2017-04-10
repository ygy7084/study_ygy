import {
    ACCOUNT_SIGNUP,
    ACCOUNT_SIGNUP_SUCCESS,
    ACCOUNT_SIGNUP_FAILURE,
    ACCOUNT_SESSION,
    ACCOUNT_SESSION_SUCCESS,
    ACCOUNT_SESSION_FAILURE
} from './actions';

export function signupRequest(){}
export function signup(){}
export function signupSuccess(){}
export function signupFailure(){}
export function sessionRequest(){}
export function session(){}
export function sessionSuccess(){}
export function sessionFailure(){}

signupRequest = (username, password) => {
    return (dispatch) => {
        dispatch(signup());
        return fetch('/api/account/signup', {
            method : 'POST',
            headers : {'Content-Type' : 'application/json'},
            credentials : 'include',
            body : JSON.stringify({username, password})
        })
            .then(res => res.json())
            .then(res => {
                if(res.success)
                    dispatch(signupSuccess());
                else
                    dispatch(signupFailure());
            }).catch((error) => {
                console.log(error);
                dispatch(signupFailure());
            });
    }
};
signup = () => {
    return {
        type : ACCOUNT_SIGNUP
    }
};
signupSuccess = () => {
    return {
        type : ACCOUNT_SIGNUP_SUCCESS
    }
};
signupFailure = () => {
    return {
        type : ACCOUNT_SIGNUP_FAILURE
    }
};

sessionRequest = () => {
    return (dispatch) => {
        dispatch(session());

        return fetch('/auth', {
            method: 'GET',
            credentials: 'include',
            headers : {
                'pragma' : 'no-cache',
                'cache-control' : 'no-cache'
            }
        })
            .then(res => res.json())
            .then(res => {
                res.profile ? dispatch(sessionSuccess(res.profile)) : dispatch(sessionSuccess(null));
            }).catch((error) => {
                dispatch(sessionFailure());
            });
    }
};
session = () => {
    return {
        type : ACCOUNT_SESSION
    }
};
sessionSuccess = (profile) => {
    return {
        type : ACCOUNT_SESSION_SUCCESS,
        profile
    }
};
sessionFailure = () => {
    return {
        type : ACCOUNT_SESSION_FAILURE
    }
};
