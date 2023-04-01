import React from 'react';
import apiKey from './Apikeys';
import DayCard from './DayCard';

class ContainerForDisplayingWeekWeather extends React.Component {
  state = {
    allFetchedData: [],
    dailyData: [],
    zipCode: '11102', // set default zipcode
    city: "New York"
  }

  componentDidMount = () => {
    this.fetchWeatherData();
  }

  fetchWeatherData = () => {
    const { zipCode } = this.state;
    const weatherURL = `http://api.openweathermap.org/data/2.5/forecast?zip=${zipCode}&units=imperial&APPID=c52616946c09169a2fa310cf4d432f9c`;

    fetch(weatherURL)
      .then(res => res.json())
      .then(data => {
        const dailyData = data.list.filter(reading => reading.dt_txt.includes("18:00:00"))
        this.setState({
          fullData: data.list,
          dailyData: dailyData,
          city: data.city.name
        }, () => console.log(this.state))
      })
  }

  formatDayCards = () => {
    return this.state.dailyData.map((reading, index) => <DayCard reading={reading} key={index} />)
  }

  handleZipCodeChange = (event) => {
    this.setState({ zipCode: event.target.value });
  }

  render() {
    return (
      <div className="container">
        <h1 className="display-1 jumbotron">5-Day Forecast.</h1>
        <div className="row justify-content-center">
          <div className="form-group">
            <label htmlFor="zipCode">Enter Zipcode:</label>
            <input type="text" className="form-control" id="zipCode" value={this.state.zipCode} onChange={this.handleZipCodeChange} />
            <button className="btn btn-primary mt-3" onClick={this.fetchWeatherData}>Get Weather</button>
          </div>
        </div>
       
        <h5 className="display-5 text-muted">{this.state.city}</h5>
        <div className="row justify-content-center">
          {this.formatDayCards()}
        </div>
      </div>
    )
  }
}

export default ContainerForDisplayingWeekWeather;
