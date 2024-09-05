import { useEffect, useState } from "react";
import api from '../../services/api';
import { Link } from "react-router-dom";
import './home.css'

function Home (){
    const [filmes , setFilmes] = useState ([]);
    const [loading, setLoading] = useState(true);
    // Primeiro ele ler o useEffect e por isso tem uma função de
    // serLoading para dar um tempo de carregar tudo se a API ou Internet tiver lenta
    useEffect(()=>{
        async function loadFilmes(){
            const response = await api.get('movie/now_playing', {
                params:{
                    api_key: 'dbc8f75f11ca4311d9be0c9e51f0b2ba',
                    language: 'pt-BR',
                    page: 1,
                }
            })
            //console.log(response);
            //console.log(response.data.results.slice(0,10));
            setFilmes(response.data.results.slice(0,10));
            setLoading(false);
        }
        loadFilmes ();
    },[])

    if(loading){
        return(
            <div className="loading">
                <h2>Carregando filmes ...</h2>
            </div>
        )
    }

    return(
        <div className="container">
            <div className="lista-filmes">
                {filmes.map((filme)=>{
                    return(
                        <article key={filme.id}>
                            <strong>{filme.title}</strong>
                            <img src={`https://image.tmdb.org/t/p/original/${filme.poster_path}`} alt={filme.title} />
                            <Link to={`/filme/${filme.id}`}>Acessar</Link>
                        </article>
                    )
                })}
            </div>
        </div>
    )
}

export default Home;