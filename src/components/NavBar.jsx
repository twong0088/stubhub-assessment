import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import ticket from '../images/ticket.png';
import Badge from '@material-ui/core/Badge';
// import * as actions from '../redux/actions.js';
// import { connect } from 'react-redux';

// const mapStateToProps = (store) => {
//   return {
//     cartInfo: store.cartReducer
//   }
// }

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1
  },
  header: {
    backgroundColor: 'white',
    padding: '10px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  headerContent: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    maxWidth: '1300px',
    width: '90vw'
  },
  headerContentRow: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  logo: {
    display: 'flex',
    flexDirection: 'row',
    color: 'black',
    fontSize: 'large',
    fontWeight: 'bold',
    alignItems: 'flex-end',
    cursor: 'pointer'
  },
  shoppingIcon: {
    color: 'black',
    cursor: 'pointer'
  }
}));

const defaultHeader = {
  'Sports': {
    'MLB': {
      'San Francisco Giants': null,
      'Oakland Athletics': null,
      'Los Angeles Dodgers': null
    },
    'NHL': {
      'Vancouver Canucks': null,
      'San Jose Sharks': null,
      'Montreal Canadiens': null
    },
    'NBA': {
      'Golden State Warriors': null,
      'Los Angeles Lakers': null,
      'Toronto Raptors': null
    }
  },
  'Concerts': {
    'Billy Joel': null,
    'One Republic': null,
    'Music Festivals': {
      'Coachella Music Festival': null,
      'Burning Man': null,
      'Jazz Fest': null
    }
  },
  'Theater & Comedy': {
    'Broadway': null,
    'Wicked': null,
    'Comedy': {
      'Ally Wong': null,
      'Jo Koy': null,
      'Trevor Noah': null
    }
  }
}

const NavBar = (props) => {
  const classes = useStyles();
  const history = useHistory();

  const [header, setHeader] = useState({});
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem('cart'));
    setCartCount(cart.length);
    setHeader(defaultHeader);
    // props.dispatch(actions.updateCart(cart));
  }, [props.refresh])

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar className={classes.header}>
          <div className={classes.headerContent}>
            <div className={classes.headerContentRow}>
              <div className={classes.logo} onClick={() => {history.push('/')}}>
                <img src={ticket} alt='logo'/>
                <h3>Ticket Place</h3>
              </div>
              <div
                className={classes.shoppingIcon}
                onClick={() => {
                  history.push('/checkout')
                }}
              >
                <Badge badgeContent={cartCount} color="primary">
                  <i id="icon" className="fa fa-shopping-cart fa-3x"></i>
                </Badge>
              </div>
            </div>
            <div className="navbar">
              {Object.keys(header).map((category, idx) => (
                <div
                  key={`${category}, ${idx}`}
                  className="dropdown"
                >
                  <button
                    className="dropbtn"
                    onClick={() => {
                      document.location.pathname = `/browse/${category}`
                    }}
                  >
                    {category}
                    <i id="icon" className="fa fa-caret-down"></i>
                  </button>
                  <div className="dropdown-content">
                    {
                      Object.keys(header[category]).map((subCategory, idx) => (
                        header[category][subCategory] ? (
                          <div
                            key={`${subCategory}, ${idx}`}
                            className="sub-category"
                          >
                            <button
                              onClick={() => {
                                document.location.pathname = `/browse/${category}/${subCategory}`
                              }}
                              className="dropbtn2"
                            >
                              {subCategory}
                              <i id="icon" className="fa fa-caret-right"></i>
                            </button>
                            <div className="dropdown-content2">
                              {
                                Object.keys(header[category][subCategory]).map((subSubCategory, idx) => (
                                  <a
                                    key={`${subSubCategory}, ${idx}`}
                                    href={`/browse/${category}/${subCategory}/${subSubCategory}`}
                                  >
                                    {subSubCategory}
                                  </a>
                                ))
                              }
                            </div>
                          </div>
                        ) : (
                          <a
                            key={`${subCategory}, ${idx}`}
                            href={`/browse/${category}/${subCategory}`}
                          >
                            {subCategory}
                          </a>
                        )
                      ))
                    }
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default NavBar;
// export default connect(mapStateToProps)(NavBar);