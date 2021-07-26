import React from 'react';
import { useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Carousel from 'react-material-ui-carousel';
import { Paper } from '@material-ui/core';
import nfl from '../images/nfl.png';
import music_festival from '../images/music_festival.jpeg';
import mlb from '../images/baseball.jpeg';
import theater from '../images/theater.jpeg';
import home from '../images/home.png';

var items = [
  {
    img: nfl,
    desc: 'nfl',
    path: "Sports/nfl",
    caption: "100% NFL-VERIFIED TICKETS ON SALE NOW"
  },
  {
    img: music_festival,
    desc: 'music festival',
    path: "Concerts/Music Festivals",
    caption: "DON'T MISS ROLLING LOUD MUSIC FESTIVAL"
  },
  {
    img: mlb,
    desc: 'mlb',
    path: "Sports/MLB",
    caption: "THE OFFICIAL PARTNER OF MLB. GET 100% MLB-VERIFIED TICKETS"
  },
  {
    img: theater,
    desc: 'theater',
    path: 'Theater & Comedy',
    caption: "DON'T MISS OUT ON HIT THEATER SHOWS"
  }
]

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: '50px',
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
  carouselCard: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    cursor: 'pointer'
  },
  carouselImg: {
    borderRadius: '10px'
  },
  cardContent: {
    position: 'relative',
    textAlign: 'center'
  },
  caption: {
    position: 'absolute',
    bottom: '25px',
    left: '50px',
    color: 'white',
    backgroundColor: '#3f1e76',
    width: "500px",
    fontSize: '36px',
    textAlign: 'left',
    fontWeight: '700'
  },
  placeholder: {
    marginTop: '50px'
  }
}));

const Home = () => {
  const classes = useStyles();
  const history = useHistory();

  return (
    <div className={classes.root}>
      <div className={classes.container}>
        <Carousel
          animation="slide"
          interval={5000}
          indicators={false}
          navButtonsAlwaysVisible={true}
        >
            {
                items.map( (item, i) => (
                  <Paper
                    className={classes.carouselCard}
                    key={i}
                    onClick={() => {
                      history.push(`/browse/${item.path}`)
                    }}
                  >
                    <div className={classes.cardContent}>
                      <div className={classes.caption}>{item.caption}</div>
                      <img className={classes.carouselImg} src={item.img} alt={item.desc}/>
                    </div>
                  </Paper>
                ))
            }
        </Carousel>
        <img className={classes.placeholder} src={home} alt="home"/>
      </div>
    </div>
  );
}

export default Home;
