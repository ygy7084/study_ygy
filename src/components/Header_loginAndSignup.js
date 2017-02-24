import React from 'react';

class Header_loginAndSignup extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username : '',
            password : ''
        };
        this.handleClick = this.handleClick.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }
    handleClick(e) {
        if(e.target.value === 'Header_loginAndSignup_ok') {
            if(!this.state.username || this.state.username === ''){
                $('.header_inputs_id').notify('아이디를 입력하세요',{position:'top center'});
            }
            else if(!this.state.password || this.state.password === '') {
                $('.header_inputs_password').notify('비밀번호를 입력하세요',{position:'top center'});
            }
            else if(this.props.loginOrSignup === 'LOGIN'){
               return this.props.onLogin(this.state.username, this.state.password).then(
                   (success) => {
                        if(!success) {
                            $.notify('로그인 실패', {position:'top center'});
                            this.setState({
                                username : '',
                                password : ''
                            });
                        }
                   }
               )
            }
            else {
                return this.props.onSignup(this.state.username, this.state.password).then(
                    (success) => {
                        if(!success) {
                            $.notify('회원가입 실패', {position:'top center'});
                            this.setState({
                                username : '',
                                password : ''
                            });
                        }
                    }
                )
            }
        }
        else if(e.target.value === 'Header_loginAndSignup_no') {
            this.props.handleView(e.target.value);
        }
    }
    handleChange(e) {
        let nextState = {};
        nextState[e.target.name] = e.target.value;
        this.setState(nextState);
    }
    render() {
        return (
            <div className = 'header_loginAndSignup'>
                <div className = 'header_informloginAndSignup'>{this.props.loginOrSignup === 'LOGIN' ? '로그인' : '회원가입'}</div>
                <div className = 'header_id_and_password'>
                    <input
                        type = 'text'
                        name = 'username'
                        className = 'header_inputs header_inputs_id'
                        placeholder = '아이디'
                        onChange = {this.handleChange}
                        value = {this.state.username} />
                    <input
                        type = 'password'
                        name = 'password'
                        className = 'header_inputs header_inputs_password'
                        placeholder = '비밀번호'
                        onChange = {this.handleChange}
                        value = {this.state.password}/>
                </div>
                <div className = 'header_ok_and_no'>
                    <button
                        className = 'header_inputs'
                        onClick = {this.handleClick}
                        value = 'Header_loginAndSignup_ok'>확인</button>
                    <button
                        className = 'header_inputs'
                        onClick = {this.handleClick}
                        value = 'Header_loginAndSignup_no'>취소</button>
                </div>
            </div>
        );
    }
}

export default Header_loginAndSignup;