import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../../services/api";
import './filme.css';
import { toast } from "react-toastify";


function Filme (){
    const { id } = useParams();
    const navigate = useNavigate();
    const [filme,setFilme] = useState ([]);
    const [loading,setLoading] = useState(true);
    console.log(id);

    useEffect(()=>{
        async function loadFilme(){
            await api.get(`/movie/${id}`, {
                params:{
                    api_key: 'dbc8f75f11ca4311d9be0c9e51f0b2ba',
                    language: 'pt-BR',
                }
            })
            // Retornou resultados
            .then((response)=>{
                //console.log(response);
                setFilme(response.data);
                setLoading (false);
            })
            // Não retornou resultados
            .catch(()=>{
                //console.log("Filme não encontrado");
                navigate("/",{replace:true});
                return;
            })
        }
        loadFilme ();

        return () => {
            console.log("Componente foi desmontado");
        }
    },[navigate,id])

    function salvarFilme(){
        const minhaLista = localStorage.getItem("@primeflix");
        let filmesSalvos = JSON.parse(minhaLista) || [];
        const hasFilme = filmesSalvos.some((filmesSalvos) => filmesSalvos.id === filme.id);
        //return para parar a execução senão pode continuar
        if (hasFilme){
            toast.warn("Esse filme já foi salvo :p");
            return;
        }
        //Salvando em localStorage
        filmesSalvos.push(filme);
        //Agora tá salvando as informações daquele filme selecionado que estão no objeto filmesSalvos
        localStorage.setItem("@primeflix", JSON.stringify(filmesSalvos));
        toast.success("Filme salvo com sucesso :D ");
    }

    if (loading){
        return(
            <div className="filme-info">
                <h1>Carregando detalhes ...</h1>
            </div>
        )
    }

    return(
        <div className="filme-info">
            <h1>{filme.title}</h1>
            <img src={`https://image.tmdb.org/t/p/original/${filme.backdrop_path}`} alt={filme.title} />
            <h3>Sinopse</h3>
            <span>{filme.overview}</span>
            <strong>Avaliação: {filme.vote_average} / 10 </strong>
            
            <div className="area-buttons">
                <button onClick={salvarFilme}>Salvar</button>
                <button><a target="_blank" rel="external" href={`https://youtube.com/results?search_query=${filme.title} Trailer`}>Trailer</a></button>
            </div>
        </div>
    )
}

export default Filme;