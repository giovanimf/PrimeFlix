import axios from "axios";

//URL BASE:https: api.themoviedb.org/3/
//URL PARAMETERS : movie/now_playing?api_key=dbc8f75f11ca4311d9be0c9e51f0b2ba&language=pt-BR
//URL COMPLETE: api.themoviedb.org/3/movie/now_playing?api_key=dbc8f75f11ca4311d9be0c9e51f0b2ba&language=pt-BR

const api = axios.create({
    baseURL: 'https://api.themoviedb.org/3/',
});

export default api;