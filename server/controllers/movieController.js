// At the top of our movie controller we are keeping track of
// 2 variables. A movies array and an id. The movies array
// will be the array of movie objects that we send back to the
// user when they hit our endpoints. The id we will use to assign
// a unique id to each new movie we create.
let movies = [
  {
    id: 0,
    title: 'star wars',
    director: 'george lucas',
    image: 'https://m.media-amazon.com/images/M/MV5BNzVlY2MwMjktM2E4OS00Y2Y3LWE3ZjctYzhkZGM3YzA1ZWM2XkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_UX182_CR0,0,182,268_AL_.jpg'
  },
  {
    id: 1,
    title: 'whatever',
    director: 'Adam Kent',
    image: 'https://m.media-amazon.com/images/M/MV5BNzVlY2MwMjktM2E4OS00Y2Y3LWE3ZjctYzhkZGM3YzA1ZWM2XkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_UX182_CR0,0,182,268_AL_.jpg'
  }
]
let id = 2

module.exports = {
  getMovies: (req, res) => {
    // when the getMovies method is called all we will
    // send back to the frontend is the array of movies.
    res.status(200).send(movies)
  },
  addMovie: (req, res) => {
    // when the addMovie method is called we will expect there to
    // be a body object that has a title, director and image on it.
    // We destructure these values off of req.body and will use them
    // to create a new movie object.
    const {title, director, image} = req.body
    // here we take the id we are keeping track of at the top of the page
    // and the title/director/image that we got off of req.body to create
    // a new movie object.
    const movie = {
      id: id,
      title: title,
      director: director,
      image: image,
    }
    // after creating our new movie we increment the id so that the next time
    // we create a new movie it will have a unique id.
    id++
    // we push our movie object into the movies array and send back the updated
    // movies array to the frontend.
    movies.push(movie)
    res.status(200).send(movies)
  },
  deleteMovie: (req, res) => {
    // When deleteMovie is called we are expecting the user to pass us an id
    // so that we can identify the movie they want to delete. If you remember from
    // index.js we established that the app.delete() url is expecting an id on the
    // end of the url. We can access this by destructuring id off of req.params.
    const {id} = req.params
    // we can use the id to find the index of the element that has this id. findIndex
    // will return the index of the first element that matches what's on the return.
    const index = movies.findIndex((e) => {
      return e.id === +id
    })
    // here we have 1 example of how we might error handle. If findIndex does not find
    // any element that matches then it will return -1. Here we check to see if index is -1
    // and if it is we send back an error to the frontend.
    if(index === -1){
      return res.status(500).send("Movie not found")
    }
    // if instead we do find the index then we splice that index out of the movies array and send
    // back the updated movies array.
    movies.splice(index, 1)
    res.status(200).send(movies)
  },
  editMovie: (req, res) => {
    // When the editMovie method is called we will require the frontend user to send
    // us 2 pieces of information. We need to know the id of the movie they want to
    // edit and the piece of information they are intending to change. In our example
    // due to limited time we made it so they could only edit the title but if we wanted
    // to we could edit all the values of the movie here. The id of the movie to edit we
    // will have the user pass back on the end of the url in the params, the title we will
    // have the user pass back in a body object. When we get to the frontend we can look at
    // the axios.put() call to see what this will look like.
    const {id} = req.params
    const {title} = req.body
    // just like in the delete we need to find the index of the movie we want to edit
    const index = movies.findIndex((e) => {
      return e.id === +id
    })
    // here we will locate the movie in the movies array using the index and change the title
    // to be the new title. Once we have successfully made this update we will send back the
    // updated movies array
    movies[index].title = title
    res.status(200).send(movies)
  }
}

// With this we are now done with our server, we can go ahead and look in ../src/App.js to
// start seeing what's going to be happening in the frotend of our app.