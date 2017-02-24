import React from 'react';

class ShowThePost extends React.Component {
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }
    handleClick(e) {
        if(e.target.name === 'modify') {
            this.props.onModify();
        } else if(e.target.name === 'remove') {
            this.props.onRemove();
        } else {
            return
        }
    }
    render() {
        let post_modify_and_remove = (
            <div id='post_modify_and_remove'>
                <button name='modify' onClick={this.handleClick} className="post_inputs" style={{float:'left'}}>수정</button>
                <button name='remove' onClick={this.handleClick} className="post_inputs">삭제</button>
            </div>
        );
        return (
            <div>
                <p className='post_username'>{this.props.post.username}</p>
                <p className='post_title'>{this.props.post.title}</p>
                <p className='post_content'>{this.props.post.content}</p>
                {this.props.currentUser && (this.props.currentUser === this.props.post.username) ? post_modify_and_remove : undefined}
            </div>
        )
    }
}

export default ShowThePost;