import theMovieDbApi from "./js/fetchMovies";
import insertCreatedObject from './js/createOneObject'
import preLoader from './js/preLoader'
const movieDbApi = new theMovieDbApi();


async function movies(){
    try{
       const response = await movieDbApi.fetchMovies();
       console.log(response)
       insertCreatedObject(response.results)
    preLoader()
    }catch(error){
        console.log(error)
    };
};

movies();
