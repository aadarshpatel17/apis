var router = require("express").Router();
const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/ExamTaskUser", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    index: {
      unique: true,
    },
  },
  email: {
    type: String,
    index: {
      unique: true,
    },
  },
  password: {
    type: String,
    required: true,
  },
  contact: {
    type: Number,
    require: true,
  },
});

var userModel = mongoose.model("users", userSchema);

//random string i.e. access_token 
const characters ='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
function generateString(length) {
    let result = '';
    const charactersLength = characters.length;
    for ( let i = 0; i < length; i++ ) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}


//checking username existence
isUserNameExist = (req, res, next) => {
  var username = req.body.username;

  var password = req.body.password;

  var checkName = userModel.findOne({
    username: username,
    password: password,
  });

  checkName.exec((err, data) => {
    if (err) throw err;
    if (data) return res.send({
      "success": true,
      "access_token": generateString(100)
    });
    else return res.send("Invalid Credentials!");
  });
  next();
};

// signup page get and post method
router.get("/signup", (req, res) => {
  res.send("SIGNUP SUCCESSFULL (GET METHOD)!!!");
});

router.post("/signup", (req, res) => {
  var userDetail = new userModel({
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
    contact: req.body.contact,
  });

  userDetail.save((err, data) => {
    if (err) throw err;
    else res.send("SIGNUP SUCCESSFULL (POST METHOD)!!!");
  });
});

// login page get and post method
router.get("/login", (req, res, next) => {
  res.send("LOGIN SUCCESSFULL (GET METHOD)!!!");
});

router.post("/login", isUserNameExist, (req, res, next) => {
  var userDetail = userModel.find({
    username: { $ne: req.body.username },
    password: { $ne: req.body.password },
  });

  userDetail.exec((err, data) => {
    if (err) throw err;
    if (data) {
      var user = [];
      for (let i = 0; i < data.length; i++)
        user.push(data[i].username.toUpperCase());

      var name = req.body.username;
      name = name.toUpperCase();

      return res.send("LOGIN SUCCESSFULL (POST METHOD)!!!");
    }
  });
});

module.exports = router;
