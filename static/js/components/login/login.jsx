import React, { Component } from 'react';
import LoginForm from './loginForm';

export default class Login extends Component {
    render() {
       return (
        <LoginForm history={this.props.history}></LoginForm>
        )
    }
}
