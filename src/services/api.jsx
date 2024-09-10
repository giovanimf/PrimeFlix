import axios from "axios";

//URL BASE:https: api.themoviedb.org/3/
//URL PARAMETERS : movie/now_playing?api_key=colocarchavekey&language=pt-BR
//URL COMPLETE: api.themoviedb.org/3/movie/now_playing?api_key=colocarchavekey&language=pt-BR

const api = axios.create({
    baseURL: 'https://api.themoviedb.org/3/',
});

export default api;