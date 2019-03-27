import React, { Component } from 'react';
import axios from "axios"

import Search from "./search"
import CourseDisplay from "./courseDisplay"

import "../../../css/home/home.css"



export default class Course extends Component {
    constructor(props) {
        super(props);
        this.searchCourse = this.searchCourse.bind(this);
        this.state = {
            courseInfo: null,
        }
    }

    searchCourse() {
        var self = this;
        axios.get('/api/searchCourse?courseSubject=CS&courseNumber=241')
            .then(function (response) {
                // handle success
                self.setState({
                    courseInfo: response.data.courseInfo,
                })
            })
            .catch(function (error) {
                // handle error
                console.log(error);
            })
            .then(function () {
                // always executed
            });
    }

    render() {
       return (
        <div>
            <Search searchAPI={this.searchCourse}></Search>
            <CourseDisplay courseInfo={this.state.courseInfo}></CourseDisplay>
        </div>
        )
    }
}