import {Component} from 'react'
import axios from 'axios'
import AddMovie from './AddMovie'
import Movie from './Movie'

class MovieList extends Component{
  constructor(){
    super()
    this.state = {
      // in MovieList we are keeping track of 1 piece of state,
      // our movieArray. This array will start out as an empty array
      // and once our page loads we will fetch information from our server
      // in an axios call inside of the componentDidMount.
      movieArray: []
    }
    // Remember! if we do not make our methods arrow functions
    // we will need to bind them to give them the proper context.
    // That would look something like this:
    // this.deleteMovie = this.deleteMovie.bind(this)
  }

  componentDidMount(){
    // This axios call will execute after the page loads for the first time,
    // it will go get the movies array from our server and save it to state.
    // Notice that the url we are hitting here is the same as the url we defined
    // in ../../server/index.js.
    axios.get('/api/movies')
    .then((res) => {
      // when our axios promise is fulfilled we will take the data from the response
      // (which is going to be the movie array) and we will save it to state. NOTICE:
      // all of our axios calls have the same .then and .catch because all of our endpoints
      // return the movie array after executing.
      this.setState({movieArray: res.data})
    })
    .catch((err) => {
      // inside the .catch we define what we want to happen if the axios promise errors
      // for any reason. In this case we just console log whatever the error was.
      console.log(err)
    })
  }

  deleteMovie = (id) =>{
    // Our deleteMovie method will need to take in an id. If you recall from our movieController
    // the deleteMovie method on the server is expecting us to pass it an id so it knows
    // what movie to delete. That means when we do our axios.delete method here we need to pass
    // it an id in the url so it shows up in our req.params on the backend. Wherever we call
    // this method (hint, onClick on the delete button in Movie.js) we will need to pass it an
    //  id so that this method can pass the id to the server as a param.
    axios.delete(`/api/movies/${id}`)
    .then((res) => {
      // Notice again that after our axios call completes we set the state of movieArray to be
      // res.data. This will be the same for all 4 axios calls we make. 
      this.setState({movieArray: res.data})
    })
    .catch((err) => {
      console.log(err)
    })
  }

  addMovie = (title, director, image) => {
    // our post axios call needs to hit /api/movies and pass it a body. If you go
    // look in the controller remember that req.body is expecting us to pass back
    // a title, a director, and an image. That means when this function is called
    // (Hint: onClick for Add Movie button in AddMovie.js) we will need to pass it
    // a title director and image. We take those 3 values and package them into a
    // "body" object after the url as you can see below.
    axios.post('/api/movies', {title, director, image})
    .then((res) => {
      this.setState({movieArray: res.data})
    })
    .catch((err) => {
      console.log(err)
    })
  }

  editMovie = (id, title) => {
    // put will behave similarly to delete and post. Remember back to
    // when we were setting up our server we decided that the put endpoint
    // would use an id param to identify what movie to delete and would also
    // pass back a title on req.body so we know what to update the title of
    // the movie to. As you can see below our axios.put looks a bit like
    // the delete and post endpoints put together. When we call this editMovie
    // function (Hint: on the Save button in Movie.js) we will need to pass it
    // an id and a title.
    axios.put(`/api/movies/${id}`, {title})
    .then((res) => {
      this.setState({movieArray: res.data})
    })
    .catch((err) => {
      console.log(err)
    })
  }

  render(){
 
    // our JSX in MovieList is rendering 2 things. It is rendering the
    // AddMovie component which will be a form with input fields for
    // title/director/image. Notice that we are passing to that component
    // the addMovie function from above as a prop.
    // The second thing we are doing here is mapping over the movieArray
    // on state and for each item in the array we are rendering the Movie
    // component. We are passing to this component as props each individual
    // movie's information as a prop called "movie" and we are also passing
    // it the deleteMovie and editMovie functions.
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
          )
        })}
      </div>
    )
  }
}
// When you are done with this file go and look in ./Movie.js to see what
// we are rendering for each item in movieArray.

export default MovieList