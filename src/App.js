import { useEffect, useState } from "react"
import { MovieRow } from "./components/MovieRow";
import { FeaturedMovie } from "./components/FeaturedMovie";
import Tmdb from "./Tmdb"
import './App.css'
import { Header } from "./components/Header";

const App = () => {
  const [movieList, setMovieList] = useState([]);
  const [featuredData, setFeaturedData] = useState(null);
  const [blackHeader, setBlackHeader] = useState(false);

  useEffect(()=>{
    const scrollListener = () =>{
      if(window.scrollY > 10){
        setBlackHeader(true);
      }else{
        setBlackHeader(false);
      }
    }
    window.addEventListener('scroll', scrollListener);
    return () => {
      window.removeEventListener('scroll', scrollListener);
    }
  },[]);

  useEffect(()=>{
    const loadAll = async() =>{
      //Total film list
      let list = await Tmdb.getHomeList();
      setMovieList(list);
      //Get Featured
      let originals = list.filter(i=>i.slug === 'originals');
      let randomChosen = Math.floor(Math.random() * (originals[0].items.results.length - 1));
      let chosen = originals[0].items.results[randomChosen];
      let chosenInfo= await Tmdb.getMovieInfo(chosen.id, 'tv');
      
      setFeaturedData(chosenInfo);
    }
    loadAll();
  },[]);

  return(
    <div className="page">
      
      <Header black={blackHeader}/>

      {featuredData &&
        <FeaturedMovie item={featuredData}/>
      }

      <section className="lists">
        {movieList.map((item, index)=>(
          <div key={index}>
            <MovieRow title={item.title} items={item.items}/>
          </div>
        ))}
      </section>
      <footer>
          Feito por <a href="https://github.com/Gguife">Gguife</a> <br/>
          Direitos de imagem Netflix <br/>
          Dados pegos do site Themoviedb.org
      </footer>
      
      {movieList.length <= 0 &&
        <div className="loading">
          <img src="https://i.gifer.com/origin/36/36527397c208b977fa3ef21f68c0f7b2_w200.gif" alt='' />
        </div>
      }
    </div>
   )
}
export default App