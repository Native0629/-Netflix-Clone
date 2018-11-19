import React, { Component } from "react";
import axios from 'axios'; 
import MovieShowCaseRow from '../MovieShowcase/MovieShowcaseRow/MovieShowcaseRow'; 
import Modal from "../../components/UI/Modal/Modal"; 
import MovieSummary from '../../components/MovieRow/MovieSummary/MovieSummary'; 

class MovieShowcase extends Component {

  state = {
    trendingMovieRow: [],
    netflixOriginalsRow: [],
    topRatedRow: [],
    comedyMovieRow: [],
    horrorMovieRow: [],
    actionMovieRow: [],
    animatedMovieRow: [],
    documentaryRow: [],
    romanceMovieRow: [],
    toggle: false,
    movieDetails: {},
  }

  componentWillMount() {
    this.getTrending(); 
    this.getTopRated(); 
    this.getComedyMovies(); 
    this.getActionMovies(); 
    this.getHorrorMovies(); 
    this.getNetflixMovies(); 
    this.getRomanceMovies(); 
    this.getDocumentaries(); 
    this.getAnimatedMovies(); 
  }
  
  /** 
   Get the movie details for a single movie 
   @param {object} movieObject - A single movie object
   */
  getMovieDetails = (movieObject) => {
    this.setState({toggle: true})
    this.setState({ movieDetails: movieObject }); 
  }

  closeModal = () => {
    this.setState({toggle: false})
  }


  /** Extract our movie data */
  getMovieRows = (res, url) => {
    const results = res.data.results; 
    let movieRows = []; 
     
    results.forEach((movie) => {
      let movieImageUrl = "https://image.tmdb.org/t/p/original/" + movie.backdrop_path;
      if (url === "https://api.themoviedb.org/3/discover/tv?api_key=224ce27b38a3805ecf6f6c36eb3ba9d0&with_networks=213") {
        movieImageUrl = "https://image.tmdb.org/t/p/original/" + movie.poster_path;
      }
      
      if (movie.poster_path && movie.backdrop_path !== null) {
        console.log(movieImageUrl);
        const movieComponent = <MovieShowCaseRow
          movieDetails={() => this.getMovieDetails(movie)}
          key={movie.id}
          url={url}
          posterUrl={movieImageUrl}
          movie={movie} />
        movieRows.push(movieComponent);
      }

    })
    // update state 
   return movieRows; 
       
  }

  /**
   * Send request for movies that are popular right now
   */
  getTrending = () => {
    const url = "https://api.themoviedb.org/3/trending/all/week?api_key=224ce27b38a3805ecf6f6c36eb3ba9d0&language=en-US"; 
   
    axios.get(url)
      .then(res => {
       
        const movieRows = this.getMovieRows(res, url);
        this.setState({ trendingMovieRow: movieRows });
      })
      .catch(error => {
        console.log(error);
      });
  }

  /**
   * Send request for movies that are top rated 
   */
  getTopRated = () => {
    const url = "https://api.themoviedb.org/3/movie/top_rated?api_key=224ce27b38a3805ecf6f6c36eb3ba9d0&language=en-US"; 

    axios.get(url)
      .then(res => {
        const movieRows = this.getMovieRows(res, url);
        this.setState({ topRatedRow: movieRows }); 
      }).catch(error => {
        console.log(error); 
      })
  }

  /**
   * Get Netflix originals 
   */
  getNetflixMovies = () => {
    const url = "https://api.themoviedb.org/3/discover/tv?api_key=224ce27b38a3805ecf6f6c36eb3ba9d0&with_networks=213";

    axios.get(url)
      .then(res => {
        
        const movieRows = this.getMovieRows(res, url); 
        this.setState({ netflixOriginalsRow: movieRows }); 
      })
      .catch(error => {
        console.log(error); 
      })
  }

  getActionMovies = () => {
    const url = "https://api.themoviedb.org/3/discover/movie?api_key=224ce27b38a3805ecf6f6c36eb3ba9d0&with_genres=28";

    axios.get(url)
      .then(res => {
        console.log(res);
        const movieRows = this.getMovieRows(res, url);
        this.setState({ actionMovieRow: movieRows });
      })
      .catch(error => {
        console.log(error);
      })
  }

