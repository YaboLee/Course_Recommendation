import React, { Component } from "react";
import io from 'socket.io-client';
import { Button } from "react-bootstrap";
import axios from "axios";
import { func } from "prop-types";

export default class Feed extends Component {
    constructor(props) {
        super(props);
        this.state = {
            endpoint: "https://localhost:8000/socket.io/",
            feeds: [],
            userName: props.userName,
        }
        this.socket = io("http://localhost:5000");

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

    showComments = () => {
        console.log(this.state);
        axios.get('http://localhost:5000/api/showComments', {
        params: {
            userName: this.state.userName,
        }
    })
        .then(function (response) {
            console.log(response.data.data.comments);
            this.setState({
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

            </div>
        );
    }
}

function CommentsList(props) {
    const comments = props.coments;
    const listItems = comments.map((comment, index) => (
        <li key={index}>
            <div>
                <p>{comment[1]}</p>
                <p>{comment[2] + " " + comment[3] + " " + comment[4]}</p>
                <p>{comment[5]}</p>
            </div>
        </li>
    ));
}
