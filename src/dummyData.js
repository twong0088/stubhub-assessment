const faker = require('faker');
let id = 1;
const dummyData = {
  'Sports': {
    'MLB': {
      'San Francisco Giants': [],
      'Oakland Athletics': [],
      'Los Angeles Dodgers': []
    },
    'NHL': {
      'Vancouver Canucks': [],
      'San Jose Sharks': [],
      'Montreal Canadiens': []
    },
    'NBA': {
      'Golden State Warriors': [],
      'Los Angeles Lakers': [],
      'Toronto Raptors': []
    }
  },
  'Concerts': {
    'Billy Joel': [],
    'One Republic': [],
    'Music Festivals': {
      'Coachella Music Festival': [],
      'Burning Man': [],
      'Jazz Fest': []
    }
  },
  'Theater & Comedy': {
    'Broadway': [],
    'Wicked': [],
    'Comedy': {
      'Ally Wong': [],
      'Jo Koy': [],
      'Trevor Noah': []
    }
  }
}

const traverse = (head) => {
  if (!Array.isArray(head)) {
    for (let key in head) {
      if (Array.isArray(head[key])) {
        head[key] = generateEvents()
      } else {
        traverse(head[key])
      }
    }
  }
}

var days = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];


const generateEvents = () => {
  const events = [];
  const locations = [
    {
      venue: 'Rogers Arena',
      city: 'Vancouver, BC, Canada'
    },
    {
      venue: 'Oracle Arena',
      city: 'Oakland, CA'
    },
    {
      venue: 'SAP Center',
      city: 'San Jose, CA'
    },
    {
      venue: 'Madison Square Garden',
      city: 'New York City, NY'
    },
    {
      venue: 'Staples Center',
      city: 'Los Angeles, CA'
    }
  ]
  for (let i = 0; i < 20; i++) {
    let ticketsInfo = generateTickets();
    let locationInfo = locations[i % locations.length]
    let date = faker.date.future();
    let ye = new Intl.DateTimeFormat('en', { year: 'numeric' }).format(date);
    let mo = new Intl.DateTimeFormat('en', { month: 'short' }).format(date).toUpperCase();
    let da = new Intl.DateTimeFormat('en', { day: '2-digit' }).format(date);
    let dayOfWeek = days[date.getDay()];
    const time = date.toLocaleTimeString('en-US', { hour: 'numeric', hour12: true, minute: 'numeric' });

    const event = {
      id: id,
      date: `${mo} ${da} ${ye}`,
      dateDetails: `${dayOfWeek} ${time}`,
      venue: locationInfo.venue,
      location: locationInfo.city,
      lowestPrice: ticketsInfo.lowestPrice,
      tickets: ticketsInfo.tickets
    }
    events.push(event);
    id++;
  }
  return events;
}

const generateTickets = () => {
  const tickets = []
  let lowestPrice = Number.POSITIVE_INFINITY;
  const section = ['a', 'b', 'c', 'd']
  for (let i = 0; i < 100; i++) {
    const price = Math.floor(Math.random() * 2000) + 30;
    lowestPrice = Math.min(lowestPrice, price)
    const ticket = {
      section: section[i % section.length],
      seat: Math.floor(Math.random() * 50),
      price: price
    }
    tickets.push(ticket)
  }
  return {
    tickets: tickets,
    lowestPrice: lowestPrice
  }
}

traverse(dummyData);

export default dummyData;