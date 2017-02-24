import {
    POST_LOADLIST,
    POST_LOADLIST_SUCCESS,
    POST_LOADLIST_FAILURE,
    POST_LOAD,
    POST_LOAD_SUCCESS,
    POST_LOAD_FAILURE,
    POST_WRITE,
    POST_WRITE_SUCCESS,
    POST_WRITE_FAILURE,
    POST_MODIFY,
    POST_MODIFY_SUCCESS,
    POST_MODIFY_FAILURE,
    POST_REMOVE,
    POST_REMOVE_SUCCESS,
    POST_REMOVE_FAILURE
} from './actions';

export function loadListRequest(){}
export function loadList(){}
export function loadListSuccess(){}
export function loadListFailure(){}
export function loadRequest(){}
export function load(){}
export function loadSuccess(){}
export function loadFailure(){}
export function writeRequest(){}
export function write(){}
export function writeSuccess(){}
export function writeFailure(){}
export function modifyRequest(){}
export function modify(){}
export function modifySuccess(){}
export function modifyFailure(){}
export function removeRequest(){}
export function remove(){}
export function removeSuccess(){}
export function removeFailure(){}

loadListRequest = () => {
    return (dispatch) => {
        dispatch(loadList());

        return fetch('/api/post/loadList', {
            method : 'GET'
        })
            .then(res => res.json())
            .then(res => {
                if(res.success) {
                    dispatch(loadListSuccess(res.list));
                } else {
                    dispatch(loadListFailure());
                }
            })
            .catch((error) => {
                console.log(error);
                dispatch(loadListFailure());
            });
    }
};
loadList = () => {
    return {
        type : POST_LOADLIST
    }
};
loadListSuccess = (list) => {
    return {
        type : POST_LOADLIST_SUCCESS,
        list
    }
};
loadListFailure = () => {
    return {
        type : POST_LOADLIST_FAILURE
    }
};

/*
loadRequest = () => {
    return (dispatch) => {
        dispatch(load());


    }
};
load = () => {
    return {
        type : POST_LOAD
    }
};
loadSuccess = (post) => {
    return {
        type : POST_LOAD_SUCCESS,
        post
    }
};
loadFailure = () => {
    return {
        type : POST_LOAD_FAILURE
    }
};
*/

writeRequest = (post) => {
    return (dispatch) => {
        dispatch(write());

        return fetch('/api/post/write',{
            method : 'POST',
            headers : {'Content-Type' : 'application/json'},
            credentials : 'include',
            body : JSON.stringify(post)
        })
            .then(res => res.json())
            .then(res => {
                if(res.success)
                    dispatch(writeSuccess(res._id));
                else
                    dispatch(writeFailure());
            })
            .catch((error) => {
                dispatch(writeFailure());
            });
    }
};
write = () => {
    return {
        type : POST_WRITE
    }
};
writeSuccess = (_id) => {
    return {
        type : POST_WRITE_SUCCESS,
        _id
    }
};
writeFailure = () => {
    return {
        type : POST_WRITE_FAILURE
    }
};

modifyRequest = (post) => {
    return (dispatch) => {
        dispatch(modify());

        return fetch('/api/post/modify',{
            method : 'PUT',
            headers : {'Content-Type' : 'application/json'},
            credentials : 'include',
            body : JSON.stringify(post)
        })
            .then(res => res.json())
            .then(res => {
                if(res.success) {
                    dispatch(modifySuccess());
                } else {
                    dispatch(modifyFailure());
                }
            }).catch((error) => {
                console.log(error);
                dispatch(modifyFailure());
            });
    }
};
modify = () => {
    return {
        type : POST_MODIFY
    }
};
modifySuccess = () => {
    return {
        type : POST_MODIFY_SUCCESS
    }
};
modifyFailure = () => {
    return {
        type : POST_MODIFY_FAILURE
    }
};

removeRequest = (_id) => {
    return (dispatch) => {
        dispatch(remove());

        return fetch('/api/post/remove',{
            method : 'DELETE',
            headers : {'Content-Type' : 'application/json'},
            credentials : 'include',
            body : JSON.stringify({_id})
        })
            .then(res => res.json())
            .then(res => {
               if(res.success) {
                   dispatch(removeSuccess());
               } else {
                   dispatch(removeFailure());
               }
            }).catch((error) => {
                dispatch(removeFailure());
            });
    }
};
remove = () => {
    return {
        type : POST_REMOVE
    }
};
removeSuccess = () => {
    return {
        type : POST_REMOVE_SUCCESS
    }
};
removeFailure = () => {
    return {
        type : POST_REMOVE_FAILURE
    }
};
