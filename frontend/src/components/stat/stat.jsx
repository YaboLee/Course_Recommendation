import React, { Component } from "react";
import "../../styles/stat.css"
import ReactChartkick, {
LineChart,
PieChart,
ColumnChart
} from "react-chartkick";
import Chart from "chart.js";
import axios from "axios";


ReactChartkick.addAdapter(Chart);

class Stat extends Component {
    constructor(props) {
        super(props);
        this.state = {
            courseSubject: props.location.state.courseSubject,
            courseNumber: props.location.state.courseNumber,
            courseInstructor: props.location.state.courseInstructor,
            stat: []
        }

        this.getSectionStat();
    }

    getSectionStat() {
        var self = this;
        axios.get('http://localhost:5000/api/getDistribution', {
            params: {
                courseSubject: self.state.courseSubject,
                courseNumber: self.state.courseNumber,
                courseInstructor: self.state.courseInstructor
            }
        })
        .then(function (response) {
            self.setState({
                stat: response.data.data.result,
            })
        })
        .catch(function (error) {
            console.log(error);
        })
    }
    
    render() {
        return (
        <div>
            <h1 className="title">{this.state.courseInstructor + " " + this.state.courseSubject + this.state.courseNumber} </h1>
            <h4 className="title">GPA Distribution</h4>
            <div className="chart">
            <ColumnChart
                download={true}
                data={this.state.stat}
            />
            </div>
            <div className="chart">
            <PieChart
                download={true}
                data={this.state.stat}
                
            />
            

            </div>
        </div>
        );
    }
}

export default Stat;