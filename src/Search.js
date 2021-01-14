import React, { Component } from "react";
import { ToastsStore } from 'react-toasts';
import axios from "axios";
import Movies from "./Movies";
import Nominated from "./Nominated";
import env from 'dotenv'
import Footer from "./Footer";
import pic from './image/pic.png'
env.config()

class Search extends Component {
  state = {
    movies: [],
    nominated: [],
    searchMovie: ""
  };

  handleSearch = () => {
    this.setState({loading: true});
    axios.get(
        `${process.env.REACT_APP_URL}&s=${this.state.searchMovie}`)
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
    const removeMovie = this.state.nominated.filter((movie) => {
      return movie.imdbID !== id;
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
            <div className='headingText'>
            <img src={pic} alt='icon-pics' className='iconPics'/>
            <h1>The Movies</h1>
            </div>
            <form onSubmit={this.handleSubmit}>
              <fieldset className="search-fieldset">
                <h4>Movie title</h4>
                <input type="text" required placeholder="Search Movie" onChange={this.handleChange} className="search-input"/>
                <button onClick={this.handleSearch} className="search-btn"> <i class="fa fa-search"></i></button>
              </fieldset>
            </form>
          </div>
        </div>
        <div className='container'>
           <div className="movielist">
            <Movies movies={movies} nominateMovies={this.nominateMovies} loading={loading}  movieIds={movieIds} isNotify={this.isNotify} />
            <Nominated nominated={nominated} removedMovies={this.removedMovies} />
          </div>
          <div>
            <Footer />
          </div>
      </div>
    </div>
    );
  }
}

export default Search;
