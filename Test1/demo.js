




const express = require('express');
const app = express();
const bodyParser=require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}))

//========================================================1
app.post('/',(req,res)=>{

  const emailRegex = /^[a-zA-Z]+$/;
  const passwordRegex =/^[0-9]{5}+$/;
  
  var email=req.body.mail;
  var password=req.body.password;
  
  const validemail = emailRegex.test(email);
  const validpassword = passwordRegex.test(password);
  
      
      if(!validemail && !validpassword){
         throw new Error("Invalid")
      }else{
          res.status(200).send('success')
      }
  
  })

//========================================================2
app.get('/search/:name', (req, res) => {
   
    const name = req.params.name;

   
    const uName = name.toUpperCase();


    res.send({ uName });
});



//===============================================================3
// const math = require('./area');
// const params1 = 50
// const params2 = 20
// console.log("add:", math.add(params1, params2));
// console.log("sub:", math.subtract(params1, params2));
// console.log("divi:",math.divide(params1, params2));
// console.log("multiply:",math.multiply(params1, params2));
const {add,subtract,divide,multiply}= require('./area');
console.log(add(3,3))
console.log(subtract(5-3))
console.log(divide(10,2))
console.log(multiply(2,2))

//=====================================================================4

/*

a)db.list.find({ "property_type": "House" })


b)db.list.aggregate([
  {
     $match: {
        "price": { $gt: 500 }
     }
  },
  {
     $project: {
        "listing_url": 1,
        "name": 1,
        "host_name": 1,
        "host_location": 1,
        "reviewer_name": 1,
        "price": 1,
        "_id": 0
     }
  }
])

c)db.list.find({
   "address.country": "Brazil",
   "review_scores.review_scores_rating": { $gte: 9 }
})
*/


app.listen(3000, () => {
  console.log('Server is listening on port 3000');
});





