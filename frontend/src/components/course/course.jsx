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

    checkAvailable() {
        var self = this;
        axios.get("http://localhost:5000/api/available", {
            params: {
                searchCourseName: self.state.searchCourseName,
            }
        })
        .then(function (response) {
            const availble = response.data.data.availble;
            self.setState({
                availble: availble,
            })
        })
        .catch(function (error) {
            console.log(error);
        })
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
                courseInfo.courses = response.data.data.courseInfo;
                courseInfo.courseTitle = response.data.data.title;
                courseInfo.courseSubject = response.data.data.coursesubject;
                courseInfo.courseNumber = response.data.data.coursenumber;
                const stat = response.data.data.result;
                self.setState({
                    courseInfo: courseInfo,
                    stat: stat,
                })
                self.checkAvailable();
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
                        getUserCourse={this.props.getUserCourse}
                        userName={this.props.userName}
                        history={this.props.history}
                        stat={this.state.stat} 
                        availble={this.state.availble}    
                    />
                ) : ("") 
            }
            
        </div>
        )
    }
}