import * as types from '../actions/actions';
import update from 'react-addons-update';

const initialState = {
    signup : {
        status : 'INIT'
    },
    session : {
        status: 'INIT',
        currentUser: null
    }
};

export default function account(state = initialState, action) {
    switch(action.type) {
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
        default :
            return state;
    }
};
