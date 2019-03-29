import React, { Component } from 'react';



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
                        <CourseList userCourse={this.state.userCourse} />
                ) : ("")
                }
            </div>
        )
    }
}

function CourseList(props) {
    const list = props.userCourse;
    const listItems = list.map((course, index) => (
        <li key={index}>
            {course.title + course.number}
            {course.ins}
        </li>
    ));
    return listItems;
}