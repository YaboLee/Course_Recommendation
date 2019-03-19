import React, { Component } from 'react';
import axios from "axios"

export default class RegisterForm extends Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.state = {
            username: "",
            password: "",
            email: ""
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
        axios.post('/register', {
            username: this.state.username,
            password: this.state.password,
            email: this.state.email
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
            <form>
                <label>
                    Name:
                    <input type="text" name='username' value={this.state.value} onChange={this.handleChange} />
                </label>
                <label>
                    Password:
                    <input type="text" name='password' value={this.state.value} onChange={this.handleChange} />
                </label>
                <label>
                    email:
                    <input type="text" name='email' value={this.state.value} onChange={this.handleChange} />
                </label>
            </form>
            <button onClick={() => this.handleSubmit()}>
                Click Me!
            </button>
        </div>
        )
    }
}