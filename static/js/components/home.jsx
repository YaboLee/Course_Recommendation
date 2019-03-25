import React, { Component } from 'react';
export default class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            msg: "hello"
        }
    }
    handleClick(props) {
        alert(props.msg);
    }
    render() {
       return (
        <button props={this.state.msg} onClick={(msg) => this.handleClick(msg)}>
            Click Me!
        </button>
        )
    }
}