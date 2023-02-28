const API_KEY = '78e75d524d54f7dc8cb20ecdd27e5dfe';
const API_BASE = 'https://api.themoviedb.org/3';

/*
  get list
- originais da netflix
- recomendados (trending)
- em alta (top rated)
- açao
- comédia
- terror
- romance
- documentario
*/ 

const basicFetch = async(endpoint) =>{
  const res = await fetch(`${API_BASE}${endpoint}`)
  const json = await res.json()

  return json;
}


export default {
  getHomeList: async () =>{
    return [
      {
        slug: 'originals',
        title:  'Originais do Netflix',
        items: await basicFetch(`/discover/tv?with_network=213language=pt-BR&api_key=${API_KEY}`)
      },
      {
        slug: 'trending',
        title: 'Recomendados para você',
        items: await basicFetch(`/trending/all/week?language=pt-BR&api_key=${API_KEY}`)
      },
      {
        slug: 'toperated',
        title: 'Em alta',
        items: await basicFetch(`/movie/top_rated?language=pt-BR&api_key=${API_KEY}`)
      },
      {
        slug: 'action',
        title: 'Ação',
        items: await basicFetch(`/discover/movie?with_genres=28&language=pt-BR&api_key=${API_KEY}`)
      },
      {
        slug: 'comedy',
        title: 'Comédia',
        items: await basicFetch(`/discover/movie?with_genres=35&language=pt-BR&api_key=${API_KEY}`)
      },
      {
        slug: 'horror',
        title: 'Terror',
        items: await basicFetch(`/discover/movie?with_genres=27&language=pt-BR&api_key=${API_KEY}`)
      },
      {
        slug: 'romance',
        title: 'Romance',
        items: await basicFetch(`/discover/movie?with_genres=10749&language=pt-BR&api_key=${API_KEY}`)
      },
      {
        slug: 'documentary',
        title: 'Documentários',
        items: await basicFetch(`/discover/movie?with_genres=99&language=pt-BR&api_key=${API_KEY}`)
      },
    ]
  },
  getMovieInfo: async(movieId, type) =>{
    let info = {};

    if(movieId){
      switch(type){
        case 'movie':
          info = await basicFetch(`/movie/${movieId}?language=pt-BR&api_key=${API_KEY}`)
        break;
        case 'tv':
          info = await basicFetch(`/tv/${movieId}?language=pt-BR&api_key=${API_KEY}`)
        break;
      }
    }

    return info;
  }
}
