import React, { Component } from "react";
import axios from "axios";

import "../../styles/stat.css"
import ReactChartkick, {
LineChart,
PieChart,
ColumnChart
} from "react-chartkick";
import Chart from "chart.js";



import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faThumbsUp} from "@fortawesome/free-solid-svg-icons"
import TextField from '@material-ui/core/TextField';

ReactChartkick.addAdapter(Chart);


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
    const available = this.props.available ? "available" : "inavailable";
    const availableText = available ? "available" : "not available"
    return (
      <div>
        <div className={available}>
          {availableText}
        </div>
        <LineChart data={this.props.stat} />
        <ul>
          <CourseList
            courseInfo={this.state.courseInfo}
            searchCourseName={this.state.searchCourseName}
            courseAdd={this.props.courseAdd}
            getUserCourse={this.props.getUserCourse}
            userName={this.props.userName}
            history={this.props.history}
          />
        </ul>
      </div>
      
    );
  }
}

function CourseList(props) {
  const courseInfo = props.courseInfo;
  const courseList = courseInfo.courses;
  const searchCourseName = props.searchCourseName;
  // console.log(courseList);
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
        courseLikes={course.LIKES}
        searchCourseName={searchCourseName}
        getUserCourse={props.getUserCourse}
        userName={props.userName}
        history={props.history}
      />
    </li>
  ));
  return listItems;
}

class CourseEntry extends Component {
  constructor(props) {
    super(props);
    this.handleComment = this.handleComment.bind(this);
    this.handleCommentChange = this.handleCommentChange.bind(this);
    this.handleStat = this.handleStat.bind(this);
    this.state = {
      courseInfo: props.courseInfo,
      courseTitle: props.courseTitle,
      courseSubject: props.courseSubject,
      courseNumber: props.courseNumber,
      courseInstructor: props.courseInstructor,
      courseGPA: props.courseGPA,
      searchCourseName: props.searchCourseName,
      courseLikes: props.courseLikes,
      commentAppend: false,
      commentValue: "",
      userName: props.userName,
      history: props.history,
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
    axios.post('http://localhost:5000/api/thumbsUp', {
        userName: self.state.userName,
        courseName: props.courseName,
        courseSubject: props.courseSubject,
        courseNumber: props.courseNumber,
        courseInstructor: props.courseInstructor
    })
        .then(function (response) {
          // console.log(response);
            // self.getUserCourse();
            var likes = self.state.courseLikes;
            self.setState({
              courseLikes: likes+1
          })
          
        })
        .catch(function (error) {
            console.log(error);
        })
  }

  handleComment() {
    if (this.state.commentAppend === false) {
      this.setState({
        commentAppend: true
      })
    }
    else {
      this.postComment();
    }
  }

  postComment() {
    var self = this;
    axios.post('http://localhost:5000/api/comment', {
        userName: self.state.userName,
        // courseName: self.state.courseName,
        courseSubject: self.state.courseSubject,
        courseNumber: self.state.courseNumber,
        courseInstructor: self.state.courseInstructor,
        courseComment: self.state.commentValue
    })
        .then(function (response) {
          console.log(response);
            // self.getUserCourse();
        })
        .catch(function (error) {
            console.log(error);
        })
  }

  handleCommentChange(event) {
    console.log(event.target);
    const name = event.target.name;
    const value = event.target.value;
    this.setState({
        [name]: value
    });
  }

  handleStat(props) {
    console.log(props);
    this.state.history.push({
      pathname: "/stat",
      state: {
          courseSubject: props.courseSubject,
          courseNumber: props.courseNumber,
          courseInstructor: props.courseInstructor,
      }
    });
  }

  render() {
    const courseInfo = this.state.courseInfo;
    const courseName = this.state.courseTitle;
    const courseSubject = this.state.courseSubject;
    const courseNumber = this.state.courseNumber;
    const courseInstructor = this.state.courseInstructor;
    const courseGPA = this.state.courseGPA;
    const courseLikes = this.state.courseLikes;
    return (
      <div>
        <Card>
          <Card.Body>
            <Card.Title >
              <div onClick={() => this.handleStat({
              courseSubject: courseSubject,
              courseNumber: courseNumber,
              courseInstructor: courseInstructor
            })}>
               {courseSubject + courseNumber + " " + courseName}
              </div>
            </Card.Title>
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
            <Button
              variant="primary"
              onClick={this.handleComment}
              >
              Comment
            </Button>
          </Card.Body>
        </Card>
        {
          this.state.commentAppend ? 
            <CommentBox
              handleCommentChange={this.handleCommentChange}
              value={this.state.commentValue}
             /> :
            ""
          }
      </div>
      
    );
  }
}

class CommentBox extends Component {
  constructor(props){
    super(props);
    // this.handleChange = this.handleChange.bind(this);
    this.state = {
      value: props.value,
    }
  }


  componentWillReceiveProps(props) {
    if (this.props !== props) {
      this.setState(props);
    }
  }

  render() {
    console.log(this.state)
    console.log(this.props)
    return (
      <TextField
          id="outlined-multiline-flexible"
          label="Multiline"
          name="commentValue"
          rowsMax="4"
          value={this.state.value}
          onChange={this.props.handleCommentChange}
          margin="normal"
          helperText="hello"
          variant="outlined"
        />      
    )
  }
}