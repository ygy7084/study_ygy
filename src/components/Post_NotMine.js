import React from 'react';

class Post_NotMine extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.textarea.style.cssText = 'height:'+this.textarea.scrollHeight+'px';
    }

    render() {

        let coords = Object.assign({}, this.props.post.coords);
        let style = {
            WebkitTransform : 'translate(' + coords.x + 'px, ' + coords.y + 'px)',
            transform : 'translate(' + coords.x + 'px, ' + coords.y + 'px)'
        };
        return (
            <div style={style} className='post notmine' id={this.props.post.id}>
                <div className='posthead'>
                    <div className='writer'>{this.props.post.writer.displayName}</div>
                </div>
                <div className='postbody'>
                    <textarea ref={(textarea) => {this.textarea = textarea}} value={this.props.post.content} readOnly={true}/>
                </div>
            </div>
        );
    }
}

export default Post_NotMine;
