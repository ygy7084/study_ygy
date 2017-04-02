import React from 'react';
import { PostList, ShowThePost, WritePost } from '../components';
import { loadListRequest, writeRequest, modifyRequest, removeRequest } from '../actions/post';
import { connect } from 'react-redux';

class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            post : {
                title : undefined,
                content : undefined,
                username : undefined,
                _id : undefined
            },
            modify : false
        };

        this.handlePostClick = this.handlePostClick.bind(this);
        this.handleWriteOrModify = this.handleWriteOrModify.bind(this);
        this.handleModify = this.handleModify.bind(this);
        this.handleRemove = this.handleRemove.bind(this);
    }
    componentWillMount() {
        interact('.draggable')
            .draggable({
                snap: {
                    targets: [
                        { x: 20, y: 450, range: 50 }
                    ],
                    endOnly: true
                },
                autoScroll: true,
                // call this function on every dragmove event
                onmove: dragMoveListener

            });
        function dragMoveListener (event) {
            var target = event.target,
                // keep the dragged position in the data-x/data-y attributes
                x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx,
                y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy;

            // translate the element
            target.style.webkitTransform =
                target.style.transform =
                    'translate(' + x + 'px, ' + y + 'px)';

            // update the posiion attributes
            target.setAttribute('data-x', x);
            target.setAttribute('data-y', y);
        }
        window.dragMoveListener = dragMoveListener;
        this.props.loadListRequest();
    }
    handlePostClick(post) {
        this.setState({
            post : {
                title : post.title,
                content : post.content,
                username : post.username,
                _id : post._id
            },
            modify : false
        });
    }
    handleWriteOrModify(post) {
        let post_with_Information = {
            title : post.title,
            content : post.content,
            username : this.props.session.currentUser,
            _id : undefined
        };

        if(this.state.modify) {
            post_with_Information._id = this.state.post._id;
            return this.props.modifyRequest(post_with_Information).then(() => {
                if(this.props.modify.status === 'SUCCESS') {
                    this.handlePostClick(post_with_Information);
                    this.props.loadListRequest();
                    return true;
                }
                else {
                    $.notify('수정 에러');
                    return false;
                }
            });
        }else {
            return this.props.writeRequest(post_with_Information).then(() => {
                if(this.props.write.status === 'SUCCESS') {
                    post_with_Information._id = this.props.write._id;
                    this.handlePostClick(post_with_Information);
                    this.props.loadListRequest();
                    return true;
                }
                else {
                    $.notify('글쓰기 에러');
                    return false;
                }
            });
        }
    }
    handleModify() {
        this.setState({
            modify : !this.state.modify
        });
    }
    handleRemove() {
        return this.props.removeRequest(this.state.post._id).then(
            () => {
                if(this.props.remove.status === 'SUCCESS') {
                    this.setState({
                        post : {
                            title : undefined,
                            content : undefined,
                            username : undefined,
                            _id : undefined
                        },
                        modify : false
                    });
                    this.props.loadListRequest();
                    return true;
                }
            }
        );
    }
    render() {
        console.log('Why it is called 4 times?');
        let view_WritePost = undefined;
        if(this.props.session.currentUser) {
            if(this.state.modify) {
                view_WritePost = <WritePost currentUser={this.props.session.currentUser} handleWriteOrModify={this.handleWriteOrModify} post={this.state.post} />
            } else {
                view_WritePost = <WritePost currentUser={this.props.session.currentUser} handleWriteOrModify={this.handleWriteOrModify} />
            }
        }
        return (
            <div className='home'>
                <div className='home_half'>
                    <PostList list={this.props.loadList.list} onPostClick={this.handlePostClick} currentUser={this.props.session.currentUser}/>
                </div>
                <div className='home_half'>
                    <ShowThePost post={this.state.post} currentUser={this.props.session.currentUser} onModify={this.handleModify} onRemove={this.handleRemove}/>
                    <hr />
                    {this.state.modify ? <h1>수정</h1> : undefined}
                    {view_WritePost}
                </div>
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
        write : {
            status : state.post.write.status,
            _id : state.post.write._id
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
            return dispatch(loadListRequest());
        },
        writeRequest : (post) => {
            return dispatch(writeRequest(post));
        },
        modifyRequest : (post) => {
            return dispatch(modifyRequest(post));
        },
        removeRequest : (_id) => {
            return dispatch(removeRequest(_id));
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);