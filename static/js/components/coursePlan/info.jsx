import React, { Component } from 'react';
import UserInfo from "./userInfo"

import "../../../css/home/home.css"


export default class Info extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userInfo: props.userInfo,
            coursePlans: null,
        }
    }

    componentWillReceiveProps(props) {
        this.setState({
            userInfo: props.userInfo
        })
    }

    render() {
        return (
            <UserInfo 
                userInfo={this.state.userInfo} 
                className="userInfo">
            </UserInfo>
        )
    }
}