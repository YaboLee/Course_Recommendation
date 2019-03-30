import React, { Component } from "react";
import axios from "axios";

import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faThumbsUp} from "@fortawesome/free-solid-svg-icons"

export default class courseDisplay extends Component {
  constructor(props) {
    super(props);
    this.state = {
      courseInfo: props.courseInfo,
      searchCourseName: null,
    };
  }

  componentWillReceiveProps(props) {
    if (this.props !== props) {
      this.setState(props);
    }
  }

  render() {
    return (
      <ul>
        <CourseList
          courseInfo={this.state.courseInfo}
          searchCourseName={this.state.searchCourseName}
          courseAdd={this.props.courseAdd}
          getUserCourse={this.props.getUserCourse}
        />
      </ul>
    );
  }
}

function CourseList(props) {
  const courseInfo = props.courseInfo;
  const courseList = courseInfo.courses;
  const searchCourseName = props.searchCourseName;
  const listItems = courseList.map((course, index) => (
    <li key={index}>
      <CourseEntry
        courseAdd={props.courseAdd}
        courseInfo={course}
        courseTitle={courseInfo.courseTitle}
        courseSubject={courseInfo.courseSubject}
        courseNumber={courseInfo.courseNumber}
        courseInstructor={course.instructor}
        courseGPA={course.GPA}
        searchCourseName={searchCourseName}
        getUserCourse={props.getUserCourse}
      />
    </li>
  ));
  return listItems;
}

class CourseEntry extends Component {
  constructor(props) {
    super(props);
    this.state = {
      courseInfo: props.courseInfo,
      courseTitle: props.courseTitle,
      courseSubject: props.courseSubject,
      courseNumber: props.courseNumber,
      courseInstructor: props.courseInstructor,
      courseGPA: props.courseGPA,
      searchCourseName: props.searchCourseName,
      likes: 0
    };
  }

  componentWillReceiveProps(props) {
    if (this.props !== props) {
      this.setState(props);
    }
  }

  handleThumbsUp(props) {
    var self = this;
    // console.log(props);
    axios.post('/api/thumbsUp', {
        // userName: self.userName,
        courseName: props.courseName,
        courseSubject: props.courseSubject,
        courseNumber: props.courseNumber,
        courseInstructor: props.courseInstructor
    })
        .then(function (response) {
          // console.log(response);
            // self.getUserCourse();
            var likes = self.state.likes;
            self.setState({
            likes: likes+1
          })
          
        })
        .catch(function (error) {
            console.log(error);
        })
  }

  render() {
    const courseInfo = this.state.courseInfo;
    const courseName = this.state.courseTitle;
    const courseSubject = this.state.courseSubject;
    const courseNumber = this.state.courseNumber;
    const courseInstructor = this.state.courseInstructor;
    const courseGPA = this.state.courseGPA;
    const courseLikes = this.state.likes;
    return (
      <Card>
        <Card.Body>
          <Card.Title>{courseSubject + courseNumber + " " + courseName}</Card.Title>
          <Card.Subtitle className="mb-2 text-muted">
            {courseInstructor}
          </Card.Subtitle>
          <Card.Text>GPA: {courseGPA}</Card.Text>
          <Card.Text>Likes: {courseLikes}</Card.Text>
          <Button
            variant="primary"
            onClick={() =>
              this.props.courseAdd({
                courseName: courseName,
                courseSubject: courseSubject,
                courseNumber: courseNumber,
                courseInstructor: courseInstructor
              })
            }
          >
            Add to plan
          </Button>
          <FontAwesomeIcon 
            onClick={() => this.handleThumbsUp({
              courseName: courseName,
              courseSubject: courseSubject,
              courseNumber: courseNumber,
              courseInstructor: courseInstructor
            })}
            icon={faThumbsUp} />
        </Card.Body>
      </Card>
    );
  }
}
