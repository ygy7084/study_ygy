import React from 'react';

class Chat extends React.Component {
    constructor(props) {
        super(props);
        this.state ={
            input : '',
            received : ''
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }
    componentDidMount() {
        this.socket = io();
        this.socket.on('chat message', (msg) => {
            this.setState({received:msg});
        })
    }
    handleSubmit(event) {
        event.preventDefault();
        this.socket.emit('chat message',this.state.input);
        this.setState({input:''});
    }
    handleChange(event) {
        this.setState({
            input : event.target.value
        });
    }
    render() {
        let view;
        view = (
            <div style={{'position':'absolute','top':'300'}}>
                <h1>{this.state.received}</h1>
                <form id='form' onSubmit={this.handleSubmit}>
                    <input type='text' id='m' autoComplete='off' value={this.state.input} onChange={this.handleChange}/>
                    <input type='submit' value='Send' />
                </form>
            </div>
        );
        return view;
    }
}

export default Chat;
