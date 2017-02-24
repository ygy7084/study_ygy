import React from 'react';

class Post extends React.Component {
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }
    handleClick() {
        this.props.onPostClick(this.props.post);
    }
    render() {
        return (
            <li className = {this.props.ownership ? 'draggable li_mine' : 'draggable'} onClick={this.handleClick}>
                {this.props.post.title + ' - ' +this.props.post.username}
            </li>
        );
    }
}

export default Post;
