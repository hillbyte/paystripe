import React, {useState} from 'react';
import logo from './logo.svg';
import './App.css';
import StripeCheckout from "react-stripe-checkout"

function App() {

  const [product , setProduct] = useState({
    name : "coffe from hill",
    price : 10,
    productBy: "Hill Byte"
  });

  const makePayment = token =>{
    const body ={
      token,
      product
    }
    const headers = {
      "Content-Type": "application/json"
    }
    
    return fetch(`http:localhost:7866/payment`, {
      method : "POST",
      headers,
      body: JSON.stringify(body)
    }).then(response => {
      console.log("RESPONSE", response);
      const {status} = response;
      console.log("STATUS",status);
  })
  .catch(error=> console.log(error));
  }

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        
        <StripeCheckout 
        stripeKey= "pk_live_51HRuDgLzOiFxUrYZuAW4VB9VlZ91YvrmAAfeTuNBQuz9BzkrccdlzrB4ahVFzNhVDK7ITAb63os6UPHpLVQ9DBmk00qlgSCzTK" 
        token={makePayment}
         name="Buy Coffe"
         amount= {product.price * 100}
         //shippingAddress
         //billingAddress
         >
         
        <button className="btn-small green">Buy Coffe at just {product.price}</button>
        </StripeCheckout>

      </header>
    </div>
  );
}

export default App;
