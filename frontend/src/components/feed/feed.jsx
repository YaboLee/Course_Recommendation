import React, { Component } from "react";
import io from 'socket.io-client';

export default class Feed extends Component {
    constructor(props) {
        super(props);
        this.state = {
            endpoint: "https://localhost:8000/socket.io/",
            feeds: "",
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


    render() {
        return (
            this.state.feeds
        );
    }
}

function subscribeServer(socket, func) {
    socket.on("/", (data) => func(data));
}