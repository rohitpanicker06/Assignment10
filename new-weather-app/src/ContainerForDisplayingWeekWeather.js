import React from 'react';
import DayCard from './DayCard';

class ContainerForDisplayingWeekWeather extends React.Component {
  state = {
    allFetchedData: [],
    dailyData: [],
    zipCode: '02115', // set default zipcode
    city: "Boston",
    selectedDate: undefined
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
          city: data.city.name,
          selectedDate: undefined,
        }, () => console.log(this.state))
      })
  }

  daycardClick = (date) => {
    this.setState({
      selectedDate: date,
    })
  }

  formatDayCards = () => {
    if (!this.state.selectedDate) {
      return this.state.dailyData.map((reading, index) => <DayCard reading={reading} key={index} handleClick={this.daycardClick} />)
    }
    return this.state.fullData.filter(reading => {
      var date = new Date(reading.dt_txt)

      return this.state.selectedDate.getDate() === date.getDate() && date.getMonth() === this.state.selectedDate.getMonth() && date.getFullYear() === this.state.selectedDate.getFullYear()
    }).map((reading, index) => <DayCard reading={reading} key={index} handleClick={() => { }} />)
  }

  handleZipCodeChange = (event) => {
    this.setState({ zipCode: event.target.value });
    console.log({ state: this.state })
  }

  render() {
    return (
      <div className="container">
        <h1 className="display-1 mt-4 p-5 bg-primary text-white rounded">5-Day Forecast</h1>
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
