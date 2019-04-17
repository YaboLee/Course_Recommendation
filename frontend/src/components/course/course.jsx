import React, { Component } from 'react';
import axios from "axios"

import Search from "./search"
import CourseDisplay from "./courseDisplay"

import "../../styles/home.css"



export default class Course extends Component {
    constructor(props) {
        super(props);
        this.searchCourse = this.searchCourse.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.state = {
            courseInfo: null,
            searchCourseName: null,
        }
    }

    searchCourse() {
        var self = this;
        axios.get('http://localhost:5000/api/searchCourse', {
            params: {
                searchCourseName: self.state.searchCourseName,
            }
        })
            .then(function (response) {
                // handle success
                var courseInfo = Object();
                courseInfo.courses = response.data.courseInfo;
                courseInfo.courseTitle = response.data.title;
                courseInfo.courseSubject = response.data.coursesubject;
                courseInfo.courseNumber = response.data.coursenumber;
                self.setState({
                    courseInfo: courseInfo,
                })
                // console.log(response.data.courseInfo);
            })
            .catch(function (error) {
                // handle error
                console.log(error);
            })
    }

    handleChange(event) {
        const name = event.target.name;
        const value = event.target.value;
        this.setState({
            [name]: value
        });
    }

    render() {
       return (
        <div>
            <Search 
                searchAPI={this.searchCourse}
                handleChange={this.handleChange} />
            {
                this.state.courseInfo ? (
                    <CourseDisplay 
                        courseInfo={this.state.courseInfo}
                        searchCourseName={this.state.searchCourseName}
                        courseAdd={this.props.courseAdd}
                        getUserCourse={this.props.getUserCourse} />
                ) : ("") 
            }
            
        </div>
        )
    }
}