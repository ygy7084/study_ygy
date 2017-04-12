import React from 'react';
import interact from 'interact.js'

class Chat extends React.Component {
    constructor(props) {
        super(props);
        this.state ={
            coords : {x:0,y:50},
            input : '',
            chat : []
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleClear = this.handleClear.bind(this);
        this.handleRemove = this.handleRemove.bind(this);
    }
    componentDidMount() {
        interact(this.chat)
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

        this.socket = io('http://175.192.236.206:8081');
        this.socket.on('chat', (chat) => {
            this.setState({chat: this.state.chat.concat(chat)})
        })
    }
    componentWillUnmount() {
        this.socket.close();
    }
    componentDidUpdate() {
        this.chatlist.scrollTop = this.chatlist.scrollHeight;
    }
    handleSubmit(event) {
        event.preventDefault();
        this.socket.emit('chat',{
            user:this.props.currentUser.displayName,
            message:this.state.input
        });
        this.setState({input:''});
    }
    handleChange(event) {
        this.setState({
            input : event.target.value
        });
    }
    handleClear() {
        this.setState({
            chat:[]
        });
    }
    handleRemove() {
        this.props.handleRemove();
    }
    render() {

        let view;
        view = (
            <div className='div_chatlist' ref={(chat) => {this.chat = chat;}} >
                <div className='delete' onClick={this.handleRemove}>X</div>
                <h4>CHAT</h4>
                <ul className='chatlist' ref={(chatlist) => {this.chatlist = chatlist;}}>
                    {this.state.chat.map((item, i) => {
                        return <li className='chatlist_li' key={i}>{item.user+' : '+item.message}</li>
                    })}
                </ul>
                <form className='form_chatlist' onSubmit={this.handleSubmit}>
                    <input className='text_chatlist' type='text' placeholder='Write' autoComplete='off' value={this.state.input} onChange={this.handleChange}/>
                    <input className='btn_chatlist' type='submit' value='Send' />
                </form>
            </div>
        );
        return view;
    }
}

export default Chat;
