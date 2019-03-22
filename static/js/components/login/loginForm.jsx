import React, { Component } from 'react';
import axios from "axios"
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'


export default class LoginForm extends Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.state = {
            username: "",
            password: "",
            // email: ""
        }
    }

    handleChange(event) {
        const name = event.target.name;
        const value = event.target.value;
        this.setState({
            [name]: value
        });
    }

    handleSubmit() {
        axios.post('auth/login', {
            username: this.state.username,
            password: this.state.password,
            // email: this.state.email
          })
          .then(function (response) {
            console.log(response);
          })
          .catch(function (error) {
            console.log(error);
          });
    }

    render() {
       return (
        <div>
            <Form>
                <Form.Group controlId="formBasicUsername">
                    <Form.Label>Username</Form.Label>
                    <Form.Control type="text" placeholder="username" name="username" onChange={this.handleChange} />
                </Form.Group>

                {/* <Form.Group controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" placeholder="Enter email" name="email" onChange={this.handleChange} />
                </Form.Group> */}

                <Form.Group controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" name="password" onChange={this.handleChange} />
                </Form.Group>

                <Button variant="primary" onClick={() => this.handleSubmit()}>
                    Login
                </Button>
            </Form>
        </div>
        )
    }
}