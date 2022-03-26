import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://2a93-88-147-48-141.ngrok.io/api',
});

export default instance;
