import React from 'react';
import styled from 'styled-components';
import Icon, { statusMessage } from '../Icon/Icon';

const daysWeather = React.forwardRef((props, ref) => {
  const days = props.weather.map((day) => (
    <DayWeather key={day.time}>
      <Date>{day.time}</Date>
      <IconWrapper>
        <Icon type={day.icon} />
        <Status>{statusMessage(day.icon)}</Status>
      </IconWrapper>
      <TempWrapper>
        <Temp>
          {day.temperatureHigh}
          &deg;
        </Temp>
        <Temp lowTemp>
          {day.temperatureLow}
          &deg;
        </Temp>
      </TempWrapper>
    </DayWeather>
  ));
  return (
    <DaysWrapper ref={ref}>
      {days}
    </DaysWrapper>
  );
});

export default daysWeather;

const DaysWrapper = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
`;

const DayWeather = styled.div`
  display: flex;
  position: relative;
  justify-content: space-between;
  align-items: center;
  height: 32px;
  min-height: 32px;
  max-height: 32px;
  width: 240px;
  border: 1px solid rgba(121, 126, 131, 0.14);
`;

const Date = styled.div`
  font-size: 12px;
  color: #1e1d20;
  margin-left: 9px;
`;

const TempWrapper = styled.div`
  display: flex;
  height: 14px;
  margin-right: 9px;
`;

const Temp = styled.div`
  text-align: right;
  width: 19px;
  font-size: 12px;
  color: #1e1d20;
  opacity: ${(props) => (props.lowTemp && '0.5')};
  margin-left: ${(props) => (props.lowTemp && '5px')};
`;

const IconWrapper = styled.div`
  display: flex;
  position: absolute;
  height: 32px;
  top: 0;
  bottom: 0;
  left: 90px;
  align-items: center;
`;

const Status = styled.div`
  font-size: 10px;
  color: #797e83;
  margin-left: 7px;
  display: flex;
  margin-bottom: 4px;
`;
