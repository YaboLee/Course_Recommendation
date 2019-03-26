import React, { Component } from 'react';
import Course from "./course/course"
import "../../css/home/info.css"

export default class Home extends Component {
    constructor(props) {
        super(props);
    }
    render() {
       return (
        <div>
            <p className="info">aaa</p>
            <Course className="course"></Course>
        </div>
        )
    }
}