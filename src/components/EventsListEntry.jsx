import React from 'react';
import PriceTag from './PriceTag.jsx';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  text: {
    fontSize: '14px',
    fontWeight: '600',
    color: '#2f343b'
  },
  ticket: {
    padding: '15px',
    borderBottom: '0.5px solid #e6e9eb',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  sectionLeft: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    marginLeft: '20px'
  },
  sectionRight: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: '20px'
  },
  price: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  atc: {
    width: '70px',
    marginLeft: '15px',
    cursor: 'pointer',
    borderRadius: '100px 100px 100px 100px',
    backgroundColor: '#3f1e76',
    color: "#ffffff"
  }
}));

const EventsListEntry = (props) => {

  const classes = useStyles();
  const {ticket, eventDetails, refresh, setRefresh} = props;

  const addToCart = (eventDetails, ticketDetails, timeClicked) => {
    const { date, dayOfWeek, location, venue, name} = eventDetails;
    const checkoutDetails = {
      date,
      dayOfWeek,
      location,
      venue,
      name,
      ...ticketDetails
    };
    if (ticketDetails.salePrice && Date.parse(ticketDetails.saleExpiration) > timeClicked) {
      checkoutDetails.price = ticketDetails.salePrice;
    }
    let cart = localStorage.getItem('cart') || '[]';
    let cartArr = JSON.parse(cart);
    cartArr = [...cartArr, checkoutDetails];
    cart = JSON.stringify(cartArr);
    localStorage.setItem('cart', cart)
    setRefresh(!refresh)
    // props.dispatch(actions.addToCart(checkoutDetails));
  }

  return (
    <div
      className={classes.ticket}
    >
      <div className={classes.sectionLeft}>
        <div>Section: {ticket.section}</div>
        <div>Seat: {ticket.seat} - {ticket.seat + 1}</div>
      </div>
      <div className={classes.sectionRight}>
        <div className={classes.price}>
          <PriceTag
            price={ticket.price}
            salePrice={ticket.salePrice}
            saleExpiration={ticket.saleExpiration}
          />
        </div>
        <div>
          <button
            className={classes.atc}
            onClick={() => {
              addToCart(eventDetails, ticket, new Date())
            }}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  )
}


export default EventsListEntry;