import React from 'react';
import Post from './Post';

class PostList extends React.Component {
    constructor(props) {
        super(props);
    };
    shouldComponentUpdate(nextProps, nextState) {
        return JSON.stringify(nextProps) !== JSON.stringify(this.props);
    }
    render() {
        const dataToComponent = postlist => {
            if(postlist && Array.isArray(postlist)) {
                return postlist.map((post, i) => {
                    return (<Post
                        post = {post}
                        key = {post.id}
                        index = {i}
                        ownership = {this.props.currentUser ? post.writer.id === this.props.currentUser.id : false}
                        onPostMove = {this.props.onPostMove}
                        onPostRemove = {this.props.onPostRemove}
                        onPostModify = {this.props.onPostModify}
                    />);
                });
            }
            else
                return null;
        };
        return (
            <div className = 'post_list'>
                {dataToComponent(this.props.list)}
            </div>
        )
    }
}

export default PostList;