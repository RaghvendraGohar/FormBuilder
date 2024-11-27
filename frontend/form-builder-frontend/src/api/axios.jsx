import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://formbuilder-k1a7.onrender.com/api/forms', 
  headers: {
    'Content-Type': 'application/json',
  },
});

export default instance;
