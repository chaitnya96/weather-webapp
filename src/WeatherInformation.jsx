import React, { Component } from "react";
import { Card, Row, Col } from "antd";
import moment from "moment";

class WeatherInformation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isCurrentDate: true,
      selectedForecast: {}
    };
  }
  componentWillReceiveProps(nextProps) {
    const { forecast, current } = this.props.weatherData;
    let date = moment(nextProps.date).format("YYYY-MM-DD");
    if (date != moment().format("YYYY-MM-DD")) {
      if (forecast) {
        let selectedForecast = forecast.filter(data => data.date === date)[0];
        if (selectedForecast) {
          this.setState({
            isCurrentDate: false,
            selectedForecast
          });
        } else {
          this.setState({
            isCurrentDate: false,
            selectedForecast: {
              ...current,
              date,
              day: moment(date).format("dddd")
            }
          });
        }
      } else {
        this.setState({
          isCurrentDate: false,
          selectedForecast: {
            ...current,
            date,
            day: moment(date).format("dddd")
          }
        });
      }
    } else {
      this.setState({
        isCurrentDate: true,
        current: {
          ...current,
          date,
          day: moment(date).format("dddd")
        }
      });
    }
  }
  getWeatherData = data => {
    // add the key name into dataToDisplay array to display that data
    // using this we removes unwanted data.
    let dataToDisplay = [
      "day",
      "skytext",
      "skytextday",
      "temperature",
      "date",
      "observationtime"
    ];
    let weatherData = [];
    for (let key in data) {
      console.log(data);
      if (dataToDisplay.includes(key)) {
        let value = data[key];
        weatherData.push(
          <div>
            <label htmlFor={key}>{key}</label>:- <span id={key}>{value}</span>
          </div>
        );
      }
    }
    return weatherData;
  };
  render() {
    const { location, current } = this.props.weatherData;
    const { selectedForecast, isCurrentDate } = this.state;
    let data = isCurrentDate ? current : selectedForecast;
    return (
      <Row>
        <Col sm={8}>
          <Card title={location.name} bordered={false}>
            {this.getWeatherData(data)}
          </Card>
        </Col>
      </Row>
    );
  }
}

export default WeatherInformation;
