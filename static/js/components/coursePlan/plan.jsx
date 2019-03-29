import React, { Component } from 'react';



export default class Plan extends Component {
    constructor(props) {
        super(props);
        this.state = {
            coursePlan: null,
            logedin: false,
            userName: null,
        }
    }

    componentWillReceiveProps(nextProps) {
        var oriProps = this.props;
        if (this.props !== nextProps) {
            this.setState(nextProps)
        } 
        if (this.props.logedin === true && this.props.logedin !== oriProps.logedin) {
            this.getCoursePlan();
        }
    }

    getCoursePlan() {
        var self = this;
        axios.get('/api/userCourse', {
            params: {
                userName: self.userName,
            }
        })
            .then(function (response) {
                self.setState({
                    coursePlan: response.data.coursePlan,
                })
            })
            .catch(function (error) {
                console.log(error);
            })
    }

    render() {
        return (
            ""
        )
    }
}