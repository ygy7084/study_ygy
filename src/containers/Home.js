import React from 'react';
import { PostList } from '../components';
import { loadListRequest, modifyRequest, removeRequest } from '../actions/post';
import { connect } from 'react-redux';

class Home extends React.Component {
    constructor(props) {
        super(props);

        this.handleModify = this.handleModify.bind(this);
        this.handleModifyCoords = this.handleModifyCoords.bind(this);
        this.handleRemove = this.handleRemove.bind(this);
    }

    componentWillMount() {
        this.props.loadListRequest();
    }

    handleModify(post) {
        let request = {
            mode : 'content',
            index : post.index,
            body : {
                id : post.id,
                content : post.content
            }
        };
        return this.props.modifyRequest(request).then(() => {
            if(this.props.modify.status === 'SUCCESS') {
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
            index : post.index,
            body : {
                id : post.id,
                coords : post.coords
            }
        };
        return this.props.modifyRequest(request).then(() => {
            if(this.props.modify.status === 'SUCCESS') {
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
            index : post.index,
            body : {
                id : post.id
            }
        };
        return this.props.removeRequest(request).then(
            () => {
                if(this.props.remove.status === 'SUCCESS') {
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
                <PostList onPostMove={this.handleModifyCoords} onPostRemove={this.handleRemove} onPostModify={this.handleModify} list={this.props.loadList.list} currentUser={this.props.session.currentUser}/>
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
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);