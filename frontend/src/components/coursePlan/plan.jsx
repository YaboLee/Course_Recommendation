import React, { Component } from 'react';
import Button from "react-bootstrap/Button";

export default class Plan extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userCourse: null,
            logedin: false,
            userName: null,
        }
    }

    componentWillReceiveProps(nextProps) {
        const oriProps = this.props;
        if (this.props !== nextProps) {
            this.setState(nextProps)
        } 
    }

    

    render() {
        return (
            <div>
                {
                    this.state.userCourse ? (
                        <CourseList 
                            userCourse={this.state.userCourse}
                            courseDelete={this.props.courseDelete}
                            getUserCourse={this.props.getUserCourse} />
                ) : ("")
                }
            </div>
        )
    }
}

function CourseList(props) {
    const list = props.userCourse;
    // console.log(list);
    const listItems = list.map((course, index) => (
        <li key={index}>
            <div onClick={() => props.courseDelete({
                // courseName: courseName,
                courseSubject: course.courseSubject,
                courseNumber: course.courseNumber,
                courseInstructor: course.courseInstructor
            })}>
                {course.courseSubject + course.courseNumber}
                {course.courseInstructor}
            </div>
        </li>
    ));
    return listItems;
}