// Login to TMDB in order to get the API
//put the api_key
const API_URL = 'https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc&api_key=0eaa247531c9012f7d6bea3aee5d559d&page=1&page=2'

const IMG_PATH = 'https://image.tmdb.org/t/p/w1280'

//add query for search purpose
const SEARCH_API = ' https://api.themoviedb.org/3/search/movie?api_key=0eaa247531c9012f7d6bea3aee5d559d&query="'

const main = document.getElementById('main')
const form = document.getElementById('form')
const search = document.getElementById('search')

getMovies(API_URL)

//making sure i get request
async function getMovies(url){
    const res = await fetch(url)
    const data = await res.json()

    showMovies(data.results)//response in browser results
}

function showMovies(movies){
    main.innerHTML = ``
    
    movies.forEach((movie) => {
        //call values out of the movie object
        const {title, poster_path, vote_average, overview} = movie
        //now wrap first one and delete the other
        const movieEl = document.createElement(`div`)
        movieEl.classList.add('movie')

        movieEl.innerHTML = `
        <img src="${IMG_PATH + poster_path}" alt="${title}">
        <div class="movie-info">
          <h3>${title}</h3>
          <span class="${getClassByRate(vote_average)}">${vote_average}</span>
        </div>
        <div class="overview">
          <h3>overview</h3>
          ${overview}
        </div>
        `
        //putting this into the dom
        main.appendChild(movieEl)
    });
}
//passing vote average
function getClassByRate(vote){
    if(vote >=8) {
        return 'green'
    }else if(vote >= 5) {
        return 'orange'
    }else {
        return 'red'
    }
}

form.addEventListener('submit', (e)=>{
    e.preventDefault()

    const searchTerm = search.value

    //if searchTerm exist and if not equal to anythin
    if(searchTerm && searchTerm !== ''){
        getMovies(SEARCH_API + searchTerm)

        //clear search value
        search.value = ''
    }
    else {
        window.location.reload()
    }
})