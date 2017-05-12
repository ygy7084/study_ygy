import React from 'react';
import Post_Mine from './Post_Mine'
import Post_NotMine from './Post_NotMine';

class PostList extends React.Component {
    constructor(props) {
        super(props);
    };
    render() {
        const dataToComponent = postlist => {
            if(postlist) {
                let arr = [];
                for(let post in postlist) {
                    if(!postlist[post].writer)
                    if (this.props.currentUser && this.props.currentUser.displayName===postlist[post].writer.displayName)
                        arr.push(<Post_Mine
                            post={postlist[post]}
                            key={postlist[post].id}
                            onPostMove={this.props.onPostMove}
                            onPostRemove={this.props.onPostRemove}
                            onPostModify={this.props.onPostModify}
                            socket={this.props.socket}
                        />);
                    else
                        arr.push(<Post_NotMine
                            post={postlist[post]}
                            key={postlist[post].id}
                        />);
                }
                return arr;
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