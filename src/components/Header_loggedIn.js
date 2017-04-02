import React from 'react';

class Header_loggedIn extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div className = 'header_loggedIn'>
                <div className = 'header_user'>{this.props.session_currentUser.displayName}</div>
                <div className = 'header_logout_and_remove'>
                    <button className = 'header_inputs' onClick = {this.props.onLogout}>로그아웃</button>
                    <button className = 'header_inputs' onClick = {this.props.onRemove}>회원삭제</button>
                </div>
            </div>
        )
    }
}

export default Header_loggedIn;