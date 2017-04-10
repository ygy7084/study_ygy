import React from 'react';
import interact from 'interact.js'

class Post extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            coords : this.props.post.coords,
            content : this.props.post.content,
            moving : false,
            post_button_style : {
                display: 'none'
            }
        };

        this.handleClick = this.handleClick.bind(this);
        this.handleMoveStart = this.handleMoveStart.bind(this);
        this.handleMove = this.handleMove.bind(this);
        this.handleRemove = this.handleRemove.bind(this);
        this.handleModify = this.handleModify.bind(this);
        this.handleModify_View = this.handleModify_View.bind(this);
        this.handleModify_View_change = this.handleModify_View_change.bind(this);

    }

    componentDidMount() {
        if(this.props.ownership) {
            interact(document.getElementById(this.props.post.id))
                .draggable({
                    autoScroll: false,
                    onmove: dragMoveListener,
                    onstart: this.handleMoveStart,
                    onend: this.handleMove
                }).styleCursor(false);

            function dragMoveListener(event) {
                let target = event.target,
                    // keep the dragged position in the data-x/data-y attributes
                    x_coord = (parseFloat(target.getAttribute('data-x_coord')) || 0) + event.dx,
                    y_coord = (parseFloat(target.getAttribute('data-y_coord')) || 0) + event.dy;
                // translate the element
                target.style.webkitTransform =
                    target.style.transform =
                        'translate(' + x_coord + 'px, ' + y_coord + 'px)';

                // update the posiion attributes
                target.setAttribute('data-x_coord', x_coord);
                target.setAttribute('data-y_coord', y_coord);
            }
        }

        this.textarea.style.cssText = 'height:'+this.textarea.scrollHeight+'px';
    }

    handleClick() {
        this.setState({
            post_button_style:{
                display : this.state.post_button_style.display=== 'none' ? 'inline' : 'none'
            }
        });
    }
    handleMoveStart() {
        this.setState({
            moving : true
        });
    }
    handleMove(event) {
        let target = event.target;
        let post = {
            id : target.getAttribute('id'),
            index : this.props.index,
            coords : {
                x : target.getAttribute('data-x_coord'),
                y : target.getAttribute('data-y_coord')
            }
        };
        this.setState({
            coords : post.coords,
            moving : false
        });
        this.props.onPostMove(post);
    }
    handleRemove() {
        this.props.onPostRemove({id:this.props.post.id,index:this.props.index});
    }
    handleModify() {
        this.props.onPostModify({
            id:this.props.post.id,
            content:this.state.content,
            index:this.props.index
        });
        this.handleModify_View();
        this.handleClick();
    }
    handleModify_View() {
        this.setState({
            modifying : !this.state.modifying
        });
    }
    handleModify_View_change(e) {
        let value = e.target.value;
        this.setState({
            content : value
        });
        e.target.style.cssText ='height:auto; padding:0';
        e.target.style.cssText ='height:'+e.target.scrollHeight+'px';
    }
    render() {

        let coords = Object.assign({}, this.state.coords);
        let style = {
            WebkitTransform : 'translate(' + coords.x + 'px, ' + coords.y + 'px)',
            transform : 'translate(' + coords.x + 'px, ' + coords.y + 'px)'
        };
        let props = {
            'data-x_coord' : coords.x,
            'data-y_coord' : coords.y
        };

        return (
            <div {...props} style={style} className={this.props.ownership ? 'post mine' : 'post notmine'} onClick={this.handleClick} id={this.props.post.id}>
                <div className='posthead'>
                    <div className='writer'>{this.props.post.writer.displayName}</div>
                    {this.props.ownership ? <div className='delete' onClick={this.handleRemove}>X</div> : null}
                </div>
                <div className='postbody'>
                    <textarea ref={(textarea) => {this.textarea = textarea}} onChange={this.handleModify_View_change} onBlur={this.handleModify} value={this.state.content} readOnly={!this.props.ownership}/>
                </div>
            </div>
        );
    }
}

export default Post;
