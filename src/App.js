import React, { Component, createRef } from 'react';
import styled from 'styled-components';
import SoftKey from './containers/Softkey/Softkey';
import Search from './containers/Search/Search';
import { TabsArea, Tab } from './components/Tabs/Tabs';
import OneDayWeather from './components/OneDayWeather/OneDayWeather';
import DaysWeather from './components/DaysWeather/DaysWeather';
import Spinner from './components/Spinner/Spinner';
import Warning from './components/Warnings/Warnings';
import forecastAxios from './axios/forecastAxios';
import locationAxios from './axios/locationAxios';
import StatusBar from './components/StatusBar/StatusBar';

const CHECK_CONNECTION = 'Check the phone connection please';
const GETTING_WEATHER = 'Getting the weather...';
const GETTING_LOCATION = 'Getting location...';
const UNABLE_RETRIEVE = 'Ooops... Unable to retrieve your location \n Choose the location please';
const CHOOSE_LOCATION = 'Choose the location please';

const STET_DOWN = '-16px';
const STET_UP = '0px';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeTab: 0,
      loading: false,
      currentWeather: {},
      tomorrowWeather: {},
      dailyWeather: {},
      hourly: {},
      success: false,
      city: '',
      typing: false,
      status: '',
    };

    this.daysRef = createRef();
  }


  componentDidMount() {
    if ('geolocation' in navigator) {
      this.setState({
        status: GETTING_LOCATION,
        loading: true,
      });

      const options = {
        enableHighAccuracy: false,
        timeout: 20000,
        maximumAge: 0,
      };

      const success = (position) => {
        locationAxios.get('reverse', {
          params: {
            location: `${position.coords.latitude},${position.coords.longitude}`,
          },
        })
          .then((response) => {
            const coords = [position.coords.longitude, position.coords.latitude];
            const country = response.data.results[0].locations[0].adminArea1;
            const city = response.data.results[0].locations[0].adminArea5;
            this.fetchWeather(city, coords, country);
          });
      };

      const error = () => {        
        this.setState({
          loading: false,
          status: UNABLE_RETRIEVE,
        });
      };

      navigator.geolocation.getCurrentPosition(success, error, options);
    } else {
      this.setState({
        status: CHOOSE_LOCATION,
      });
    }
  }

  fetchWeather = (city, coords, country) => {
    const [longitude, latitude] = coords;

    forecastAxios.get(`${latitude},${longitude}`)
      .then((response) => {
        this.handleCurrentWeather(response.data.currently);
        this.handleTomorrowWeather(response.data.daily.data);
        this.handleDailyWeather(response.data.daily.data);
        this.handleHourlyForecast(response.data.hourly.data);
        this.setState({
          success: true,
          status: '',
          loading: false,
          city: `${city}, ${country}`,
        });
      })
      .catch(() => {
        this.setState({
          loading: false,
          status: CHECK_CONNECTION,
        });
      });
  }

  selectCity = (city, coords) => {
    this.setState({
      loading: true,
      success: false,
      status: GETTING_WEATHER,
    });

    if (!coords) {
      locationAxios.get('address', {
        params: {
          location: city,
        },
      })
        .then((response) => {
        // always take first result, if it's needed it can be turn into autocomplete with array of response.data.results
          const cityLocation = response.data.results[0].locations[0].displayLatLng;
          const country = response.data.results[0].locations[0].adminArea1;
          const locCity = response.data.results[0].locations[0].adminArea5;
          const locCoords = [cityLocation.lng, cityLocation.lat];
          this.fetchWeather(locCity, locCoords, country);
        })
        .catch(() => {
          this.setState({
            loading: false,
            status: CHECK_CONNECTION,
          });
        });
    } else {
      const { country } = coords.properties;
      const crd = coords.geometry.coordinates;
      this.fetchWeather(city, crd, country);
    }
  }

  handleCurrentWeather = (data) => {
    const timeOptions = {
      month: 'long',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
    };

    const currentWeather = {
      time: new Date(data.time  * 1000).toLocaleString('en-US', timeOptions),
      day: new Date(data.time  * 1000).getDate(),
      temperature: Math.floor(data.temperature),
      precip: Math.floor(data.precipProbability * 100),
      icon: data.icon,
    };

    this.setState({
      currentWeather,
    });
  }

  handleTomorrowWeather = (data) => {
    const timeOptions = {
      month: 'long',
      day: '2-digit',
    };
    const tomorrow = data[1];

    const today = new Date();
    const offset = -(today.getTimezoneOffset() / 60);
    const dataWithOffset = new Date(new Date(tomorrow.time * 1000).getTime() + offset * 3600 * 1000);
    const tomorrowWeather = {
      time: dataWithOffset.toLocaleString('en-US', timeOptions),
      day: dataWithOffset.getDate(),
      precip: Math.floor(tomorrow.precipProbability * 100),
      icon: tomorrow.icon,
    };

    this.setState({ tomorrowWeather });
  }

  handleDailyWeather = (data) => {
    const timeOptions = {
      weekday: 'short',
      month: 'short',
      day: '2-digit',
      formatMatcher: 'best fit',
    };
    const dailyWeather = data.map((day, index) => ({
      time: index === 0 ? 'Today' : new Date(day.time * 1000).toLocaleString('en-US', timeOptions).slice(0, 11),
      temperatureLow: Math.floor(day.temperatureLow),
      temperatureHigh: Math.floor(day.temperatureHigh),
      icon: day.icon,
    }));
    this.setState({ dailyWeather });
  }

  handleHourlyForecast = (data) => {
    const getDayTime = (time) => {
      switch (time) {
        case 0: return 'night';
        case 6: return 'morning';
        case 12: return 'afternoon';
        case 18: return 'evening';
        default: return '';
      }
    };
    const hourly = [];
    data.forEach((dayData) => {
      const date = new Date(dayData.time * 1000);
      const hour = date.getHours();
      if ((hour % 6 === 0) || (hour === 0)) {
        const day = date.getDate();
        hourly.push({
          id: day,
          temperature: Math.floor(dayData.temperature),
          dayTime: getDayTime(hour),
        });
      }
    });

    this.setState({ hourly });
  }

  nextTab = () => {
    this.setState((prevState) => {
      if (prevState.activeTab !== 2) {
        return {
          activeTab: prevState.activeTab + 1,
        };
      }
      return prevState;
    });
  }

  prevTab = () => {
    this.setState((prevState) => {
      if (prevState.activeTab !== 0) {
        return {
          activeTab: prevState.activeTab - 1,
        };
      }
      return prevState;
    });
  }

  pageDown = () => {
    if (this.daysRef.current) {
      this.daysRef.current.style.top = STET_DOWN;
    }
  }

  pageUp = () => {
    if (this.daysRef.current) {
      this.daysRef.current.style.top = STET_UP;
    }
  }

  isTypingNow = (value) => {
    this.setState({
      isTyping: !!value,
    });
  }

  render() {
    const {
      activeTab,
      currentWeather,
      tomorrowWeather,
      dailyWeather,
      hourly,
      success,
      status,
      city,
      loading,
      isTyping,
    } = this.state;

    const renderTabsContent = () => {
      switch (activeTab) {
        case 0: return <OneDayWeather weather={currentWeather} hourly={hourly} />;
        case 1: return <OneDayWeather weather={tomorrowWeather} tomorrow hourly={hourly} />;
        case 2: return <DaysWeather ref={this.daysRef} weather={dailyWeather} />;
        default: return null;
      }
    };

    const spinner = loading ? <Spinner /> : null;

    const softKeys = isTyping
      ? (
        <SoftKey
          right="Back"
          left="Set"
        />
      )
      : (
        <SoftKey
          onKeyLeft={this.prevTab}
          onKeyRight={this.nextTab}
          onKeyDown={this.pageDown}
          onKeyUp={this.pageUp}
        />
      );


    return (
      <React.Fragment>
        {spinner}
        <StatusBar />
        <Search
          select={this.selectCity}
          city={city}
          typing={this.isTypingNow}
        />
        <TabsArea>
          <Tab active={activeTab === 0}>Today</Tab>
          <Tab active={activeTab === 1}>Tomorrow</Tab>
          <Tab active={activeTab === 2}>7 days</Tab>
        </TabsArea>
        <ContentWrapper>
          {
            success
              ? renderTabsContent()
              : <Warning>{status}</Warning>
          }
        </ContentWrapper>
        {softKeys}
      </React.Fragment>
    );
  }
}

export default App;

const ContentWrapper = styled.div`
  display: flex;
  height: 100%;
  position: relative;
  overflow: hidden;
`;
