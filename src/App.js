import './App.css';
import { useEffect, useState } from 'react';
import searchIcon from './search.svg'
import MovieCard from './MovieCard.jsx';
const API_URL = 'https://www.omdbapi.com?apikey=6c4dd14c'


function App() {
    const [movies, setMovies] = useState([])
    const [ searchTerm, setSearchTerm ] = useState('')

    const searchMovie = async (title) => {
        const response = await fetch(`${API_URL}&s=${title}`);
        const data = await response.json()
        
        setMovies(data.Search)
    }
    
    useEffect(() => {
        searchMovie('spiderman')
    }, [])
  return (
    <div className="app">
        <h1>Movie Hub</h1>
        <div className='search'>
        <input 
        placeholder='search movie'
        value={searchTerm}
        onChange={(e) => { setSearchTerm(e.target.value)}}
        />

        <img 
        src={searchIcon}
        alt="search"
        onClick={() => { searchMovie(searchTerm) }}
        />
        </div>
            {movies?.length > 0 
                ? (
                    <div className='container'>
                        {movies.map((movie) => 
                            <MovieCard movie={movie} />    
                        )}
                    </div>
                ): (
                    <div className='empty'>
                        <h2>No movies found</h2>
                    </div>
                )
            }
       
    </div>
  );
}

export default App;
