import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { dummyData } from '../dummyData.js';
// import * as actions from '../redux/actions.js';
// import { connect } from 'react-redux';

// const mapStateToProps = (store) => {
//   return {
//     cartInfo: store.cartReducer
//   }
// }

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: '#f6f8f9',
  },
  container: {
    maxWidth: '1300px',
    width: '90vw',
    display: 'flex',
    flexDirection: 'column'
  },
  banner: {
    height: '220px',
    backgroundColor: '#3f1e76',
    width: '100vw',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  bannerContent: {
    maxWidth: '1300px',
    width: '90vw',
    color: '#ffffff',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-end',
  },
  title: {
    margin: '7px 0px 12px',
    fontSize: '35px',
    fontWeight: 'bold'
  },
  parents: {
    cursor: 'pointer',
    "&:hover": {
      textDecoration: 'underline'
    }
  },
  table: {
    marginTop: '5px',
    boxShadow: '0 0 5px #e9ebed',
    width: '100%',
    backgroundColor: 'white'
  },
  header: {
    borderBottom: '0.5px solid #e6e9eb',
    paddingLeft: '15px'
  },
  row: {
    borderBottom: '0.5px solid #e6e9eb',
    backgroundColor: 'white',
    padding: '15px',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    cursor: 'pointer',
    "&:hover": {
      backgroundColor: '#D9F4F4'
    }
  },
  eventInfo: {
    display: 'flex',
    flexDirection: 'row'
  },
  locationInfo: {
    marginLeft: '50px'
  },
  fineText: {
    fontSize: '13px',
    fontWeight: '400',
    color: '#5c6570'
  },
  text: {
    fontSize: '14px',
    fontWeight: '600',
    color: '#2f343b'
  },
  footer: {
    borderBottom: '0.5px solid #e6e9eb',
    backgroundColor: 'white',
    height: '66px',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  seeMoreButton: {
    width: '202px',
    height: '33px',
    color: '#340673',
    backgroundColor: 'white',
    border: '2px solid #e6e9eb',
    cursor: 'pointer',
    borderRadius: '100px 100px 100px 100px',
    "&:disabled": {
      cursor: 'not-allowed',
      backgroundColor: '#cccccc',
      color: '#666666'
    }
  }
}));

const BrowsingPage = (props) => {
  const classes = useStyles();

  const [path, setPath] = useState([]);
  const [resultCount, setResultCount] = useState(10);
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);


  useEffect(() => {
    const url = window.location.pathname.split('/');
    const data = url.slice(2);
    for (let i = 0; i < data.length; i++) {
      data[i] = data[i].replaceAll('%20', ' ');
    }
    const parent = traverse(dummyData, data);
    const events = getChildren(parent, []);

    // const cart = JSON.parse(localStorage.getItem('cart'));
    // props.dispatch(actions.updateCart(cart));

    setPath(data);
    setResults(events);
    props.setRefresh(!props.refresh)
  }, [])

  const handleChange = (idx) => {
    const newHref = path.slice(0, idx + 1).join('/');
    document.location.pathname = `/browse/${newHref}`
  }

  const traverse = (tree, path) => {
    let pointer = tree;
    for (let i = 0; i < path.length; i++) {
      pointer = pointer[path[i]];
    }
    return pointer;
  }

  const getChildren = (head) => {
    let children = [];
    const traverse = (head) => {
      if (Array.isArray(head)) {
        children = children.concat(head);
      } else {
        for (let key in head) {
          traverse(head[key])
        }
      }
    }
    traverse(head)
    return children;
  }

  const handleLoadResults = () => {
    setLoading(true);
    setTimeout(() => {
      setResultCount(resultCount + 10);
      setLoading(false);
    }, 1000);

  }

  return (
    <div className={classes.root}>
      <div
        className={classes.banner}
      >
        <div className={classes.bannerContent}>
          <div>
            {path.map((el, idx) => (
              idx === path.length - 1 ? (
                <span key={idx}>{`${el}`}</span>
              ) : (
                <span key={idx}>
                  <span className={classes.parents} onClick={() => {handleChange(idx)}}>{`${el}`}</span>
                  <span>{' / '}</span>
                </span>
              )
            ))}
          </div>
          <h1 className={classes.title}>{`${path[path.length - 1]} Tickets`}</h1>
        </div>
      </div>
      <div className={classes.container}>
        <div className={classes.table}>
          <div className={classes.header}>
              <h2>{`${results.length} ${path[path.length - 1]}`} Events</h2>
          </div>
          {
            results.slice(0, resultCount).map((result, idx) => (
              <div
                className={classes.row}
                key={idx}
                onClick={()=>{
                  document.location.pathname = `/event/${result.id}`
                }}
              >
                <div className={classes.eventInfo}>
                  <div className={classes.timeInfo}>
                    <div className={classes.fineText}>{`${result.dayOfWeek} ${result.time}`}</div>
                    <div className={classes.text}>{result.date}</div>
                  </div>
                  <div className={classes.locationInfo}>
                    <div className={classes.fineText}>{result.name}</div>
                    <div className={classes.fineText}>{result.venue}</div>
                    <div className={classes.text}>{result.location}</div>
                  </div>
                </div>
                <div>
                  <span className={classes.fineText}>from</span>
                  <div className={classes.text}>${result.lowestPrice}</div>
                </div>
              </div>
            ))
          }
          <div
            className={classes.footer}
          >
            <button
              className={classes.seeMoreButton}
              disabled={loading || results.slice(0, resultCount).length >= results.length ? true : false}
              onClick={
                () => {
                  handleLoadResults()
                }
              }
            >
              {loading ? 'Loading ...' : 'See More'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BrowsingPage;
// export default connect(mapStateToProps)(BrowsingPage);
