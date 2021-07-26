import './App.css';
import { useState } from 'react';
import NavBar from './components/NavBar.jsx';
import Home from './components/Home.jsx';
import BrowsingPage from './components/BrowsingPage.jsx';
import EventsPage from './components/EventsPage.jsx';
import CheckoutPage from './components/CheckoutPage.jsx';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

const App = () => {
  const [refresh, setRefresh] = useState(true);
  return (
    <Router>
      <div>
        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <NavBar refresh={refresh} setRefresh={setRefresh}/>
        <Switch>
          <Route path="/event/:id">
            <EventsPage refresh={refresh} setRefresh={setRefresh}/>
          </Route>
          <Route path="/browse/:category?/:subCategory?/:subSubCategory?">
            <BrowsingPage refresh={refresh} setRefresh={setRefresh}/>
          </Route>
          <Route path="/checkout">
            <CheckoutPage refresh={refresh} setRefresh={setRefresh}/>
          </Route>
          <Route path="/">
            <Home refresh={refresh} setRefresh={setRefresh}/>
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
