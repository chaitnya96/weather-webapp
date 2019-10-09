import React from "react";
import { Container } from "reactstrap";
import Calendar from "react-calendar";
import axios from "axios";
import WeatherInformation from "./WeatherInformation";

class App extends React.Component {
  state = {
    date: new Date()
  };

  onChange = date => this.setState({ date });
  render() {
    axios
      .post(`http://interview.com360degree.com/api/getWeather`, {
        date: this.state
      })
      .then(res => console.log(res))
      .catch(err => console.log(err));
    return (
      <Container>
        <Calendar onChange={this.onChange} value={this.state.date} />
        <WeatherInformation />
      </Container>
    );
  }
}

export default App;
