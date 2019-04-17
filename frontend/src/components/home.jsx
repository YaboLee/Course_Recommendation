import React, { Component } from "react";
import axios from "axios";

import Course from "./course/course";
import UserInfo from "./user_info/Userinfo";
import Plan from "./coursePlan/plan"

import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/home.css"
import Navbar2 from "../components/Navbar/navbar.jsx";
import Feed from "./feed/feed"

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userInfo: {
        userName: props.location.state.userName,
        logedin: props.location.state.logedin,
      },
      userCourse: null,
    };
    this.getUserCourse = this.getUserCourse.bind(this);
  }

  handleCourseAdd(props) {
    var self = this;
    axios.post('/api/addCourse', {
        userName: self.userName,
        courseName: props.courseName,
        courseSubject: props.courseSubject,
        courseNumber: props.courseNumber,
        courseInstructor: props.courseInstructor
    })
        .then(function (response) {
          console.log(response);
            self.getUserCourse();
        })
        .catch(function (error) {
            console.log(error);
        })
  };

  handleCourseDelete(props) {
    var self = this;
    axios.post('/api/deleteCourse', {
        userName: self.userName,
        courseName: props.courseName,
        courseSubject: props.courseSubject,
        courseNumber: props.courseNumber,
        courseInstructor: props.courseInstructor
    })
        .then(function (response) {
            self.getUserCourse();
        })
        .catch(function (error) {
            console.log(error);
        })
  };

  getUserCourse() {
    var self = this;
    axios.get('http://localhost:5000/api/userCourse', {
        params: {
            userName: self.state.userInfo.userName,
        }
    })
        .then(function (response) {
            self.setState({
                userCourse: response.data.data.usercourse,
            })
        })
        .catch(function (error) {
            console.log(error);
        })
  }

  componentDidMount() {
    var self = this;
    if (self.state.logedin === false) {
      self.props.history.push("/auth/login");
    } else{
      self.getUserCourse();
    }
  }

  render() {
    return (
      <div className="container">
        <div className="row Navbar">
          <UserInfo
            userInfo={this.state.userInfo}
            className="info"
          />
          <Navbar2 />
        </div>
        <div className="row my-row">
          <div className="col-md-3 my-col">
            <Plan 
              logedin={this.state.logedin}
              userName={this.state.userName}
              userCourse={this.state.userCourse}
              courseDelete={this.handleCourseDelete}
              getUserCourse={this.getUserCourse} />
          </div>
          <div className="col-md-6 my-col">
            <Course 
              courseAdd={this.handleCourseAdd}
              getUserCourse={this.getUserCourse} />
          </div>
          <div className="col-md-3 my-col">
            <Feed />
          </div>
        </div>
      </div>
    );
  }
}
