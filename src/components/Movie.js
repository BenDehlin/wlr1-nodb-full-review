// This component is being rendered for each item in the movieArray on
// state in ./MovieList.js. The functionality that we have here is:
// We display the movie information, we have a button to delete a movie,
// and we have a button that puts us in edit mode. Once we are in edit mode
// we can edit the title of the movie and save it.
import { Component } from "react"

class Movie extends Component {
  constructor() {
    super()
    this.state = {
      // Our Movie component is keeping track of 2 pieces of state.
      // The first piece if state is simply a boolean that lets us know
      // if we are editing the current movie or not. The second piece of
      // state is tied to an input field. These two pieces of state will
      // allow us to click a button to put us in edit mode, type into the
      // resulting input field, and click save to save the new title for the
      // movie we are editing.
      editMode: false,
      title: "",
    }
  }

  // our handler function for the onChange in our title input field. This takes
  // whatever is typed into the input field and saves it to state as "title"
  handleTitle = (value) => {
    this.setState({ title: value })
  }

  // this function simply reverses whether we are in edit mode or not. When we click
  // the edit button it will put us in edit mode. When we click the save button it
  // will take us out of edit mode.
  toggleEdit = () => {
    this.setState({ editMode: !this.state.editMode })
  }

  // The handleSave function will pass the selected movie's id to the editMovie function
  // on our props as well as the value currently typed into the input field. After that
  // it will toggle us out of edit mode and clear the input field. Notice that we have
  // access to the id of the movie on a prop called "id". This is because when we mapped over
  // the movie array and rendered this component for each item in the array we passed this
  // component a prop called "movie" that was the movie object. This means we have access to
  // the movie's id, title, director, and image in this component on our props if we did them.
  handleSave = () => {
    this.props.editMovie(this.props.movie.id, this.state.title)
    this.toggleEdit()
    this.setState({title: ''})
  }

  render() {
    // for our JSX in this component we are conditionally rendering 2 options. If this.state.editMode
    // is true then we will render what's inside the parentheses after the question mark or in
    // other words the "edit mode" version of this component. Notice that this will be an input
    // field tied to the title piece of state and a save button. If this.state.editMode is false
    // we will instead render what's inside the parentheses after the : down a bit below. This
    // would be the movie's Title and Director as well as the image from the movie and a button
    // to delete the movie and a second button that puts us in edit mode.
    return this.state.editMode ? (
      <div className="movie">
        {/* input field tied to the title state */}
        <input
          value={this.state.title}
          onChange={(e) => this.handleTitle(e.target.value)}
        />
        {/* button that calls the handleSave function up above */}
        <button onClick={this.handleSave}>Save</button>
      </div>
      // here is the colon that I mentioned above. everyone inside the parentheses
      // after this colon is what is shown if this.state.editMode is false.
    ) : (
      <div className="movie">
        {/* here we display the 3 pieces of information off of our movie object from props.
        The movie Title/Director/Image are all saved there. (in addition to the id) */}
        <p>Movie Title: {this.props.movie.title}</p>
        <p>Movie Director: {this.props.movie.director}</p>
        <img src={this.props.movie.image} alt={this.props.movie.title} />
        {/* Here we have a button that calls the deleteMovie method we are passed as a prop.
        Remember that we need to pass that function an id so that when the function makes
        an axios call to our backend it knows what movie to delete. Fortunately we have
        that id saved in the movie object on our props! */}
        <button 
        onClick={() => this.props.deleteMovie(this.props.movie.id)}>
          Delete Movie
        </button>
        {/* Here we just have a button that when we click it it will put us in edit
         mode by calling the toggleEdit function up above */}
        <button onClick={this.toggleEdit}>Edit</button>
      </div>
    )
  }
}

// When you are done here go take a look at the ./AddMovie.js component to remind
// yourself how we add a movie to the movie array.
export default Movie

