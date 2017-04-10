import React from 'react';
import { Header } from './';
import { sessionRequest } from '../actions/account';
import { connect } from 'react-redux';

class App extends React.Component {
    constructor(props) {
        super(props);
    }
    componentWillMount() {
        this.props.sessionRequest();
    }
    render() {
        return (
            <div>
                <Header />
                { this.props.children }
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