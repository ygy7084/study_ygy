import React from 'react';

class Header_user extends React.Component {
    constructor(props) {
        super(props);
        this.handleLogin = this.handleLogin.bind(this);
        this.handleLogout = this.handleLogout.bind(this);
    }

    handleLogin() {
        let returnURI = encodeURIComponent(document.URL);
        location.href = 'auth/login?return='+returnURI;
    };
    handleLogout() {
        location.href = 'auth/logout';
    }

    render() {
        let view;
        if(this.props.user) {
            if(this.props.user.id === 'INIT')
                view = <a>Loading ...</a>;
            else
                view = <a className='username' onClick={this.handleLogout}>{this.props.user.displayName}</a>;
        }
        else {
            view = <a onClick={this.handleLogin}>Login</a>;
        }

        return view;
    }
}

export default Header_user;