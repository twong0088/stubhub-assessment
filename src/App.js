import './App.css';
import NavBar from './components/NavBar.jsx';
import Home from './components/Home.jsx';
import BrowsingPage from './components/BrowsingPage.jsx';
import EventsPage from './components/EventsPage.jsx';
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
            <EventsPage />
          </Route>
          <Route path="/browse/:category?/:subCategory?/:subSubCategory?">
            <BrowsingPage />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
