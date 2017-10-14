import React from 'react';
import { Header } from './';
import { sessionRequest } from '../actions/account';
import { connect } from 'react-redux';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            socket:undefined
        };
        this.makeSocket = this.makeSocket.bind(this);
    }
    makeSocket() {
        let socket = io('http://220.230.112.62:3001', {'forceNew':true, 'reconnection': true, 'reconnectionDelay': 500,});
        socket.on('connect', () => {
            console.log('connect');
        });
        socket.on('disconnect', () => {
            console.log('disconnect');
            setTimeout(() => {
                console.log('reconnecting');
                if(this.state.socket) {
                    this.state.socket.destroy();
                    delete this.state.socket;
                    this.setState({socket:null});
                }
                this.makeSocket();
            }, 500);
        });
        this.setState({socket:socket});
    }
    componentWillMount() {
        this.props.sessionRequest();
        this.makeSocket();
    }
    render() {
        console.log(this.state.socket);
        return (
            <div>
                <Header socket={this.state.socket}/>
                {React.cloneElement(this.props.children, {socket:this.state.socket})}
            </div>
        )
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        sessionRequest : () => {
            return dispatch(sessionRequest());
        }
    };
};

export default connect(null, mapDispatchToProps)(App);