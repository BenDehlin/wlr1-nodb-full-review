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
    res.status(200).send(movies)
  },
  addMovie: (req, res) => {
    const {title, director, image} = req.body
    const movie = {
      id: id,
      title: title,
      director: director,
      image: image,
    }
    id++
    movies.push(movie)
    res.status(200).send(movies)
  },
  deleteMovie: (req, res) => {
    const {id} = req.params
    const index = movies.findIndex((e) => {
      return e.id === +id
    })
    if(index === -1){
      return res.status(500).send("Movie not found")
    }
    movies.splice(index, 1)
    res.status(200).send(movies)
  },
  editMovie: (req, res) => {
    const {id} = req.params
    const {title} = req.body
    const index = movies.findIndex((e) => {
      return e.id === +id
    })
    movies[index] = {
      ...movies[index],
      title: title
    }
    res.status(200).send(movies)
  }
}