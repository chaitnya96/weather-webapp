import React from "react";
import { Calendar, Row, Col, Spin, Layout } from "antd";
import axios from "axios";
import WeatherInformation from "./WeatherInformation";
import moment from "moment";
import "./styles.css";

class App extends React.Component {
  state = {
    date: moment().format("YYYY-MM-DD")
  };
  componentDidMount() {
    this.getDateDetails(this.state.date);
  }
  getDateDetails = date => {
    axios
      .post(`http://interview.com360degree.com/api/getWeather`, {
        // date: new Date(2019, 9, 11, 22, 30, 30, 0)
        date
      })
      .then(res => {
        this.setState({
          weatherData: res.data.data[0]
        });
      })
      .catch(err => console.log(err));
  };
  onPanelChange = date =>
    this.setState(
      { date: moment(date).format("YYYY/MM/DD") },
      this.getDateDetails(this.state.date)
    );
  render() {
    const { weatherData, date } = this.state;
    return (
      <div className="todoContainer">
        <Row>
          <Col
            sm="12"
            style={{ width: 500, border: "1px solid #d9d9d9", borderRadius: 4 }}
          >
            <Calendar fullscreen={false} onSelect={this.onPanelChange} />
          </Col>
          <Col>
            {weatherData ? (
              <WeatherInformation weatherData={weatherData} date={date} />
            ) : (
              <Spin size="large" />
            )}
          </Col>
        </Row>
      </div>
    );
  }
}

export default App;
