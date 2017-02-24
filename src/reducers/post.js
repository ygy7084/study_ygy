import * as types from '../actions/actions';
import update from 'react-addons-update';

const initialState = {
    loadList : {
        status : 'INIT',
        list : []
    },
    /*
    load : {
        status : 'INIT'
    },*/
    write : {
        status : 'INIT',
        _id : undefined
    },
    modify : {
        status : 'INIT'
    },
    remove : {
        status : 'INIT'
    }
};

export default function post(state = initialState, action) {
    switch(action.type) {
        case types.POST_LOADLIST :
            return update(state, {
                loadList : {
                    status : { $set : 'WAITING' }
                }
            });
        case types.POST_LOADLIST_SUCCESS :
            return update(state, {
                loadList : {
                    status : { $set : 'SUCCESS' },
                    list : { $set : action.list }
                }
            });
        case types.POST_LOADLIST_FAILURE :
            return update(state, {
                loadList : {
                    status : { $set : 'FAILURE' }
                }
            });
        case types.POST_WRITE :
            return update(state, {
                write : {
                    status : { $set : 'WAITING' }
                }
            });
        case types.POST_WRITE_SUCCESS :
            return update(state, {
                write : {
                    status : { $set : 'SUCCESS' },
                    _id : { $set : action._id }
                }
            });
        case types.POST_WRITE_FAILURE :
            return update(state, {
                write : {
                    status : { $set : 'FAILURE' }
                }
            });
        case types.POST_MODIFY :
            return update(state, {
                modify : {
                    status : { $set : 'WAITING' }
                }
            });
        case types.POST_MODIFY_SUCCESS :
            return update(state, {
                modify : {
                    status : { $set : 'SUCCESS' }
                }
            });
        case types.POST_MODIFY_FAILURE :
            return update(state, {
                modify : {
                    status : { $set : 'FAILURE' }
                }
            });
        case types.POST_REMOVE :
            return update(state, {
                remove : {
                    status : { $set : 'WAITING' }
                }
            });
        case types.POST_REMOVE_SUCCESS :
            return update(state, {
                remove : {
                    status : { $set : 'SUCCESS'}
                }
            });
        case types.POST_REMOVE_FAILURE :
            return update(state, {
                remove : {
                    status : { $set : 'FAILURE' }
                }
            });
        default :
            return state;
    }
};