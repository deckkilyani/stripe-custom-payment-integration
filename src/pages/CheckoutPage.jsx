import React, { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

import CheckoutForm from "../CheckoutForm";
import "./CheckoutPage.css";


// Make sure to call loadStripe outside of a component’s render to avoid
// recreating the Stripe object on every render.
// This is a public sample test API key.
// Don’t submit any personally identifiable information in requests made with this key.
// Sign in to see your own test API key embedded in code samples.


const stripePromise = loadStripe('pk_test_51MjxehEJzxtRRNrxlEz0bpSqxlT8PkJZkjxuZ6MKNJhXxCE5vjze94PtLMtO72PHVrUpRw5bUvkICiQ8Y6bAUowD00ZdlQfbQJ');
console.log();

export default function CheckoutPage() {


  const [clientSecret, setClientSecret] = useState("");
  console.log(clientSecret);
 
  useEffect(() => {
    // Create PaymentIntent as soon as the page loads
    fetch("/create-payment-intent", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ items: [{ id: "xl-tshirt" }] }),
    })
      .then((res) => res.json())
      .then((data) => setClientSecret(data.clientSecret));
  }, []);

  const appearance = {
    theme: 'flat',
    variables: {
      colorPrimary: '#26d3d3',
    },
  };
  const options = {
    clientSecret,
    appearance,
  };

  return (
    <div className="App">
      {clientSecret && (
        <Elements options={options} stripe={stripePromise}>
          <CheckoutForm />
        </Elements>
      )}
    </div>
  );
}