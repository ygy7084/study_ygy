import React from 'react';

class WritePost extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            content : '',
            style : this.props.style
        }
        ;
        this.handleClick = this.handleClick.bind(this);
        this.handleChange = this.handleChange.bind(this);

    }

    componentDidMount() {
        this.textarea.focus();
    }

    handleClick() {
        let coords = this.textarea.getBoundingClientRect();
        return this.props.handleWrite(this.state, coords.left, coords.top);

    }

    handleChange(e) {
        let nextState = {};
        nextState[e.target.name] = e.target.value;
        this.setState(nextState);
        e.target.style.cssText ='height:auto; padding:0';
        e.target.style.cssText ='height:'+e.target.scrollHeight+'px';
    }
    render() {

        return (
            <div className='writepost' style={this.props.style}>
                <div>
                    <textarea ref={(textarea)=>{this.textarea = textarea;}} onChange={this.handleChange} value={this.state.content} name='content' placeholder='내용' />
                </div>
                <button onClick={this.handleClick}>글쓰기</button>
            </div>
        )
    }
}

export default WritePost;