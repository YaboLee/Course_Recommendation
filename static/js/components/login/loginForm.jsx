import React, { Component } from 'react';
<<<<<<< HEAD
=======
import {
    withRouter
  } from 'react-router-dom';

>>>>>>> 5914bf983a2409f124d5643615eab3d85e334886
import axios from "axios"
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'


<<<<<<< HEAD
export default class LoginForm extends Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
=======
class LoginForm extends Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
>>>>>>> 5914bf983a2409f124d5643615eab3d85e334886
        this.state = {
            username: "",
            password: "",
            // email: ""
        }
<<<<<<< HEAD
=======
        // this.history = this.props.history;
>>>>>>> 5914bf983a2409f124d5643615eab3d85e334886
    }

    handleChange(event) {
        const name = event.target.name;
        const value = event.target.value;
        this.setState({
            [name]: value
        });
    }

    handleSubmit() {
<<<<<<< HEAD
=======
        var self = this;
>>>>>>> 5914bf983a2409f124d5643615eab3d85e334886
        axios.post('/auth/login', {
            username: this.state.username,
            password: this.state.password,
            // email: this.state.email
          })
          .then(function (response) {
<<<<<<< HEAD
=======
            self.props.history.push("/");
>>>>>>> 5914bf983a2409f124d5643615eab3d85e334886
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

<<<<<<< HEAD
                <Button variant="primary" onClick={() => this.handleSubmit()}>
=======
                <Button variant="primary" onClick={this.handleSubmit}>
>>>>>>> 5914bf983a2409f124d5643615eab3d85e334886
                    Login
                </Button>
            </Form>
        </div>
        )
    }
<<<<<<< HEAD
}
=======
}

export default withRouter(LoginForm)
>>>>>>> 5914bf983a2409f124d5643615eab3d85e334886
