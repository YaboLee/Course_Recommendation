import React, { Component } from "react";
import io from 'socket.io-client';
import { Button } from "react-bootstrap";

export default class Feed extends Component {
    constructor(props) {
        super(props);
        this.state = {
            endpoint: "https://localhost:8000/socket.io/",
            feeds: [],
        }
        this.socket = io("http://localhost:5000");
        // this.socket.connect("http://localhost:8000/socket.io/");
        // subscribeServer(this.socket, (data) => {
        //     this.setState({
        //         feeds: data.feeds,
        //     })
        // })

        this.socket.emit("/", "hello");

        this.socket.on("/reply", (data) => {
            this.setState({
                feeds: data.feeds,
            })
        });

        this.socket.on("connect", () => {
            console.log("...");
        })


        console.log("test");
    }

    showComments = () => {
        axios.get('http://localhost:5000/api/showComments', {
        params: {
            userName: this.props.userName,
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
            </div>

            // this.state.feeds
        );
    }
}

