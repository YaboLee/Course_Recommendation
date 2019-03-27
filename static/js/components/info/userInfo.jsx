import React, { Component } from 'react';

import "../../../css/home/home.css"

export default class UserInfo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userInfo: props.userInfo
        }
    }

    componentWillReceiveProps(props) {
        this.setState({
            userInfo: props.userInfo
        })
    }

    render() {
       return (
            <p className={this.props.className}>{this.state.userInfo.userName}</p>
            // {/* <p>test</p> */}
        )
    }
}