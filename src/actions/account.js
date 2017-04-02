import {
    ACCOUNT_LOGIN,
    ACCOUNT_LOGIN_SUCCESS,
    ACCOUNT_LOGIN_FAILURE,
    ACCOUNT_SIGNUP,
    ACCOUNT_SIGNUP_SUCCESS,
    ACCOUNT_SIGNUP_FAILURE,
    ACCOUNT_SESSION,
    ACCOUNT_SESSION_SUCCESS,
    ACCOUNT_SESSION_FAILURE,
    ACCOUNT_LOGOUT,
    ACCOUNT_LOGOUT_SUCCESS,
    ACCOUNT_LOGOUT_FAILURE,
    ACCOUNT_REMOVE,
    ACCOUNT_REMOVE_SUCCESS,
    ACCOUNT_REMOVE_FAILURE
} from './actions';

export function loginRequest() {}
export function login(){}
export function loginSuccess(){}
export function loginFailure(){}
export function signupRequest(){}
export function signup(){}
export function signupSuccess(){}
export function signupFailure(){}
export function sessionRequest(){}
export function session(){}
export function sessionSuccess(){}
export function sessionFailure(){}
export function logoutRequest(){}
export function logout(){}
export function logoutSuccess(){}
export function logoutFailure(){}
export function removeRequest(){}
export function remove(){}
export function removeSuccess(){}
export function removeFailure(){}

/*
loginRequest = (username, password) => {
 return (dispatch) => {
 dispatch(login());

 let username_and_password = {
 username,
 password
 };
 return fetch('/api/account/login', {
 method : 'POST',
 headers : {'Content-Type' : 'application/json'},
 credentials: 'include',
 body : JSON.stringify(username_and_password)
 })
 .then(res => res.json())
 .then(res => {
 if(res.success)
 dispatch(loginSuccess(username));
 else
 dispatch(loginFailure());
 }).catch((error) => {
 dispatch(loginFailure());
 });
 }
 };
 login = () => {
 return {
 type : ACCOUNT_LOGIN
 }
 };
 loginSuccess = (username) => {
 return {
 type : ACCOUNT_LOGIN_SUCCESS,
 username
 }
 };
 loginFailure = () => {
 return {
 type : ACCOUNT_LOGIN_FAILURE
 }
 };
*/
loginRequest = (returnURI) => {
    return (dispatch) => {
        dispatch(login());

        return fetch('/auth/login'+'?return='+returnURI, {method : 'GET'})
            .then(res => res.json())
            .then(res => {
                if(res.success)
                    dispatch(loginSuccess(res.profile));
                else
                    dispatch(loginFailure());
            }).catch((error) => {
                dispatch(loginFailure());
            });
    }
};
login = () => {
    return {
        type : ACCOUNT_LOGIN
    }
};
loginSuccess = (profile) => {
    return {
        type : ACCOUNT_LOGIN_SUCCESS,
        profile
    }
};
loginFailure = () => {
    return {
        type : ACCOUNT_LOGIN_FAILURE
    }
};

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

/*
sessionRequest = () => {
    return (dispatch) => {
        dispatch(session());

        return fetch('/api/account/auth', {
            method: 'GET',
            credentials: 'include'
        })
            .then(res => res.json())
            .then(res => {
                if (res.username)
                    dispatch(sessionSuccess(res.username));
                else
                    dispatch(sessionFailure());
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
sessionSuccess = (username) => {
    return {
        type : ACCOUNT_SESSION_SUCCESS,
        username
    }
};
sessionFailure = () => {
    return {
        type : ACCOUNT_SESSION_FAILURE
    }
};
*/
sessionRequest = () => {
    return (dispatch) => {
        dispatch(session());

        return fetch('/auth', {
            method: 'GET',
            credentials: 'include'
        })
            .then(res => res.json())
            .then(res => {
                if (res.profile) {
                    dispatch(sessionSuccess(res.profile));
                }
                    else
                dispatch(sessionFailure());
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

logoutRequest = () => {
    return (dispatch) => {
        dispatch(logout());

        return fetch('/auth/logout', {
            method: 'GET',
            credentials: 'include'
        })
            .then(res => res.json())
            .then(res => {
                if (res.success) {
                    dispatch(logoutSuccess());
                }
                else {
                    console.log(res.error);
                    dispatch(logoutFailure());
                }
            }).catch((error) => {
            console.log(error);
            dispatch(logoutFailure());
            })
    }
};
logout = () => {
    return {
        type : ACCOUNT_LOGOUT
    }
};
logoutSuccess = () => {
    return {
        type : ACCOUNT_LOGOUT_SUCCESS
    }
};
logoutFailure = () => {
    return {
        type : ACCOUNT_LOGOUT_FAILURE
    }
};

removeRequest = (username) => {
    return (dispatch) => {
        dispatch(remove());

        return fetch('/api/account/remove', {
            method : 'DELETE',
            headers : {'Content-Type' : 'application/json'},
            credentials : 'include',
            body : JSON.stringify({username:username})
        })
            .then(res => res.json())
            .then(res => {
                if(res.success)
                    dispatch(removeSuccess());
                else
                    dispatch(removeFailure());
            }).catch((error) => {
                console.log(error);
                dispatch(removeFailure());
            });
    }
};
remove = () => {
    return {
        type : ACCOUNT_REMOVE
    }
};
removeSuccess = () => {
    return {
        type : ACCOUNT_REMOVE_SUCCESS
    }
};
removeFailure = () => {
    return  {
        type : ACCOUNT_REMOVE_FAILURE
    }
};