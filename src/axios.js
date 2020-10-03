import axios from 'axios';

// base url to make requests to the movie db
// e.g. https://api.themoviedb.org/3/trending/all/week?api_key=${API_KEY}&language=en-US
const instance = axios.create({
    baseURL: 'https://api.themoviedb.org/3',
});

export default instance;
