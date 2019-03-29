import React, { Component } from "react";
import axios from "axios";

import Course from "./course/course";
import UserInfo from "./user_info/Userinfo"

import "bootstrap/dist/css/bootstrap.min.css";
import "../../css/home/home.css";
import Navbar2 from "../components/Navbar/navbar.jsx";

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userInfo: {
        userName: null,
        logedin: false
      }
    };
  }

  componentDidMount() {
    var self = this;
    axios
      .get("/api/loginOrNot")
      .then(function(response) {
        // handle success
        if (response.data.logedin === false) {
          self.props.history.push("/auth/login");
        } else {
          var data = response.data;
          var userInfo = { userName: data.userName, logedin: data.logedin };
          self.setState({
            userInfo: userInfo
          });
        }
      })
      .catch(function(error) {
        // handle error
        console.log(error);
      })
      .then(function() {
        // always executed
      });
  }

  render() {
    return (
      <div className="container">
        <div className="row Navbar">
          <UserInfo 
            userInfo={this.state.userInfo} 
            className="info" />
          <Navbar2 />
        </div>
        <div className="row my-row">
          <div className="col-md-4 my-col">row 1 col 1</div>
          <div className="col-md-6 my-col"><Course className="course" /></div>
          <div className="col-md-2 my-col">row 1 col 3</div>
        </div>
      </div>
    );
  }
}
