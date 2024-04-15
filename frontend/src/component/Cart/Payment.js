import React, { Fragment, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import CheckoutSteps from "../Cart/CheckoutSteps";
import { useSelector, useDispatch } from "react-redux";
import MetaData from "../layout/MetaData";
import { Typography } from "@material-ui/core";
import { useAlert } from "react-alert";
import {
  Elements,
  CardNumberElement,
  CardCvcElement,
  CardExpiryElement,
} from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

import axios from "axios";
import "./Payment.css";
import CreditCardIcon from "@material-ui/icons/CreditCard";
import EventIcon from "@material-ui/icons/Event";
import VpnKeyIcon from "@material-ui/icons/VpnKey";
import { clearErrors } from "../../actions/orderAction";
import { createOrder } from "../../actions/orderAction";

const Payment = () => {
  const navigate = useNavigate();
  const [stripeApiKey, setStripeApiKey] = useState();
  const [stripe, setStripe] = useState(null);
  const [elements, setElements] = useState(null);
  const dispatch = useDispatch();
  const alert = useAlert();

  const { shippingInfo, cartItems } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.user);
  const { error } = useSelector((state) => state.newOrder);

  const orderInfo = JSON.parse(sessionStorage.getItem("orderInfo"));
  const order = {
    shippingInfo,
    orderItems: cartItems,
    itemsPrice: orderInfo ? orderInfo.subtotal : 0,
    taxPrice: orderInfo ? orderInfo.tax : 0,
    shippingPrice: orderInfo ? orderInfo.shippingCharges : 0,
    totalPrice: orderInfo ? orderInfo.totalPrice : 0,
  };

  async function getStripeApiKey() {
    const { data } = await axios.get("/api/v1/stripeapikey");
    setStripeApiKey(data.stripeApiKey);
  }

  useEffect(() => {
    getStripeApiKey();
    // Load stripe and elements after stripeApiKey is set
    if (stripeApiKey) {
      const stripePromise = loadStripe(stripeApiKey);
      stripePromise.then((stripe) => {
        setStripe(stripe);
        setElements(stripe.elements());
      });
    }
  }, [stripeApiKey]);

  const payBtn = useRef(null);

  const submitHandler = async (e) => {
    e.preventDefault();
  
    payBtn.current.disabled = true;
  
    try {
      if (!stripe || !elements) {
        throw new Error("Stripe elements not initialized");
      }
  
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
  
      const response = await axios.post(
        "/api/v1/payment/process",
        paymentData,
        config
      );
  
      if (!response || !response.data) {
        throw new Error("Invalid response from server");
      }
  
      const { data } = response;
      const client_secret = data.client_secret;
  
      const result = await stripe.confirmCardPayment(client_secret, {
        payment_method: {
          card: {
            number: elements.getElement(CardNumberElement),
            cvc: elements.getElement(CardCvcElement),
            exp_month: elements.getElement(CardExpiryElement).exp_month,
            exp_year: elements.getElement(CardExpiryElement).exp_year,
          },
          billing_details: {
            name: user.name,
            email: user.email,
            address: {
              line1: shippingInfo.address,
              city: shippingInfo.city,
              state: shippingInfo.state,
              postal_code: shippingInfo.pinCode,
              country: shippingInfo.country,
            },
          },
        },
      });
  
      if (result.error) {
        payBtn.current.disabled = false;
        alert.error(result.error.message);
      } else {
        if (result.paymentIntent.status === "succeeded") {
          order.paymentInfo={
            id: result.paymentIntent.id,
            status: result.paymentIntent.status,
          }
          dispatch(createOrder(order));
          navigate("/success");
        } else {
          alert.error("There's some issue while processing payment");
        }
      }
    } catch (error) {
      payBtn.current.disabled = false;
      alert.error(error.message);
    }
  };
  
  const paymentData = {
    amount: Math.round(order.totalPrice * 100),
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
  },[dispatch, error, alert])

  return (
    <Fragment>
      <MetaData title="Payment" />
      <CheckoutSteps activeStep={2} />
      {stripeApiKey && stripe && elements && (
        <Elements stripe={stripe}>
          <div className="paymentContainer">
            <form className="paymentForm" onSubmit={(e) => submitHandler(e)}>
              <Typography>Card Info</Typography>
              <div>
                <CreditCardIcon />
                <CardNumberElement className="paymentInput" />
              </div>
              <div>
                <EventIcon />
                <CardExpiryElement className="paymentInput" />
              </div>
              <div>
                <VpnKeyIcon />
                <CardCvcElement className="paymentInput" />
              </div>

              <input
                type="submit"
                value={`Pay - ₹${order.totalPrice}`}
                ref={payBtn}
                className="paymentFormBtn"
              />
            </form>
          </div>
        </Elements>
      )}
    </Fragment>
  );
};

export default Payment;
