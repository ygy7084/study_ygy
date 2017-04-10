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
            method : 'GET',
            headers : {
                'pragma' : 'no-cache',
                'cache-control' : 'no-cache'
            }
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


loadRequest = (id) => {
    return (dispatch) => {
        dispatch(load());
        return fetch('/api/post/load/'+id, {
            method : 'GET',
            headers : {
                'pragma' : 'no-cache',
                'cache-control' : 'no-cache'
            }
        })
            .then(res => res.json())
            .then(res => {
                if(res.success) {
                    dispatch(loadSuccess(res.post));
                } else {
                    dispatch(loadFailure());
                }
            })
            .catch((error) => {
                console.log(error);
                dispatch(loadFailure());
            });

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


writeRequest = (request) => {
    return (dispatch) => {
        dispatch(write());
        return fetch('/api/post/write',{
            method : 'POST',
            headers : {'Content-Type' : 'application/json'},
            credentials : 'include',
            body : JSON.stringify(request.body)
        })
            .then(res => res.json())
            .then(res => {
                if(res.success)
                    dispatch(writeSuccess(res.post));

                else
                    dispatch(writeFailure());
            })
            .catch((err) => {
                console.log(err);
                dispatch(writeFailure());
            });
    }
};
write = () => {
    return {
        type : POST_WRITE
    }
};
writeSuccess = (post) => {
    return {
        type : POST_WRITE_SUCCESS,
        post : post
    }
};
writeFailure = () => {
    return {
        type : POST_WRITE_FAILURE
    }
};

modifyRequest = (request) => {
    return (dispatch) => {
        dispatch(modify());

        let Fetch_Address = '/api/post/modify/'+request.mode;

        return fetch(Fetch_Address,{
            method : 'PUT',
            headers : {'Content-Type' : 'application/json'},
            credentials : 'include',
            body : JSON.stringify(request.body)
        })
            .then(res => res.json())
            .then(res => {
                if(res.success) {
                    dispatch(modifySuccess(request.index, request.body));
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
modifySuccess = (index, post) => {
    return {
        type : POST_MODIFY_SUCCESS,
        index : index,
        post : post
    }
};
modifyFailure = () => {
    return {
        type : POST_MODIFY_FAILURE
    }
};

removeRequest = (request) => {
    return (dispatch) => {
        dispatch(remove());

        return fetch('/api/post/remove',{
            method : 'DELETE',
            headers : {'Content-Type' : 'application/json'},
            credentials : 'include',
            body : JSON.stringify(request.body)
        })
            .then(res => res.json())
            .then(res => {
               if(res.success) {
                   dispatch(removeSuccess(request.index));
               } else {
                   dispatch(removeFailure());
               }
            }).catch((error) => {
                console.log(error);
                dispatch(removeFailure());
            });
    }
};
remove = () => {
    return {
        type : POST_REMOVE
    }
};
removeSuccess = (index) => {
    return {
        index : index,
        type : POST_REMOVE_SUCCESS
    }
};
removeFailure = () => {
    return {
        type : POST_REMOVE_FAILURE
    }
};
