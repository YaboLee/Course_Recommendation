import React, { Component } from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";

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
      searchCourseName: props.searchCourseName,
    };
  }

  componentWillReceiveProps(props) {
    if (this.props !== props) {
      this.setState(props);
    }
  }

  render() {
    const courseInfo = this.state.courseInfo;
    const courseName = this.state.courseTitle;
    const courseSubject = this.state.courseSubject;
    const courseNumber = this.state.courseNumber;
    const courseInstructor = this.state.courseInstructor;
    console.log(courseInstructor);
    return (
      <Card>
        <Card.Body>
          <Card.Title>{courseSubject + courseNumber + " " + courseName}</Card.Title>
          <Card.Subtitle className="mb-2 text-muted">
            {this.state.cardTitle}
          </Card.Subtitle>
          <Card.Text>{this.state.cardDescription}</Card.Text>
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
        </Card.Body>
      </Card>
    );
  }
}
