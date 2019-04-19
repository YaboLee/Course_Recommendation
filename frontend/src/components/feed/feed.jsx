import React, { Component } from "react";
import io from 'socket.io-client';
import { Button } from "react-bootstrap";
import axios from "axios";
import { func } from "prop-types";

import "../../styles/feed.css"

export default class Feed extends Component {
    constructor(props) {
        super(props);
        this.showComments = this.showComments.bind(this);
        this.state = {
            endpoint: "https://localhost:8000/socket.io/",
            feeds: [],
            userName: props.userName,
        }
        this.socket = io("http://localhost:8000");

        this.socket.emit("/", "hello");

        this.socket.on("/reply", (data) => {
            this.setState({
                feeds: data.feeds,
            })
        });

        this.socket.on("connect", () => {
            console.log("...");
        })
    }

    componentWillReceiveProps(props) {
        if (this.props !== props) {
          this.setState(props);
        }
      }

    showComments(){
        var self = this;
        axios.get('http://localhost:5000/api/showComments', {
        params: {
            userName: self.state.userName,
        }
    })
        .then(function (response) {
            console.log(response.data.data.comments);
            self.setState({
                feeds: response.data.data.comments,
            })
        })
        .catch(function (error) {
            console.log(error);
        })
    }

    render() {
        return (
            <div>
                <Button 
                    variant="primary"
                    onClick={() => this.showComments()}>
                    Show Comments
                </Button>
                {
                    this.state.feeds.length !== 0 ?
                        <CommentsList
                            comments={this.state.feeds} />
                        : " "
                }
                
            </div>
        );
    }
}

function CommentsList(props) {
    const comments = props.comments;
    const listItems = comments.map((comment, index) => {
        const userName = comment[1];
        const courseSubject = comment[2];
        const courseNumber = comment[3];
        const instructor = comment[4];
        const commentValue = comment[5];
        const sentiment = comment[6];
        const commentClass = sentiment === 1 ? "good" : "bad";
        return (
            <li key={index}>
                <div className={commentClass}>
                    <p>{userName}</p>
                    <p>{courseSubject + " " + courseNumber + " " + instructor}</p>
                    <p>{commentValue}</p>
                </div>
            </li>
        );
    });
    return listItems;
}
