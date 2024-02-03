import React from "react";
import axios from "axios";
import "./movie.css";

class Movies extends React.Component {
constructor(props) {
    super(props);
    this.state = {
    filterData: [],
    hoverID: null
    };
}

async componentDidMount() {
    console.clear();
    this.fetchMovies("war");
}

async fetchMovies(query) {
    try {
    const response = await axios.get(
        `https://www.omdbapi.com/?apikey=45f0782a&s=war ${query}`
    );
    this.setState({ filterData: response.data.Search || [] });
    } catch (error) {
    console.error("Error fetching movies:", error);
    }
}

searchMovies = async (query) => {
    if (query.trim() === "") {
   
    this.fetchMovies("war");
    } else {
    this.fetchMovies(query);
    }
};

handleMouseEnter = (id) => {
    this.setState({ hoverID: id });
};

handleMouseLeave = () => {
    this.setState({ hoverID: null });
};

render() {
    const { filterData, hoverID } = this.state;

    return (
    <div className="body--wrapper">
        <h1>Movie-Website</h1>
        <div className="section-body">
        <div className="searchBar--wrapper">
            <input
            type="text"
            className="searchBar"
            placeholder="Search for Movie Title"
            onChange={(e) => this.searchMovies(e.target.value)}
            />
        </div>
        <div>
            <div className="moviePosters--wrapper">
            {filterData.map((movie) => (
                <div
                key={movie.imdbID}
                className="poster--pack"
                onMouseEnter={() => this.handleMouseEnter(movie.imdbID)}
                onMouseLeave={this.handleMouseLeave}
                >
                <div className="poster--img--wrapper">
                    <img
                    className="poster--img"
                    src={movie.Poster}
                    alt={movie.Title}
                    />
                    <div className="poster--title">
                    <h3>{movie.Title}</h3>
                    </div>
                    {hoverID === movie.imdbID && (
                    <div className="poster--overlay">
                        <h3>{movie.Title}</h3>
                    </div>
                    )}
                </div>
                </div>
            ))}
            </div>
        </div>
        {filterData.length === 0 && (
            <div className="error--wrapper">
            <span className="error404">Loading...</span>
            </div>
        )}
        </div>
    </div>
    );
}
}

export default Movies;