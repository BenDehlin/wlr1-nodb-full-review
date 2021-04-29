// Our App.js is just going to be a functional component,
// the only thing it is doing is rendering the MovieList component.
// Next let's go look at that component in ./components/MovieList.js

import './App.css';
import MovieList from './components/MovieList'

function App() {
  return (
    <div className="App">
      <MovieList />
    </div>
  );
}

export default App;
