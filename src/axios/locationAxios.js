import axios from 'axios';

const apiKey = 'Adt0omCyxyZiNAqfAmO1fJf785e6iy21';

const axiosInstance = axios.create({
  baseURL: `http://www.mapquestapi.com/geocoding/v1`,
});


axiosInstance.defaults.params = {
  key: apiKey,
};

export default axiosInstance;
