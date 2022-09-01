import theMovieDbApi from "./fetchMovies";
import createdCardFilm from "./markUpModal";

import addToWatchedFilm from "./localStorageToWatchedFilm";
import addToQueueFilm from "./localStorageToQueueFilm";
import removeStorageWatchedFilm from './removeStorageWatchedFilm';
import removeStorageQueueFilm from './removeStorageQueueFilm';
import spinner from './preLoader'

const movieDbApi = new theMovieDbApi();

import getWatchedData from './library/getWatchedData';
import getQueueData from './library/getQueueData';


export function onCardFilmClick(e) {
    const id = e.target.parentNode.parentNode.parentNode.id || e.target.parentNode.parentNode.id;
    console.log(id);
    oneMovies(id);
}
async function oneMovies(id) {
    try {
        const oneMovieResponse = await movieDbApi.fetchOneMovie(id);
        createdCardFilm(oneMovieResponse);

        const refsEl = {
            btnWatched: document.getElementById('btn-w'),
            btnRemoveWatched: document.getElementById('btn-rw'),
            btnQueue: document.getElementById('btn-q'),
            btnRemoveQueue: document.getElementById('btn-rq'),
        }
        console.log(refsEl);
        filterLocalStorageWatched(id);
        filterLocalStorageQueue(id);

        function filterLocalStorageWatched (idOpenFilm) {
            const arrayWatchedFilms = getWatchedData();
            const result = arrayWatchedFilms.some(film => film.id === idOpenFilm);
          
            console.log(result);
            if (result === true) {
                refsEl.btnWatched.classList.add('hide');
                refsEl.btnRemoveWatched.classList.remove('hide');
                refsEl.btnRemoveWatched.addEventListener('click', onRemoveWatchedBtnClick);
                return;   
            } 
                refsEl.btnWatched.classList.remove('hide');
                refsEl.btnRemoveWatched.classList.add('hide');
                refsEl.btnWatched.addEventListener('click', onWatchedBtnClick);
            }

            function onRemoveWatchedBtnClick() {
                removeStorageWatchedFilm(oneMovieResponse.id);
                refsEl.btnRemoveWatched.classList.add('hide');
                refsEl.btnWatched.classList.remove('hide');
                refsEl.btnRemoveWatched.removeEventListener('click', onRemoveWatchedBtnClick);
                refsEl.btnWatched.addEventListener('click', onWatchedBtnClick);

            }
            function onWatchedBtnClick() {
                addToWatchedFilm(oneMovieResponse);
                console.log(oneMovieResponse);
                refsEl.btnWatched.classList.add('hide');
                refsEl.btnRemoveWatched.classList.remove('hide');
                refsEl.btnWatched.removeEventListener('click', onWatchedBtnClick);
                refsEl.btnRemoveWatched.addEventListener('click', onRemoveWatchedBtnClick);
            }

            function filterLocalStorageQueue (idOpenFilm) {
            const arrayWatchedFilms = getQueueData();
            const result = arrayWatchedFilms.some(film => film.id === idOpenFilm);
            console.log(result);
            if (result === true) {
                refsEl.btnQueue.classList.add('hide');
                refsEl.btnRemoveQueue.classList.remove('hide');
                refsEl.btnRemoveQueue.addEventListener('click', onRemoveQueueBtnClick);
                function onRemoveQueueBtnClick() {
                    removeStorageQueueFilm(id);
                    refsEl.btnQueue.classList.remove('hide');
                    refsEl.btnRemoveQueue.add('hide');
                }
                
            } else {
                refsEl.btnRemoveQueue.classList.add('hide');
                refsEl.btnQueue.classList.remove('hide');
                refsEl.btnQueue.addEventListener('click', onQueueBtnClick);
                function onQueueBtnClick() {
                    addToQueueFilm(oneMovieResponse);
                    refsEl.btnQueue.classList.add('hide');
                    refsEl.btnRemoveQueue.classList.remove('hide');
                }
            } 
            }

    } catch(error) {
    console.log(error);
    };
} 
   
