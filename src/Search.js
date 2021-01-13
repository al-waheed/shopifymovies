import React, { Component } from "react";
import { ToastsStore } from 'react-toasts';
import axios from "axios";
import Movies from "./Movies";
import Nominated from "./Nominated";

class Search extends Component {
  state = {
    movies: [],
    nominated: [],
    searchMovie: "",
    loading: false,
  };

  handleSearch = () => {
    this.setState({loading: true});
    axios.get(
        `http://www.omdbapi.com/?i=tt3896198&apikey=adc62984&type=movie&s=${this.state.searchMovie}`)
      .then((res) => {
        this.setState({
          movies: res.data.Search,loading:false
        });
      });
  };
  nominateMovies = (nominate) => {
    const nominatedMovies = [...this.state.nominated, nominate];
    this.setState({
      nominated: nominatedMovies
    });
  };
 
  isNotify = () => {
    if(this.state.nominated.length === 4)
    return ToastsStore.success("Hey, you just nominated 5 movies!")
  }

  removedMovies = (id) => {
    const removeMovie = this.state.nominated.filter((movies) => {
      return movies.imdbID !== id;
    });
    this.setState({
      nominated: removeMovie,
    });
  };

  handleChange = (e) => {
    this.setState({
      searchMovie: e.target.value,
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    e.target.reset();
  };

  render() {
    const { movies, nominated, loading } = this.state;
    const movieIds = nominated.map(movie => {
      return movie.imdbID
    });
    
    return (
      <div>
        <div className="search-box">
          <div>
            <h1>The Movies</h1>
            <form onSubmit={this.handleSubmit}>
              <fieldset className="search-fieldset">
                <h4>Movie title</h4>
                <input
                  type="text"
                  required
                  placeholder="Search movie..."
                  onChange={this.handleChange}
                  className="search-input"/>
                <button onClick={this.handleSearch} className="search-btn">
                search
                </button>
              </fieldset>
            </form>
          </div>
        </div>
        <div className="movielist">
            <Movies movies={movies} nominateMovies={this.nominateMovies} loading={loading}  movieIds={movieIds} isNotify={this.isNotify} />
            <Nominated nominated={nominated} removedMovies={this.removedMovies} />
          </div>
      </div>
    );
  }
}

export default Search;
