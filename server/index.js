// Require Express
// here we require our server framework express
const express = require('express')


// Create app instance
const app = express()
const PORT = 3333


// Import controllers
// here we will import all of our controllers, in this case
// we are only going to have the movie controller but you can
// imagine if we were dealing with more data than just movies
// we could have multiple controllers here. We have called
// the controller movieCtrl.
const movieCtrl = require('./controllers/movieController')


// Top level middleware
app.use(express.json())


// Endpoints
// we have 4 endpoints that we are going to use. 1 get, 1 post,
// 1 delete, 1 put. Notice how the get and post endpoints don't
// have anything at the end of the url but delete and put have
// a /:id. This is because our delete and put endpoints will need
// to know what movie we want to delete or edit. the :id signifies
// that when a user hits this endpoint we will expect them to put
// a value on the end of the url. We save this value in the req.params
// object as the property "id". Also note that the get endpoint is
// calling the getMovies function from our movie controller, same
// for post/delete/put
app.get('/api/movies', movieCtrl.getMovies)
app.post('/api/movies', movieCtrl.addMovie)
app.delete('/api/movies/:id', movieCtrl.deleteMovie)
app.put('/api/movies/:id', movieCtrl.editMovie)



// here our server is listening for incoming requests
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`))


// Next go look at  ./controllers/movieController.js to see what our
// movieCtrl methods all do.