import axios from 'axios';

const apiKey = '7e3a21ef4aa1e21437c4fbd4701c91ef';
const proxy = 'https://cors-anywhere.herokuapp.com/';


const axiosInstance = axios.create({
  baseURL: `${proxy}https://api.darksky.net/forecast/${apiKey}/`,
});


axiosInstance.defaults.params = {
  units: 'ca'
};

export default axiosInstance;
