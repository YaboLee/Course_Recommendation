import React, { Component } from "react";
import axios from "axios";

import Course from "./course/course";
import UserInfo from "./user_info/Userinfo";
import Plan from "./coursePlan/plan"

import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/home.css"
import Navbar from "../components/Navbar/navbar.jsx";
import Feed from "./feed/feed"

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userInfo: {
        userName: props.location.state.userName,
        logedin: props.location.state.logedin,
      },
      userCourse: [],
    };
    this.getUserCourse = this.getUserCourse.bind(this);
    this.handleCourseAdd = this.handleCourseAdd.bind(this);
    this.handleCourseDelete = this.handleCourseDelete.bind(this);
  }

  handleCourseAdd(props) {
    var self = this;
    console.log(self.state);
    axios.post('http://localhost:5000/api/addCourse', {
        userName: self.state.userInfo.userName,
        courseName: props.courseName,
        courseSubject: props.courseSubject,
        courseNumber: props.courseNumber,
        courseInstructor: props.courseInstructor
    })
        .then(function (response) {
          let userCourse = self.state.userCourse
          userCourse.push(response.data.data);
          self.setState({
            "userCourse": userCourse,
          })
        })
        .catch(function (error) {
            console.log(error);
        })
  };

  handleCourseDelete(props) {
    var self = this;
    axios.post('http://localhost:5000/api/deleteCourse', {
        userName: self.state.userInfo.userName,
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
          <Navbar
            userName={this.state.userInfo.userName} />
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
              getUserCourse={this.getUserCourse}
              userName={this.state.userInfo.userName} />
          </div>
          <div className="col-md-3 my-col">
            <Feed
              userName={this.state.userInfo.userName} />
          </div>
        </div>
      </div>
    );
  }
}
