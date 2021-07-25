import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles((theme) => ({
  root: {
    // marginTop: '50px',
    flexGrow: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
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
    // backgroundColor: 'black'
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
  }
}));

const BrowsingPage = (props) => {
  const classes = useStyles();
  const history = useHistory();

  const [path, setPath] = useState([]);
  const [deepestLevel, setDeepestLevel ] = useState('')

  useEffect(() => {
    console.log('useEffect triggered', props.url)
    const url = window.location.pathname.split('/');
    const data = url.slice(2);
    for (let i = 0; i < data.length; i++) {
      data[i] = data[i].replaceAll('%20', ' ');
    }
    setPath(data);
    setDeepestLevel(data[data.length -1]);
  }, [props.url])

  const handleChange = (idx) => {
    const newHref = path.slice(0, idx + 1).join('/');
    history.push(`/browse/${newHref}`)
  }

  return (
    <div className={classes.root}>
      <div
        className={classes.banner}
      >
        <div className={classes.bannerContent}>
          <div>
            {path.map((el, idx) => (
              el === deepestLevel ? (
                <span key={idx}>{`${el}`}</span>
              ) : (
                <span key={idx}>
                  <span className={classes.parents} onClick={() => {handleChange(idx)}}>{`${el}`}</span>
                  <span>{' / '}</span>
                </span>
              )
            ))}
          </div>
          {/* <div>{category}</div> */}
          <h1 className={classes.title}>{`${deepestLevel} Tickets`}</h1>
        </div>
      </div>
      {/* <div className={classes.container}>
        <h1>Hello World2</h1>
      </div> */}
    </div>
  );
}

export default BrowsingPage;