  getComedyMovies = () => {
    const url = "https://api.themoviedb.org/3/discover/movie?api_key=224ce27b38a3805ecf6f6c36eb3ba9d0&with_genres=35";

    axios.get(url)
      .then(res => {
        console.log(res);
        const movieRows = this.getMovieRows(res, url);
        this.setState({ comedyMovieRow: movieRows });
      })
      .catch(error => {
        console.log(error);
      })
  }

  getHorrorMovies = () => {
    const url = "https://api.themoviedb.org/3/discover/movie?api_key=224ce27b38a3805ecf6f6c36eb3ba9d0&with_genres=27";

    axios.get(url)
      .then(res => {
        console.log(res);
        const movieRows = this.getMovieRows(res, url);
        this.setState({ horrorMovieRow: movieRows });
      })
      .catch(error => {
        console.log(error);
      })
  }

  getRomanceMovies = () => {
    const url = "https://api.themoviedb.org/3/discover/movie?api_key=224ce27b38a3805ecf6f6c36eb3ba9d0&with_genres=10749";

    axios.get(url)
      .then(res => {
        console.log(res);
        const movieRows = this.getMovieRows(res, url);
        this.setState({ romanceMovieRow: movieRows });
      })
      .catch(error => {
        console.log(error);
      })
  }

  getAnimatedMovies = () => {
    const url = "https://api.themoviedb.org/3/discover/movie?api_key=224ce27b38a3805ecf6f6c36eb3ba9d0&with_genres=16";

    axios.get(url)
      .then(res => {
        console.log(res);
        const movieRows = this.getMovieRows(res, url);
        this.setState({ animatedMovieRow: movieRows });
      })
      .catch(error => {
        console.log(error);
      })
  }

  getDocumentaries = () => {
    const url = "https://api.themoviedb.org/3/discover/movie?api_key=224ce27b38a3805ecf6f6c36eb3ba9d0&with_genres=99";

    axios.get(url)
      .then(res => {
        console.log(res);
        const movieRows = this.getMovieRows(res, url);
        this.setState({ documentaryRow: movieRows });
      })
      .catch(error => {
        console.log(error);
      })
  }

   render() {


      return (  
        <div className="movieShowcase">

          <h1 className="movieShowcase__heading">Netflix Originals</h1>
          <div className="movieShowcase__container">
            {this.state.netflixOriginalsRow}
          </div>
          
          <h1 className="movieShowcase__heading">Trending Now</h1>
          <div className="movieShowcase__container">
              {this.state.trendingMovieRow}
          </div>

          <h1 className="movieShowcase__heading">Top Rated</h1>
          <div className="movieShowcase__container">
              {this.state.topRatedRow}
          </div>

          <h1 className="movieShowcase__heading">Action Movies</h1>
          <div className="movieShowcase__container">
              {this.state.actionMovieRow}
          </div>

          <h1 className="movieShowcase__heading">Comedy Movies</h1>
          <div className="movieShowcase__container">
              {this.state.comedyMovieRow}
          </div>

          <h1 className="movieShowcase__heading">Horror Movies</h1>
          <div className="movieShowcase__container">
              {this.state.horrorMovieRow}
          </div>

          <h1 className="movieShowcase__heading">Romance Movies</h1>
          <div className="movieShowcase__container">
              {this.state.romanceMovieRow}
          </div>

          <h1 className="movieShowcase__heading">Animated Films</h1>
          <div className="movieShowcase__container">
              {this.state.animatedMovieRow}
          </div>

          <h1 className="movieShowcase__heading">Documentaries</h1>
          <div className="movieShowcase__container">
              {this.state.documentaryRow}
          </div>
        
          <Modal show={this.state.toggle} modalClosed={this.closeModal} movie={this.state.movieDetails}>
            <MovieSummary movie={this.state.movieDetails}/>
          </Modal>
        </div>
      );
   }
}

export default MovieShowcase; 
