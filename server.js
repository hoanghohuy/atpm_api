const express = require('express');
const dotenv = require('dotenv');
const jwt = require('jsonwebtoken')
dotenv.config();
const AuthUser = require('./api/middlewares/Auth')
const Constant = require('./api/common/constant')
const Method = require('./api/common/method')
const bodyParser = require("body-parser")
const app = express()
const port = 3001

app.use(express.json())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}))
app.get('/', (req, res) => {
  res.send(`'/' not found.`)
});

// tao user token
app.post('/createUserToken', (req,res) => {
  const dataUser = req.body
  if(Method.isEmptyObject(dataUser)) {
    res.json(Constant.USER_MISSING_PARAMETER)
  }
  else {
    const accessTokenUser = jwt.sign(data, process.env.ACCESS_TOKEN_SECRET);
    res.json({
      "returnCode": '1',
      "message": Constant.RETURN_CODE.OK,
      accessTokenUser
    })
  }
  
});

// tao token hoa don thanh toan
app.post('/createOrderToken', AuthUser.verifyUser, (req,res) => {
  const dataOrder = req.body
  if(Method.isEmptyObject(dataOrder)) {
    res.json(Constant.ORDER_MISSING_PARAMETER)
  }
  else {
    const accessTokenOrder = jwt.sign(dataOrder, process.env.ACCESS_TOKEN_ORDER_SECRET);
    res.json({
      "returnCode": "1",
      "message": Constant.RETURN_CODE.OK,
      "description": "Create order token",
      "returnUrl": `http://localhost:3000/PaymentMethod?token=${accessTokenOrder}`,
      accessTokenOrder
    })
  }
});

//encode token =>>> user info
app.get('/getUserInfo', AuthUser.verifyUser , (req, res) => {
  const verifyData = res.verifyData;
  res.json({
    "returnCode": "1",
    "message": Constant.RETURN_CODE.OK,
    "data": verifyData 
  })
})

//encode token =>>> Order info
app.get('/getOrderInfo', AuthUser.verifyUser, (req, res) => {
  const orderToken = req.body.accessTokenOrder
  const infoOrder = jwt.verify(orderToken, process.env.ACCESS_TOKEN_ORDER_SECRET, (err, data) => {
      if(err) {
        res.json(Constant.PERMISSION_DENIED)
      }
      res.json({
        "returnCode": "1",
        "message": Constant.RETURN_CODE.OK,
        "description": "Get information order from token",
        data
      })
    })
  
})

app.listen(port, () => {
  console.log(`Server is running on PORT ${port}`)
})