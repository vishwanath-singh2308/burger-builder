import axios from 'axios'

const instance = axios.create({
    baseURL: 'https://react-burger-builder-b384e-default-rtdb.firebaseio.com/'
});

export default instance;