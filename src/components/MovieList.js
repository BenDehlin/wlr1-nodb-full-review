import {Component} from 'react'
import axios from 'axios'
import AddMovie from './AddMovie'
import Movie from './Movie'

class MovieList extends Component{
  constructor(){
    super()
    this.state = {
      movieArray: []
    }
    // this.deleteMovie = this.deleteMovie.bind(this)
  }

  componentDidMount(){
    axios.get('/api/movies')
    .then((res) => {
      this.setState({movieArray: res.data})
    })
    .catch((err) => {
      console.log(err)
    })
  }

  deleteMovie = (id) =>{
    axios.delete(`/api/movies/${id}`)
    .then((res) => {
      this.setState({movieArray: res.data})
    })
    .catch((err) => {
      console.log(err)
    })
  }

  addMovie = (title, director, image) => {
    axios.post('/api/movies', {title, director, image})
    .then((res) => {
      this.setState({movieArray: res.data})
    })
    .catch((err) => {
      console.log(err)
    })
  }

  editMovie = (id, title) => {
    axios.put(`/api/movies/${id}`, {title})
    .then((res) => {
      this.setState({movieArray: res.data})
    })
    .catch((err) => {
      console.log(err)
    })
  }

  render(){
    return(
      <div>
        <AddMovie addMovie={this.addMovie} />
        {this.state.movieArray.map((movie) => {
          return(
            <Movie 
            movie={movie} 
            deleteMovie={this.deleteMovie}
            editMovie={this.editMovie}
             />
            // <div>
            //   <p>{movie.title}</p>
            //   <button onClick={() => this.deleteMovie(movie.id)}>Delete Movie</button>
            // </div>
          )
        })}
      </div>
    )
  }
}

export default MovieList