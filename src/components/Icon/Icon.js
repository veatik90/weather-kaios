import React from 'react';
import ReactSVG from 'react-svg';

import search from '../../assets/search.svg';
import sunny from '../../assets/sunny.svg';
import rainy from '../../assets/rainy.svg';
import windy from '../../assets/windy.svg';
import foggy from '../../assets/foggy.svg';
import cloudy from '../../assets/cloudy.svg';
import partlyCloudy from '../../assets/partly-cloudy.svg';
import sunnyBig from '../../assets/sunny@3x.png';
import rainyBig from '../../assets/rainy@3x.png';
import windyBig from '../../assets/windy@3x.png';
import foggyBig from '../../assets/foggy@3x.png';
import cloudyBig from '../../assets/cloudy@3x.png';
import partlyCloudyBig from '../../assets/partly-cloudy@3x.png';
import humid from '../../assets/humid.svg';

const icon = ({type}) => {  
  switch(type) {
    case 'search': return <ReactSVG src={search}/>;
    case 'clear-night':
    case 'clear-day': return <ReactSVG src={sunny}/>;
    case 'snow':
    case 'sleet':
    case 'rain': return <ReactSVG src={rainy}/>;
    case 'wind': return <ReactSVG src={windy}/>;
    case 'fog': return <ReactSVG src={foggy}/>;
    case 'cloudy': return <ReactSVG src={cloudy}/>;
    case 'partly-cloudy-day':
    case 'partly-cloudy-night': return <ReactSVG src={partlyCloudy}/>;
    case 'big-clear-night':
    case 'big-clear-day': return <img src={sunnyBig} alt="sunny"/>;
    case 'big-snow':
    case 'big-sleet':
    case 'big-rain': return <img src={rainyBig} alt="rainy"/>;
    case 'big-wind': return <img src={windyBig} alt="windy"/>;
    case 'big-fog': return <img src={foggyBig} alt="foggy"/>;
    case 'big-cloudy': return <img src={cloudyBig} alt="cloudy"/>;
    case 'big-partly-cloudy-day':
    case 'big-partly-cloudy-night': return <img src={partlyCloudyBig} alt="partly-cloudy"/>;
    case 'humid': return <ReactSVG src={humid}/>;
    default: return <ReactSVG src={sunny}/>;
  }
};

export const statusMessage = (type) => {
  switch(type) {
    case 'clear-night':
    case 'clear-day': return 'sunny';
    case 'snow':
    case 'sleet':
    case 'rain': return 'rainy';
    case 'wind': return 'windy';
    case 'fog': return 'foggy';
    case 'cloudy': return 'cloudy';
    case 'partly-cloudy-day':
    case 'partly-cloudy-night': return 'partly cloudy';
    default: return 'sunny';
  }
}

export default icon;
