// Require Express
const express = require('express')


// Create app instance
const app = express()
const PORT = 3333


// Import controllers
const movieCtrl = require('./controllers/movieController')


// Top level middleware
app.use(express.json())


// Endpoints
app.get('/api/movies', movieCtrl.getMovies)
app.post('/api/movies', movieCtrl.addMovie)
app.delete('/api/movies/:id', movieCtrl.deleteMovie)
app.put('/api/movies/:id', movieCtrl.editMovie)


app.listen(PORT, () => console.log(`Server is running on port ${PORT}`))