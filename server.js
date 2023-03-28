const express = require("express");
const app = express();
require('dotenv').config()

// This is a public sample test API key.
// Don’t submit any personally identifiable information in requests made with this key.
// Sign in to see your own test API key embedded in code samples.
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

app.use(express.static("public"));
app.use(express.json());

/* const calculateOrderAmount = (items) => {
  // Replace this constant with a calculation of the order's amount
  // Calculate the order total on the server to prevent
  // people from directly manipulating the amount on the client
  return 10000;
}; */

const calculateOrderAmount = (items) => {
  let total = 0;
  for (let i = 0; i < items.length; i++) {
    const item = items[i];
    total += item.price * item.quantity;
  }
  return total*100;
};


app.post("/create-payment-intent", async (req, res) => {
  /* const { items } = req.body; */
  const items = [
    { 
      name: 'Coffee',
      price: 10,
      product_id: 'PKDH12',
      quantity: 2
    },
    { 
      name: 'Tea',
      price: 8.25,
      product_id: 'PKDH03',
      quantity: 3
    }
  ];
  // Create a PaymentIntent with the order amount and currency
  const paymentIntent = await stripe.paymentIntents.create({
    amount: calculateOrderAmount(items),
    currency: "usd",
    customer: "cus_NZhP2re3RpGNJe",
    metadata: {
      items: JSON.stringify(items),
    },
    automatic_payment_methods: {
      enabled: true,
    },
  });

  res.send({
    clientSecret: paymentIntent.client_secret,
  });
});




app.listen(4242, () => console.log("Node server listening on port 4242!"));