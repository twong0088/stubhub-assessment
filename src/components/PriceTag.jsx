import React, {useState, useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-end'
  },
  price: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  strikethrough: {
    textDecoration: 'line-through',
    marginRight: '10px'
  },
  red: {
    color: 'red'
  }
}));

const PriceTag = props => {
  const { price, salePrice, saleExpiration } = props;
  const classes = useStyles();
  const [timeNow, setTimeNow] = useState({})

  useEffect(() => {
    const interval = setInterval(() => {
      const remaining = getTimeRemaining(saleExpiration);
      setTimeNow(remaining);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const getTimeRemaining = (endtime) =>{
    const total = Date.parse(endtime) - Date.parse(new Date());
    const seconds = Math.floor( (total / 1000) % 60 );
    const minutes = Math.floor( (total / 1000 / 60) % 60);
    const hours = Math.floor( (total/(1000 * 60 * 60)) % 24);
    const days = Math.floor( total/(1000 * 60 * 60 * 24));

    return {
      total,
      days,
      hours: ("0" + hours).slice(-2),
      minutes: ("0" + minutes).slice(-2),
      seconds: ("0" + seconds).slice(-2)
    };
  }

  return (
    salePrice && timeNow.total >= 0 ? (
      <div className={classes.container}>
        <div className={classes.strikethrough}>${price}</div>
        <div className={classes.red}>${salePrice}</div>
        <span className={classes.red}>each</span>
        <span
          className={classes.red}
        >
          Deal expires in:{` ${timeNow.days} days, ${timeNow.hours} h, ${timeNow.minutes} mins, ${timeNow.seconds}s`}
        </span>
      </div>
    ) : (
      <div className={classes.container}>
        <div>${price}</div>
        <span>each</span>
      </div>
    )
  )
}

export default PriceTag;