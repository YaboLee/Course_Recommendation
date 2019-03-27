import React, { Component } from 'react';
export default class courseDisplay extends Component {
    constructor(props) {
        super(props);
        this.state = {
            courseInfo: props.courseInfo,
        }
    }

    componentWillReceiveProps(props) {
        this.setState({
            courseInfo: props.courseInfo
        })
    }

    render() {
       return (
            <p>{this.state.courseInfo}</p>
        )
    }
}