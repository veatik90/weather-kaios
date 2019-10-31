import React from 'react';
import styled from 'styled-components';
import Diagram from '../WeatherDiagram/WeatherDiagram';
import Icon, { statusMessage } from '../Icon/Icon';

const oneDayWeather = ({ weather, hourly, tomorrow }) => {
  const getHourlyWeather = () => hourly.filter((day) => (day.id === weather.day));

  const diagramCoordsCalc = () => {
    const coords = {};
    const hoursWeather = getHourlyWeather();
    if (hoursWeather.length) {
      const sorted = hoursWeather.sort((a, b) => a.temperature - b.temperature);
      const min = sorted[0].temperature;

      sorted.forEach((item) => {
        const { dayTime } = item;
        coords[dayTime] = (item.temperature - min) + 32;
      });
    }
    return coords;
  };

  const getHourlyTemps = () => {
    const hoursWeather = getHourlyWeather();
    const temps = {};
    hoursWeather.forEach((item) => {
      const { dayTime } = item;
      temps[dayTime] = item.temperature;
    });

    return temps;
  };

  return (
    <Rows>
      <IconWrap>
        <Icon type={`big-${weather.icon}`} />
      </IconWrap>
      <StatusMessage>{statusMessage(weather.icon)}</StatusMessage>
      <Row>
        <Date>{weather.time}</Date>
      </Row>
      <Row>
        {tomorrow || (
        <CurrentTemp>
          {weather.temperature}
          &deg;
        </CurrentTemp>
        )}
        <PrecipWrap>
          <Icon type="humid" />
          <Precip>
            {weather.precip}
%
          </Precip>
        </PrecipWrap>
      </Row>
      <Diagram temps={getHourlyTemps()} coords={diagramCoordsCalc()} />
    </Rows>
  );
};

export default oneDayWeather;

const Rows = styled.div`
  display: flex;
  flex-direction: column;
`;

const Row = styled.div`
  margin-left: 9px;
  display: flex;
  align-items: flex-end;
`;

const Date = styled.div`
  margin-top: 16px;
  height: 14px;
  font-size: 12px;
  font-weight: 500;
  color: #1e1d20;
`;

const CurrentTemp = styled.div`
  margin-top: 14px;
  height: 57px;
  font-size: 48px;
  font-weight: 300;
  color: #1e1d20;
`;

const PrecipWrap = styled.div`
  display: flex;
  margin-top: 14px;
  align-items: flex-end;
  padding-bottom: 8px;
  height: 57px;
`;

const Precip = styled.div`
  display: flex;
  align-self: flex-end;
  padding-bottom: 1px;
  font-size: 12px;
  font-weight: 500;
  color: #5185ba;
  margin-left: 5px;
`;

const IconWrap = styled.div`
  width: 50px;
  height: 50px;
  position: absolute;
  right: 14px;
  top: 22px;
`;

const StatusMessage = styled.div`
  position: absolute;
  width: 50px;
  font-size: 12px;
  text-align: center;
  color: #797e83;
  right: 14px;
  top: 79px;
`;
