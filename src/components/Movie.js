import { Component } from "react"

class Movie extends Component {
  constructor() {
    super()
    this.state = {
      editMode: false,
      title: "",
    }
  }

  handleTitle = (value) => {
    this.setState({ title: value })
  }

  toggleEdit = () => {
    this.setState({ editMode: !this.state.editMode })
  }

  handleSave = () => {
    this.props.editMovie(this.props.movie.id, this.state.title)
    this.toggleEdit()
    this.setState({title: ''})
  }

  render() {
    return this.state.editMode ? (
      <div className="movie">
        <input
          value={this.state.title}
          onChange={(e) => this.handleTitle(e.target.value)}
        />
        <button onClick={this.handleSave}>Save</button>
      </div>
    ) : (
      <div className="movie">
        <p>Movie Title: {this.props.movie.title}</p>
        <p>Movie Director: {this.props.movie.director}</p>
        <img src={this.props.movie.image} alt={this.props.movie.title} />
        <button 
        onClick={() => this.props.deleteMovie(this.props.movie.id)}>
          Delete Movie
        </button>
        <button onClick={() => this.toggleEdit()}>Edit</button>
      </div>
    )
  }
}

export default Movie
