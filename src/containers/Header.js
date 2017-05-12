import React from 'react';
import { sessionRequest } from '../actions/account';
import { writeRequest, socket_writeRequest} from '../actions/post'
import { connect } from 'react-redux';
import { Header_User, WritePost} from '../components';
import Chat from "../components/Chat";

class Header extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            write : false,
            chat : false
        };
        this.socketInit = this.socketInit.bind(this);
        this.handleWrite = this.handleWrite.bind(this);
        this.WriteOpen = this.WriteOpen.bind(this);
        this.ChatOpen = this.ChatOpen.bind(this);
        this.handleChatRemove = this.handleChatRemove.bind(this);
    }
    componentDidMount() {
        if(this.props.socket) {
            this.socketInit(this.props.socket);
        }
    }
    socketInit(socket) {
        socket.on('write', (write) => {
            this.props.socket_writeRequest(write)
        });
    }
    handleWrite(post, x, y) {
        this.setState({write : !this.state.write});
        let request = {
            body : {
                content : post.content,
                writer : this.props.session.currentUser,
                coords : {
                    x:x,
                    y:y
                }
            }
        };
        return this.props.writeRequest(request).then((res) => {
            if(this.props.write.status === 'SUCCESS') {
                this.props.socket.emit('write',res.post);
                return true;
            }
            else {
                $.notify('글쓰기 에러');
                return false;
            }
        });
    }
    WriteOpen() {
        this.setState({write:!this.state.write});
    }
    ChatOpen() {
        this.setState({chat:!this.state.chat});
    }
    handleChatRemove() {
        this.setState({chat:!this.state.chat});
    }
    render() {
        return (
            <div className = 'header'>
                <div className='menu'>
                    {this.props.session.currentUser ? <a className='writepost_button' onClick={this.WriteOpen}>Write</a>: null}
                    {this.props.session.currentUser ? <a className='chat_button' onClick={this.ChatOpen}>Chat</a>: null}
                </div>
                <Header_User user={this.props.session.currentUser}/>
                {this.state.write ? <WritePost handleWrite={this.handleWrite} /> : null}
                {this.state.chat ? <Chat socket={this.props.socket} handleRemove={this.handleChatRemove} currentUser={this.props.session.currentUser} /> : null}
            </div>
        );
    }
}
const mapStateToProps = (state) => {
    return {
        session : {
            currentUser : state.account.session.currentUser
        },
        write : {
            status : state.post.write.status,
            post : state.post.write.post
        },
    };
};
const mapDispatchToProps = (dispatch) => {
    return {
        sessionRequest : () => {
            return dispatch(sessionRequest());
        },
        writeRequest : (request) => {
            console.log('writeRequest called - header');
            return dispatch(writeRequest(request));
        },
        socket_writeRequest : (post) => {
            console.log('socketWriteRequest called - header');
            return dispatch(socket_writeRequest(post));
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);