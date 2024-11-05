import axios from 'axios';

const instance = axios.create({
    baseURL: 'http://ec2-54-221-134-204.compute-1.amazonaws.com/',
    headers: {
        'Content-Type': 'application/json',
    },
});

export default instance;
