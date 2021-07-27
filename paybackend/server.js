const cors = require("cors");
const express = require("express");
require("dotenv").config();
const stripe = require("stripe")(process.env.BACKEND_STRIPE_KEY);
const uuid = require("uuid");

const app = express();

//middleware
app.use(express.json());
app.use(cors());

//routes
app.get("/", (req,res)=>{
    res.send("Hello Stripe");
});

app.post("/payment", (req,res)=>{
    const {product,token}= req.body;
    console.log("Product",product);
    console.log("Price",price);
    const idempontencyKey = uuid()  

    return stripe.customers.create({
        email : token.email,
        source : token.id
    })
    .then(customer =>{
        stripe.charges.create({
           amount : product.price * 100,
           currency : 'usd',
            customers : customer.id,
            receipe_email: token.email,
            description : `purchase of ${product.name}`,
            shipping : {
                name : token.card.name,
                address: {
                    country : token.card.address_country
                }
            }
        },{idempontencyKey})
    })
    .then(result => res.status(200).json(result))
    .catch(err => console.log(err))

})

//listen
app.listen(7866,()=>console.log("listening on port 7866"))
