import React from 'react';
import { Header_default, Header_loggedIn, Header_loginAndSignup } from '../components';
import { loginRequest, signupRequest, sessionRequest, logoutRequest, removeRequest } from '../actions/account';
import { connect } from 'react-redux';

class Header extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            view_status : 'DEFAULT'
        };
        this.handleView = this.handleView.bind(this);
        this.handleLogin = this.handleLogin.bind(this);
        this.handleLogout = this.handleLogout.bind(this);
        this.handleSignup = this.handleSignup.bind(this);
        this.handleRemove = this.handleRemove.bind(this);

    }
    handleView(e) {
        switch(e) {
            case 'Header_default_login' :
                this.setState({
                    view_status : 'LOGIN'
                });
                break;
            case 'Header_default_signup' :
                this.setState({
                    view_status : 'SIGNUP'
                });
                break;
            case 'Header_loginAndSignup_no' :
                this.setState({
                    view_status : 'DEFAULT'
                });
                break;
            default :
                break;
        }
    }
    handleLogin() {
        let returnURI = encodeURIComponent(document.URL);
        return this.props.loginRequest(returnURI).then(
            () => {
                return this.props.login_status === 'SUCCESS';
            }
        );
    }
    handleLogout() {
        return this.props.logoutRequest().then(
            () => {
                this.props.sessionRequest();
            }
        );
    }
    handleSignup(username, password) {
        return this.props.signupRequest(username, password).then(
            () => {
                if(this.props.signup_status === 'SUCCESS') {
                    this.handleLogin(username, password);
                    return true;
                }
                else {
                    return false;
                }
            }
        )
    }
    handleRemove() {
        return this.props.removeRequest(this.props.session_currentUser).then(
            () => {
                return this.props.remove_status === 'SUCCESS';
            }
        )
    }
    componentWillReceiveProps(nextProps) {
        if(nextProps.session_currentUser) {
            this.setState({
                view_status : 'LOGGED_IN'
            });
        } else {
            if(this.state.view_status === 'LOGGED_IN'){
                this.setState({
                    view_status : 'DEFAULT'
                });
            }
        }
    }
    render() {
        let header;
        switch(this.state.view_status) {
            case 'DEFAULT' :
                header = <Header_default handleView = {this.handleView}/>;
                break;
            case 'LOGGED_IN' :
                header = <Header_loggedIn session_currentUser = {this.props.session_currentUser} onLogout = {this.handleLogout} onRemove = {this.handleRemove}/>;
                break;
            case 'LOGIN'  :
            case 'SIGNUP' :
                header = <Header_loginAndSignup handleView = {this.handleView} loginOrSignup = {this.state.view_status} onLogin = {this.handleLogin} onSignup = {this.handleSignup}/>;
                break;
            default :
                header = <Header_default handleView = {this.handleView}/>;
        }

        return (
            <div className = 'header'>
                <a href='/auth/login'>Login</a>
                { header }
            </div>
        );
    }
}
const mapStateToProps = (state) => {
    return {
        login_status : state.account.login.status,
        signup_status : state.account.signup.status,
        remove_status : state.account.remove.status,
        session_currentUser : state.account.session.currentUser
    };
};
const mapDispatchToProps = (dispatch) => {
    return {
        // loginRequest : (username, password) => {
        //     return dispatch(loginRequest(username, password));
        // }
        loginRequest : (returnURI) => {
            return dispatch(loginRequest(returnURI));
        },
        signupRequest : (username, password) => {
            return dispatch(signupRequest(username, password));
        },
        sessionRequest : () => {
            return dispatch(sessionRequest());
        },
        logoutRequest : () => {
            return dispatch(logoutRequest());
        },
        removeRequest : (username) => {
            return dispatch(removeRequest(username));
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);