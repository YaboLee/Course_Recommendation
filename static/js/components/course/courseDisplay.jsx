import React, { Component } from 'react';
import Card from 'react-bootstrap/Card'

export default class courseDisplay extends Component {
    constructor(props) {
        super(props);
        this.state = {
            courseInfo: props.courseInfo,
            searchCourseName: null,
        }
    }

    componentWillReceiveProps(props) {
        if (this.props !== props) {
            this.setState(props)
          }
    }

    render() {
        return (
            <ul>
                <CourseList 
                    courses={this.state.courseInfo} 
                    searchCourseName={this.state.searchCourseName}
                    />
            </ul>
        )
    }
}

function CourseList(props) {
    const courseList = props.courses;
    const searchCourseName = props.searchCourseName;
    const listItems = courseList.map((course, index) => 
        <li key={index}>
            <CourseEntry 
                courseInfo={course}
                searchCourseName={searchCourseName} />
        </li>
    );
    return (
        listItems
    );
}

class CourseEntry extends Component {
    constructor(props) {
        super(props);
        this.state = {
            courseInfo: props.courseInfo,
            searchCourseName: props.searchCourseName,
        }
    }

    componentWillReceiveProps(props) {
        if (this.props !== props) {
            this.setState(props)
          }
    }

    render() {
        const courseInfo = this.state.courseInfo;
        const searchCourseName = this.state.searchCourseName;
        const courseName = courseInfo.coursetitle;
        // console.log(courseInfo.);
        // const courseName = "";
        return (
            <Card style={{ width: '18rem' }}>
                <Card.Body>
                <Card.Title>{courseName}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">Card Subtitle</Card.Subtitle>
                <Card.Text>
                    Some quick example text to build on the card title and make up the bulk of
                    the card's content.
                </Card.Text>
                <Card.Link href="#">Card Link</Card.Link>
                <Card.Link href="#">Another Link</Card.Link>
                </Card.Body>
        </Card>
        )
    }
}