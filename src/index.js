import theMovieDbApi from "./js/fetchMovies";
import insertCreatedObject from './js/createOneObject'
import spinner from './js/preLoader'


import {createPagination, getCurrentPageLs} from "./js/createPagination"

const movieDbApi = new theMovieDbApi();


async function movies(){
    spinner.startSpinner();
    try{
        const response = await movieDbApi.fetchMovies();
        const genreResponse = await movieDbApi.fetchGenres();
        console.log(response);
        console.log(genreResponse);
        insertCreatedObject(response.results)
        if(response.total_pages > 1) createPagination(response)
        spinner.removeSpinner();
        
    }catch(error){
        console.log(error)
    };
};

movieDbApi.setPage(getCurrentPageLs())        
movies();
