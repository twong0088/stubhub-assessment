import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
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
    height: '75vh'
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
    borderBottom: '0.5px solid #e6e9eb'
  },
  header: {
    paddingLeft: '20px',
    paddingBottom: '10px',
    display: 'flex',
    flexDirection: 'column'
  },
  row: {
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
  rfc: {
    width: '70px',
    marginLeft: '15px',
    height: '30px',
    cursor: 'pointer',
    borderRadius: '100px 100px 100px 100px',
    backgroundColor: '#3f1e76',
    color: "#ffffff"
  },
  empty: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  footer: {
    marginLeft: '30px',
    marginRight: '30px',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  costBreakdown: {
    display: 'flex',
    flexDirection: 'column',
    marginBottom: '10px'
    // marginBottom: '15px'
    // padding: '15px',
    // paddingLeft: '30px'
  },
  checkoutButton: {
    width: '200px',
    marginLeft: '15px',
    height: '35px',
    cursor: 'pointer',
    borderRadius: '100px 100px 100px 100px',
    backgroundColor: '#3f1e76',
    color: "#ffffff",
    fontWeight: '700',
    fontSize: '16px'
  },
  breakdownDetails: {
    paddingTop: '10px',
    fontWeight: '700'
    // paddingBottom: '5px'
  }
}));

const CheckoutPage = (props) => {
  const classes = useStyles();
  const [cart, setCart] = useState([]);
  const [subTotal, setSubTotal] = useState(0);

  useEffect(() => {
    const cartData = JSON.parse(localStorage.getItem('cart'));
    // props.dispatch(actions.updateCart(cart));
    let cost = 0;
    cartData.forEach(item => {
      cost += (item.price * 2);
    })

    setSubTotal(cost);
    setCart(cartData);
  }, [])

  const removeFromCart = (idx) => {
    const newCart = [...cart]
    newCart.splice(idx, 1);
    localStorage.setItem('cart', JSON.stringify(newCart));
    setCart(newCart);
    props.setRefresh(!props.refresh);
    // props.dispatch(actions.updateCart(newCart));
  }

  return (
    <div className={classes.root}>
        {
          cart.length <= 0 &&
          <div className={classes.empty}>
            <h1 >Cart is Empty!</h1>
          </div>
        }
      <div className={classes.container}>
        {
          cart.length > 0 &&
            cart.map((item, idx) => (
              <div className={classes.ticket} key={idx}>
                <div className={classes.header}>
                  <div className={classes.text}>{item.name}</div>
                  <div className={classes.fineText}>{item.dayOfWeek}, {item.date} • {item.time} at {item.venue}, {item.location}</div>
                </div>
                <div className={classes.row}>
                  <div className={classes.sectionLeft}>
                  <div>Section: {item.section}</div>
                  <div>Seat: {item.seat} - {item.seat + 1}</div>
                </div>
                <div className={classes.sectionRight}>
                  <div className={classes.price}>
                    <span>Price:</span>
                    <div>${item.price * 2}</div>
                  </div>
                  <div>
                    <button
                      className={classes.rfc}
                      onClick={() => {
                        removeFromCart(idx);
                      }}
                    >
                      Remove
                    </button>
                  </div>
                </div>
                </div>
              </div>
            ))
          }
          <div className={classes.footer}>
            <div className={classes.costBreakdown}>
              <span className={classes.breakdownDetails}>SubTotal: ${subTotal}</span>
              <span className={classes.breakdownDetails}>{`Tax (10%): $${Math.round(subTotal * 0.1)}`}</span>
              <span className={classes.breakdownDetails}>Total: ${Math.round(subTotal * 1.1)}</span>
            </div>
            <button
              className={classes.checkoutButton}
            >
              Checkout Now
            </button>
          </div>
      </div>
    </div>
  );
}

export default CheckoutPage;
// export default connect(mapStateToProps)(CheckoutPage);