import React from 'react';

class Header_default extends React.Component {
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }
    handleClick(e) {
        this.props.handleView(e.target.value);
    }
    render() {
        return (
            <div className = 'header_login_and_signup'>
                <button className = 'header_inputs' onClick = {this.handleClick} value = 'Header_default_login'>로그인</button>
                <button className = 'header_inputs' onClick = {this.handleClick} value = 'Header_default_signup'>회원가입</button>
            </div>
        );
    }
}

export default Header_default;