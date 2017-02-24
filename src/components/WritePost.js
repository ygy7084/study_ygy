import React from 'react';

class WritePost extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            title : '',
            content : '',
        };
        this.handleClick = this.handleClick.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }
    handleClick() {
        return this.props.handleWriteOrModify(this.state).then(
            (success) => {
                if(success) {
                    this.setState({title : '', content : ''});
                }
            }
        )
    }
    componentWillReceiveProps(nextProps) {
        if(nextProps.post) {
            this.setState({title : nextProps.post.title, content : nextProps.post.content});
        } else if(this.props.post) {
            this.setState({title : '', content : ''})
        }
    }
    handleChange(e) {
        let nextState = {};
        nextState[e.target.name] = e.target.value;
        this.setState(nextState);
    }
    render() {
        return (
            <div>
                <textarea onChange={this.handleChange} value={this.state.title} name='title' placeholder='제목' />
                <br />
                <textarea onChange={this.handleChange} value={this.state.content} name='content' placeholder='내용' />
                <br />
                <button onClick={this.handleClick}>글쓰기</button>
            </div>
        )
    }
}

export default WritePost;