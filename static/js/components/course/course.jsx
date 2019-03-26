import React, { Component } from 'react';
import "../../../css/home/course.css"

import Search from "./search"

import CourseDisplay from "./courseDisplay"

export default class Course extends Component {
    constructor(props) {
        super(props);
    }
    render() {
       return (
        <div>
            <Search></Search>
            <CourseDisplay></CourseDisplay>
        </div>
        )
    }
}