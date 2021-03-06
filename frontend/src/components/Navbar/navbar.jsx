import React, { Component } from "react";
import DropdownButton from 'react-bootstrap/DropdownButton'
import Dropdown from 'react-bootstrap/Dropdown'
import axios from "axios";
import { Button } from "react-bootstrap";

class Navbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      courseSubject: ["cs"],
      courseNumber: [241],
      courseInstructor: ["Wade"],
      selectedCourseSubject: "",
      selectedCourseNumber: "",
      selectedCourseInstructor: "",
      subscriptions: [["cs", 241, "Wade"]],
      userName: props.userName,
    }
    this.handleOnClick = this.handleOnClick.bind(this);
    this.handleOnSelect = this.handleOnSelect.bind(this);
    this.getAllCourseSubjects = this.getAllCourseSubjects.bind(this);
    this.handleSubscribe = this.handleSubscribe.bind(this);
    this.getAllSubscriptions = this.getAllSubscriptions.bind(this);
    this.cancelSubscription = this.cancelSubscription.bind(this);

    this.getAllCourseSubjects();
    this.getAllSubscriptions();
  }
  
  handleOnClick(props) {
    var self = this;
    console.log(props);
    if (props.menuName === "courseInstructor") {
      return;
    }
    axios.get('http://localhost:5000/api/select/' + props.menuName, {
    params: {
        userName: self.state.userName,
        courseSubject: props.courseSubject,
        courseNumber: props.courseNumber,
        courseInstructor: props.courseInstructor,
    }
    })
    .then(function (response) {
      const menuName = props.menuName;
      let key = "";
      if (menuName === "courseSubject") {
        key = "courseNumber";
      } else if (menuName === "courseNumber") {
        key = "courseInstructor"
      } else if (menuName === "courseInstructor") {
        return;
      }
      self.setState({
        [key]: response.data.data.result,
      })
    })
    .catch(function (error) {
        console.log(error);
    })
  }


  getAllCourseSubjects(props) {
    var self = this;
    axios.get("http://localhost:5000/api/search/courseSubject", {
      params: {
        userName: self.state.userName,
        courseSubject: "",
        courseNumber: "",
        courseInstructor: "",
      }
    })
    .then(function (response) {
      self.setState({
        courseSubject: response.data.data.result,
      })
    })
    .catch(function (error) {
      console.log(error);
    })
  }

  handleOnSelect(props) {
    if (props.menuName === "courseSubject") {
      this.setState({
        selectedCourseSubject: props.courseSubject,
        selectedCourseNumber: "",
        selectedCourseInstructor: "",
        courseInstructor: [],
      })
    } else if (props.menuName === "courseNumber") {
      this.setState({
        selectedCourseNumber: props.courseNumber,
        selectedCourseInstructor: "",
      })
    } else if (props.menuName === "courseInstructor") {
      this.setState({
        selectedCourseInstructor: props.courseInstructor,
      })
    }
  }
  
  handleSubscribe(props) {
    var self = this;
    axios.post('http://localhost:5000/api/subscribe', {
        userName: self.state.userName,
        courseSubject: self.state.selectedCourseSubject,
        courseNumber: self.state.selectedCourseNumber,
        courseInstructor: self.state.selectedCourseInstructor,
    })
    .then(function (response) {
      window.alert("Success!");
      this.getAllSubscriptions();      
    })
    .catch(function (error) {
      console.log(error);
    })
  }

  getAllSubscriptions(props) {
    var self = this;
    axios.get("http://localhost:5000/api/getAllSubscriptions", {
      params: {
        userName: self.state.userName,
      }
    })
    .then(function (response) {
      console.log(response.data.data.result);
      self.setState({
        subscriptions: response.data.data.result,
      })
    })
    .catch(function (error) {
      console.log(error);
    })
  }

  cancelSubscription(props) {
    var self = this;
    console.log(props);
    axios.post('http://localhost:5000/api/cancelSubscription', {
        userName: self.state.userName,
        courseSubject: props.courseSubject,
        courseNumber: props.courseNumber,
        courseInstructor: props.courseInstructor,
      })
    .then(function (response) {
      window.alert("Success!");
      this.getAllSubscriptions();      
    })
    .catch(function (error) {
      console.log(error);
    })
  }

  render() {
    return (
      <div>
          <DropdownCustom
              menuName="courseSubject"
              entries={this.state.courseSubject}
              handleOnClick={this.handleOnClick}
              handleOnSelect={this.handleOnSelect} />
          <DropdownCustom
              menuName="courseNumber"
              entries={this.state.courseNumber}
              handleOnClick={this.handleOnClick}
              handleOnSelect={this.handleOnSelect}
              selectedCourseSubject={this.state.selectedCourseSubject} />
          <DropdownCustom
              menuName="courseInstructor"
              entries={this.state.courseInstructor}
              handleOnClick={this.handleOnClick}
              handleOnSelect={this.handleOnSelect}
              selectedCourseSubject={this.state.selectedCourseSubject}
              selectedCourseNumber={this.state.selectedCourseNumber} />
          <Button
            onClick={this.handleSubscribe}>
            Subscribe
          </Button>
          <Subscriptions
            subscriptions={this.state.subscriptions}
            cancelSubscription={this.cancelSubscription} />
      </div>

    );
  }
}

function DropdownCustom(props) {
    const itemList = props.entries.map((entry, index) => {
      let courseSubject = "";
      let courseNumber = "";
      let courseInstructor = "";
      if (props.menuName === "courseSubject") {
        courseSubject = entry;
        courseNumber = "";
        courseInstructor = "";
      } else if (props.menuName === "courseNumber") {
        courseSubject = props.selectedCourseSubject;
        courseNumber = entry;
        courseInstructor = "";
      } else if (props.menuName === "courseInstructor") {
        courseSubject = props.selectedCourseSubject;
        courseNumber = props.selectedCourseNumber;
        courseInstructor = entry;
      }
      return (
            <Dropdown.Item
                onClick={() => props.handleOnClick({
                  courseSubject: courseSubject,
                  courseNumber: courseNumber,
                  courseInstructor: courseInstructor,
                  menuName: props.menuName,
                })} 
                onSelect={() => props.handleOnSelect({
                  menuName: props.menuName,
                  courseSubject: courseSubject,
                  courseNumber: courseNumber,
                  courseInstructor: courseInstructor,
                })}>
                    {entry}
            </Dropdown.Item>)
        });
    return (
        <DropdownButton id="courseSubject" title={props.menuName}>
            {itemList}        
        </DropdownButton>
    );
}

function Subscriptions(props) {
  const itemList = props.subscriptions.map((entry, index) => {
    const courseSubject = entry[0];
    const courseNumber = entry[1];
    const courseInstructor = entry[2];
    return (
      <div 
        key={index} 
        onClick={() => props.cancelSubscription({
          courseSubject: courseSubject,
          courseNumber: courseNumber,
          courseInstructor: courseInstructor,
        })}>
        {courseSubject + " " + courseNumber + " " + courseInstructor}
      </div>
    )
  });
  return itemList;
}


export default Navbar;
