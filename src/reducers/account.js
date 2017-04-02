import * as types from '../actions/actions';
import update from 'react-addons-update';

const initialState = {
    login : {
        status : 'INIT'
    },
    signup : {
        status : 'INIT'
    },
    session : {
        status : 'INIT',
        currentUser : ''
    },
    logout : {
        status : 'INIT'
    },
    remove : {
        status : 'INIT'
    }
};

export default function account(state = initialState, action) {
    switch(action.type) {
        case types.ACCOUNT_LOGIN :
            return update(state, {
                login : {
                    status : { $set : 'WAITING' }
                }
            });
        case types.ACCOUNT_LOGIN_SUCCESS :
            return update(state, {
                login : {
                    status : { $set : 'SUCCESS' }
                }
            });
        case types.ACCOUNT_LOGIN_FAILURE :
            return update(state, {
                login : {
                    status : { $set : 'FAILURE' }
                }
            });
        case types.ACCOUNT_SIGNUP :
            return update(state, {
                signup : {
                    status : { $set : 'WAITING'}
                }
            });
        case types.ACCOUNT_SIGNUP_SUCCESS :
            return update(state, {
               signup : {
                   status : { $set : 'SUCCESS' }
               }
            });
        case types.ACCOUNT_SIGNUP_FAILURE :
            return update(state, {
                signup : {
                    status : { $set : 'FAILURE' }
                }
            });
        case types.ACCOUNT_SESSION :
            return update(state, {
                session : {
                    status : { $set : 'WAITING' }
                }
            });
        case types.ACCOUNT_SESSION_SUCCESS :
            return update(state, {
                session : {
                    status : { $set : 'SUCCESS' },
                    currentUser : { $set : action.profile }
                }
            });
        case types.ACCOUNT_SESSION_FAILURE :
            return update(state, {
                session : {
                    status : { $set : 'FAILURE' },
                    currentUser : { $set : undefined}
                }
            });
        case types.ACCOUNT_LOGOUT :
            return update(state, {
                logout : {
                    status : { $set : 'WAITING'}
                }
            });
        case types.ACCOUNT_LOGOUT_SUCCESS :
            return update(state, {
                logout : {
                    status : { $set : 'SUCCESS'}
                }
            });
        case types.ACCOUNT_LOGOUT_FAILURE :
            return update(state, {
                logout : {
                    status : { $set : 'FAILURE'}
                }
            });
        case types.ACCOUNT_REMOVE :
            return update(state, {
                remove : {
                    status : { $set : 'WAITING'}
                }
            });
        case types.ACCOUNT_REMOVE_SUCCESS :
            return update(state, {
                session : {
                    currentUser : { $set : undefined }
                },
                remove : {
                    status : { $set : 'SUCCESS'}
                }
            });
        case types.ACCOUNT_REMOVE_FAILURE :
            return update(state, {
                remove : {
                    status : { $set : 'FAILURE'}
                }
            });
        default :
            return state;
    }
};
