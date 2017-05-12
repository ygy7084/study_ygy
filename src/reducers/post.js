import * as types from '../actions/actions';
import update from 'react-addons-update';

const initialState = {
    loadList : {
        status : 'INIT',
        list : null
    },
    load : {
        status : 'INIT',
        post : null
    },
    write : {
        status : 'INIT',
        id : null
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
            let obj = {};
            action.list.forEach((item) => {
               obj[item.id] = item;
            });
            return update(state, {
                loadList : {
                    status : { $set : 'SUCCESS' },
                    list : { $set : obj }
                }
            });
        case types.POST_LOADLIST_FAILURE :
            return update(state, {
                loadList : {
                    status : { $set : 'FAILURE' }
                }
            });
        case types.POST_LOAD :
            return update(state, {
                load : {
                    status : { $set : 'WAITING' }
                }
            });
        case types.POST_LOAD_SUCCESS :
            return update(state, {
                load : {
                    status : { $set : 'SUCCESS' },
                    post : { $set : action.post }
                }
            });
        case types.POST_LOAD_FAILURE :
            return update(state, {
                load : {
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
                    post : {$set:action.post}
                },
                loadList : {
                    list : {
                        [action.post.id] : {$set : action.post}
                    }
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
                },
                loadList : {
                    list : {
                        [action.post.id] : {$merge : action.post}
                    }
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
            let newlist = JSON.parse(JSON.stringify(state.loadList.list));
            delete newlist[action.id];
            return update(state, {
                remove : {
                    status : { $set : 'SUCCESS'}
                },
                loadList : {
                    list : { $set:newlist }
                }
            });
        case types.POST_REMOVE_FAILURE :
            return update(state, {
                remove : {
                    status : { $set : 'FAILURE' }
                }
            });
        case types.SOCKET_POST_WRITE_SUCCESS :
            return update(state, {
                loadList : {
                    list : {
                        [action.post.id] : {$set : action.post}
                    }
                }
            });

        case types.SOCKET_POST_MODIFY_SUCCESS :
            return update(state, {
                loadList : {
                    list : {
                        [action.post.id] : {$merge : action.post}
                    }
                }
            });

        case types.SOCKET_POST_REMOVE_SUCCESS :
            newlist = JSON.parse(JSON.stringify(state.loadList.list));
            delete newlist[action.id];
            return update(state, {
                loadList : {
                    list : { $set:newlist }
                }
            });
        default :
            return state;
    }
};