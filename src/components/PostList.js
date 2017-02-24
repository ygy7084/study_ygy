import React from 'react';
import Post from './Post';

class PostList extends React.Component {
    constructor(props) {
        super(props);
    };

    render() {
        const dataToComponent = data => {
            return data.map((data, i) => {
                return (<Post
                    post = {data}
                    key = {i}
                    index = {i}
                    ownership = {data.username === this.props.currentUser}
                    onPostClick = {this.props.onPostClick}
                />);
            });
        };
        return (
            <ul className = 'post_list'>
                {dataToComponent(this.props.list)}
            </ul>
        )
    }
}

export default PostList;