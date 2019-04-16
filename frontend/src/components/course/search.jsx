import React, { Component } from 'react';
import axios from "axios"
import InputGroup from 'react-bootstrap/InputGroup'
import FormControl from 'react-bootstrap/FormControl'
import Button from 'react-bootstrap/Button'

export default class Search extends Component {
    constructor(props) {
        super(props);
    }

    render() {
       return (
        <InputGroup className="mb-3">
            <FormControl
                placeholder="Search Your Course"
                aria-label="Recipient's username"
                aria-describedby="basic-addon2"
                id="searchCourseInput"
                name="searchCourseName"
                onChange={this.props.handleChange}
            />
            <InputGroup.Append>
                <Button variant="outline-secondary" id="searchCourseBtn" onClick={this.props.searchAPI}>Search</Button>
            </InputGroup.Append>
      </InputGroup>
        )
    }
}