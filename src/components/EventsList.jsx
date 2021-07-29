import React from 'react';
import EventsListEntry from './EventsListEntry.jsx';

const EventsList = (props) => (
  props.availableTickets.map((ticket, idx) => (
    <EventsListEntry
      key={idx}
      ticket={ticket}
      {...props}
    />
  ))
)

export default EventsList;