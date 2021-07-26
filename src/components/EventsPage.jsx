import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { eventsById } from '../dummyData.js';
import * as actions from '../redux/actions.js';
import { connect } from 'react-redux';

const mapStateToProps = (store) => {
  return {
    cartInfo: store.cartReducer
  }
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: '#f6f8f9',
  },
  container: {
    marginTop: '10px',
    maxWidth: '1300px',
    width: '90vw',
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: 'white',
    boxShadow: '0 0 5px #e9ebed'
  },
  header: {
    borderBottom: '1px solid #e6e9eb',
    padding: '15px'
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

const EventsPage = (props) => {
  const classes = useStyles();
  const [eventDetails, setEventDetails] = useState(0)
  const [availableTickets, setAvailableTickets] = useState([]);

  useEffect(() => {
    const url = window.location.pathname.split('/');
    const data = url.slice(2);
    // console.log(eventsById[data[0]])
    setEventDetails(eventsById[data[0]]);
    setAvailableTickets(eventsById[data[0]].tickets)
  }, [])

  const addToCart = (eventDetails, ticketDetails) => {
    console.log(eventDetails);
    const { date, dayOfWeek, location, venue, name} = eventDetails;
    const checkoutDetails = {
      date: date,
      dayOfWeek: dayOfWeek,
      location: location,
      venue: venue,
      name: name,
      ...ticketDetails
    };
    props.dispatch(actions.addToCart(checkoutDetails));
  }

  return (
    <div className={classes.root}>
      <div className={classes.container}>
        <div className={classes.header}>
          <div className={classes.text}>{eventDetails.name}</div>
          <div className={classes.fineText}>{eventDetails.dayOfWeek}, {eventDetails.date} • {eventDetails.time} at {eventDetails.venue}, {eventDetails.location}</div>
        </div>
        {
          availableTickets.map((ticket, idx) => (
            <div
              className={classes.ticket}
              key={idx}
            >
              <div className={classes.sectionLeft}>
                <div>Section: {ticket.section}</div>
                <div>Seat: {ticket.seat} - {ticket.seat + 1}</div>
              </div>
              <div className={classes.sectionRight}>
                <div className={classes.price}>
                  <div>${ticket.price}</div>
                  <span>each</span>
                </div>
                <div>
                  <button
                    className={classes.atc}
                    onClick={() => {
                      // console.log(eventDetails, ticket)
                      addToCart(eventDetails, ticket)
                    }}
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          ))
        }
      </div>
    </div>
  );
}

export default connect(mapStateToProps)(EventsPage);
