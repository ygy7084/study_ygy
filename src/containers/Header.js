import React from 'react';
import { sessionRequest } from '../actions/account';
import { writeRequest } from '../actions/post'
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
        this.handleWrite = this.handleWrite.bind(this);
        this.WriteOpen = this.WriteOpen.bind(this);
        this.ChatOpen = this.ChatOpen.bind(this);
        this.handleChatRemove = this.handleChatRemove.bind(this);
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
        return this.props.writeRequest(request).then(() => {
            if(this.props.write.status === 'SUCCESS') {
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
                {this.state.chat ? <Chat handleRemove={this.handleChatRemove} currentUser={this.props.session.currentUser} /> : null}
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
            id : state.post.write.id
        },
    };
};
const mapDispatchToProps = (dispatch) => {
    return {
        sessionRequest : () => {
            return dispatch(sessionRequest());
        },
        writeRequest : (request) => {
            console.log('writeRequest called');
            return dispatch(writeRequest(request));
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);