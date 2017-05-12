import React from 'react';
import { PostList} from '../components';
import {
    loadListRequest,
    modifyRequest,
    removeRequest,
    socket_modifyRequest,
    socket_removeRequest} from '../actions/post';
import { connect } from 'react-redux';

class Home extends React.Component {
    constructor(props) {
        super(props);

        this.handleModify = this.handleModify.bind(this);
        this.handleModifyCoords = this.handleModifyCoords.bind(this);
        this.handleRemove = this.handleRemove.bind(this);
        this.socketInit = this.socketInit.bind(this);
    }

    componentWillMount() {
        this.props.loadListRequest();
    }

    componentDidMount() {
        if(this.props.socket) {
            this.socketInit(this.props.socket);
        }
    }
    componentWillReceiveProps(nextProps) {
        if(!this.props.socket && nextProps.socket){
            this.socketInit(nextProps.socket);
        }
    }

    socketInit(socket) {
        socket.on('modify', (modify) => {
            this.props.socket_modifyRequest(modify);
        });
        socket.on('modifyCoords', (modify) => {
            this.props.socket_modifyRequest(modify);
        });
        socket.on('remove', (remove) => {
            this.props.socket_removeRequest(remove);
        })
    }

    handleModify(post) {
        let request = {
            mode : 'content',
            body : {
                id : post.id,
                content : post.content
            }
        };
        return this.props.modifyRequest(request).then((res) => {
            if(this.props.modify.status === 'SUCCESS') {
                //socket
                this.props.socket.emit('modify',res.post);
                //
                return true;
            }
            else {
                $.notify('수정 에러');
                return false;
            }
        });
    }
    handleModifyCoords(post) {
        let request = {
            mode : 'coords',
            body : {
                id : post.id,
                coords : post.coords
            }
        };
        return this.props.modifyRequest(request).then((res) => {
            if(this.props.modify.status === 'SUCCESS') {
                //socket
                this.props.socket.emit('modifyCoords',res.post);
                //
                return true;
            }
            else {
                $.notify('수정 에러');
                return false;
            }
        });
    }

    handleRemove(post) {
        let request = {
            body : {
                id : post.id
            }
        };
        return this.props.removeRequest(request).then(
            (res) => {
                if(this.props.remove.status === 'SUCCESS') {
                    //socket
                    this.props.socket.emit('remove',res.id);
                    //
                    return true;
                } else {
                    $.notify('삭제 에러');
                    return false;
                }
            }
        );
    }

    render() {
        return (
            <div className='home'>
                <PostList socket={this.props.socket}
                          onPostMove={this.handleModifyCoords}
                          onPostRemove={this.handleRemove}
                          onPostModify={this.handleModify}
                          list={this.props.loadList.list}
                          currentUser={this.props.session.currentUser}/>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        session : {
            currentUser : state.account.session.currentUser
        },
        loadList : {
            status : state.post.loadList.status,
            list : state.post.loadList.list
        },
        modify : {
            status : state.post.modify.status
        },
        remove : {
            status : state.post.remove.status
        }
    };
};
const mapDispatchToProps = (dispatch) => {
    return {
        loadListRequest : () => {
            console.log('loadListRequest called');
            return dispatch(loadListRequest());
        },
        modifyRequest : (request) => {
            console.log('modifyRequest called');
            return dispatch(modifyRequest(request));
        },
        removeRequest : (request) => {
            console.log('removeRequest called');
            return dispatch(removeRequest(request));
        },
        socket_modifyRequest : (post) => {
            console.log('socket_modifyrequest called');
            return dispatch(socket_modifyRequest(post));
        },
        socket_removeRequest : (id) => {
            return dispatch(socket_removeRequest(id));
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);