import React, { Component } from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";

export default class courseDisplay extends Component {
  constructor(props) {
    super(props);
    this.state = {
      courseInfo: props.courseInfo,
      searchCourseName: null
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
          courses={this.state.courseInfo}
          searchCourseName={this.state.searchCourseName}
          courseAdd={this.props.courseAdd}
        />
      </ul>
    );
  }
}

function CourseList(props) {
  const courseList = props.courses;
  const searchCourseName = props.searchCourseName;
  const listItems = courseList.map((course, index) => (
    <li key={index}>
      <CourseEntry
        courseAdd={this.courseAdd}
        courseInfo={course}
        searchCourseName={searchCourseName}
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
      searchCourseName: props.searchCourseName,
      cardTitle: "Card Subtitle",
      cardDescription: "Some quick example text to build on the card title and make up the bulk of the card's content."
    };
  }

  componentWillReceiveProps(props) {
    if (this.props !== props) {
      this.setState(props);
    }
  }

  render() {
    const courseInfo = this.state.courseInfo;
    const searchCourseName = this.state.searchCourseName;
    const courseName = courseInfo.title;
    return (
      <Card>
        <Card.Body>
          <Card.Title>{courseName}</Card.Title>
          <Card.Subtitle className="mb-2 text-muted">
            {this.state.cardTitle}
          </Card.Subtitle>
          <Card.Text>{this.state.cardDescription}</Card.Text>
          <Button
            variant="primary"
            onClick={() =>
              this.props.courseAdd({
                name: courseName,
                title: this.state.cardTitle,
                description: this.state.cardDescription
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
