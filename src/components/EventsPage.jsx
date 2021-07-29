import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { eventsById } from '../dummyData.js';
import EventsList from './EventsList.jsx';
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
  }
}));

const EventsPage = (props) => {
  const classes = useStyles();
  const [eventDetails, setEventDetails] = useState({})
  const [availableTickets, setAvailableTickets] = useState([]);


  useEffect(() => {
    const url = window.location.pathname.split('/');
    const data = url.slice(2);
    setEventDetails(eventsById[data[0]]);
    setAvailableTickets(eventsById[data[0]].tickets)
  }, [])

  return (
    <div className={classes.root}>
      <div className={classes.container}>
        <div className={classes.header}>
          <div className={classes.text}>{eventDetails.name}</div>
          <div className={classes.fineText}>{eventDetails.dayOfWeek}, {eventDetails.date} • {eventDetails.time} at {eventDetails.venue}, {eventDetails.location}</div>
        </div>
        <EventsList
          availableTickets={availableTickets}
          eventDetails={eventDetails}
          {...props}
        />
      </div>
    </div>
  );
}

export default EventsPage;
// export default connect(mapStateToProps)(EventsPage);
