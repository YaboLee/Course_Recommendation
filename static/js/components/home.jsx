import React, { Component } from 'react';
import axios from "axios"

import Course from "./course/course"
import Info from "./info/info" 


import "../../css/home/home.css"

export default class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userInfo:{
                userName: null,
                logedin: false,
            }
        }
    }
    
    componentDidMount() {
        var self = this;
        axios.get('/api/loginOrNot')
            .then(function (response) {
                // handle success
                if (response.data.logedin === false) {
                    self.props.history.push("/auth/login");
                } else {
                    var data = response.data;
                    var userInfo = {userName: data.userName, logedin: data.logedin};
                    self.setState({
                        userInfo: userInfo,
                    })
                }
                // console.log(self.state);
            })
            .catch(function (error) {
                // handle error
                console.log(error);
            })
            .then(function () {
                // always executed
            });
    }

    render() {
       return (
        <div className="homeBox">
            <Info userInfo={this.state.userInfo} className="info"></Info>
            <Course className="course"></Course>
        </div>
        )
    }
}