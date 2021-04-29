## Steps for building this from scratch on your own:
1. run `npx create-react-app wlr1-nodb-full-review`
2. run `npm install axios express` to install our relevant dependencies
3. add a `"main"` and `"proxy"` to our package.json

## Files that matter and order to read them in:
1. our server starting point: `./server/index.js`
2. our controller file with methods for each endpoint: `./server/controllers/movieController.js`
3. our react app starting point: `./src/App.js`
4. our component storing the movies state and the axios calls: `./src/components/MovieList.js`
5. our component being rendered for each item in the movies array: `./src/components/Movie.js`
6. our component with the form to add a new movie to the array: `./src/components/AddMovie.js`