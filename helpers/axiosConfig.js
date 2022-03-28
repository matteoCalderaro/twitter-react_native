import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://60cb-88-147-48-141.ngrok.io/api',
});

export default instance;
