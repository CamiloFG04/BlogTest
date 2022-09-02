import './App.css';
import ShowBlog from './components/ShowBlog';
import {BrowserRouter, Routes, Route} from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <nav className="navbar navbar-expand-lg bg-light bg-dark">
        <div className="container-fluid">
          <a className="navbar-brand text-light" href="#">Blog</a>
          <button className="navbar-toggler " type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
        </div>
      </nav>
      <BrowserRouter>
        <Routes>
          <Route path="BlogTest/" element={<ShowBlog/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
