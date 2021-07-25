import './App.css';
import NavBar from './components/NavBar.jsx';
import Home from './components/Home.jsx';
import BrowsingPage from './components/BrowsingPage.jsx';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

const App = () => {
  return (
    <Router>
      <div>
        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <NavBar />
        <Switch>
          <Route path="/event/:id">
            {/* <About /> */}
            {/* <h1>HELLO ABOUT</h1> */}
          </Route>
          <Route path="/browse/:category?/:subCategory?/:subSubCategory?">
            <BrowsingPage />
            {/* <h1>browse</h1> */}
          </Route>
          <Route path="/">
            {/* <h1>HELLO HOME</h1> */}
            <Home />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
