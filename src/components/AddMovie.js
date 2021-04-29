// This component is just a form with 3 input fields for title,
// director, and image as well as a button to take that information
// and pass it to the addMovie function that is on our props here.
import { Component } from "react"

class AddMovie extends Component {
  constructor() {
    super()
    this.state = {
      // 3 pieces of state to track the 3 input fields.
      title: "",
      director: "",
      image: "",
    }
  }
  // we have 3 handler functions, one for each piece of state.

  handleTitle = (value) => {
    this.setState({ title: value })
  }

  handleDirector = (value) => {
    this.setState({ director: value })
  }

  handleImage = (value) => {
    this.setState({ image: value })
  }

  // The handleAdd method calls the addMovie function on our
  // props and passes it 3 values. If you remember in ./MovieList.js
  // the addMovie function is expecting us to pass it a title, director,
  // and image. Here in this component we have input fields for each of
  // these values! When this method is called it will take the values
  // from those 3 input fields and pass them to the addMovie function on
  // props. After it is done with that it will clear our input fields by
  // setting those pieces of state back to empty strings.
  handleAdd = () => {
    this.props.addMovie(
      this.state.title,
      this.state.director,
      this.state.image
    )
    this.setState({
      title: '',
      director: '',
      image: ''
    })
  }

  render() {
    // down here in our JSX we have our 3 input fields that each have
    // a value corresponding to the appropriate piece of state and
    // an onChange that corresponds to the correct handler function above.
    // For styling purposes we also have a placeholder so that we know which
    // input field does what. Underneath those input fields we have a button
    // that calls the handleAdd method up above.
    return (
      <div>
        <h2>Add Movie Form</h2>
        <input
          value={this.state.title}
          onChange={(e) => this.handleTitle(e.target.value)}
          placeholder='Enter Title'
        />
        <input
          value={this.state.director}
          onChange={(e) => this.handleDirector(e.target.value)}
          placeholder="Enter Director"
        />
        <input
          value={this.state.image}
          onChange={(e) => this.handleImage(e.target.value)}
          placeholder="Enter image url"
        />
        <button
          onClick={this.handleAdd}
        >
          Add Movie
        </button>
      </div>
    )
  }
}

// That's it! Feel free to review any of the files we've gone through
// if you ever need another refresher.

export default AddMovie
