const express = require('express');
const dotenv = require('dotenv');
const jwt = require('jsonwebtoken')
const cors = require('cors')
dotenv.config();
const AuthUser = require('./api/middlewares/Auth')
const Constant = require('./api/common/constant')
const Method = require('./api/common/method')
const bodyParser = require("body-parser");
const { User } = require('./api/database/User');
const app = express()
const port = 3001

app.use(express.json())
app.use(cors())
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
    const index = User.findIndex(item => item.username === dataUser.username)
    if(index < 0) {
      res.json(Constant.DATA_INCORRECT)
    }
    else {
      if(User[index].password === dataUser.password) {
          const accessTokenUser = jwt.sign(dataUser, process.env.ACCESS_TOKEN_SECRET);
          res.json({
            "returnCode": '1',
            "message": Constant.RETURN_CODE.OK,
            accessTokenUser
          })
      } else {
        res.json(Constant.DATA_INCORRECT)
      }
    }
    
  }
  
});

// tao token hoa don thanh toan
app.post('/createOrderToken', AuthUser.verifyUser, (req,res) => {
  const dataOrder = req.body
  console.log(dataOrder);
  if(Method.isEmptyObject(dataOrder)) {
    res.json(Constant.ORDER_MISSING_PARAMETER)
  }
  else {
    if(dataOrder.bill_IP === '' || dataOrder.bill_IP == undefined) {res.json(Constant.ORDER_MISSING_PARAMETER)}
    if(dataOrder.bill_amount === undefined) {res.json(Constant.ORDER_MISSING_PARAMETER)}
    if(dataOrder.bill_Type === '' || dataOrder.bill_Type === undefined) {res.json(Constant.ORDER_MISSING_PARAMETER)}
    const accessTokenOrder = jwt.sign(dataOrder, process.env.ACCESS_TOKEN_ORDER_SECRET,
    {expiresIn: '15m'}
    );
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
app.post('/getOrderInfo', AuthUser.verifyUser, (req, res) => {
  const orderToken = req.body.accessTokenOrder
  const infoOrder = jwt.verify(orderToken, process.env.ACCESS_TOKEN_ORDER_SECRET, (err, data) => {
      if(err) {
        console.log("err", err)
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