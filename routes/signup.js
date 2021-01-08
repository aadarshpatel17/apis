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
const characters =
  "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
function generateString(length) {
  let result = "";
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
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
    if (data)
      return res.send({
        success: true,
        access_token: generateString(100),
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

router.get("/questions/", (req, res) => {
  //questions array
  const questions = [
    {
      id: 1,
      question: "What is used in ReactJs to increase performance",
      option: {
        one: "original DOM",
        two: "virtual DOM",
        three: "both a and b",
        four: "none of these",
      },
      answer: "virtual DOM",
    },
    {
      id: 2,
      question:
        "Which of the following below act as the input of a class-based component?",
      option: {
        one: "class",
        two: "class",
        three: "render",
        four: "props",
      },
      answer: "props",
    },
    {
      id: 3,
      question: "Default port where webpack-server will run",
      option: {
        one: "8080",
        two: "3333",
        three: "3030",
        four: "6020",
      },
      answer: "8080",
    },
    {
      id: 4,
      question:
        "What is the declarative way to render a dynamic list of components based on values in an array",
      option: {
        one: "Using the reduce array method",
        two: "Using the <Each /> component",
        three: "Using the Array.map() method",
        four: "With a for/while loop",
      },
      answer: "Using the Array.map() method",
    },
    {
      id: 5,
      question: "What is ReactJs?",
      option: {
        one: "Server side framework",
        two: "A Library for building interaction interfaces",
        three: "Client Side Framework",
        four: "None of the above",
      },
      answer: "A Library for building interaction interfaces",
    },
    {
      id: 6,
      question: "Who develop react.js?",
      option: {
        one: "Apple",
        two: "Facebook",
        three: "Twitter",
        four: "Google",
      },
      answer: "Facebook",
    },
    {
      id: 7,
      question: "What are props into other components",
      option: {
        one: "Injected",
        two: "Both A and C",
        three: "Method",
        four: "None of the above",
      },
      answer: "Method",
    },
    {
      id: 8,
      question: "ReactJs cover",
      option: {
        one: "User Interface layer in an application",
        two: "Data layer in an application",
        three: "Both A and B",
        four: "None of the above",
      },
      answer: "User Interface layer in an application",
    },
    {
      id: 9,
      question: "Who is the father of React.js?",
      option: {
        one: "Jordan mike",
        two: "Jordan Walke",
        three: "Nile",
        four: "Nike John",
      },
      answer: "Jordan Walke",
    },
    {
      id: 10,
      question: "React.js in MVC is",
      option: {
        one: "Model",
        two: "Middleware",
        three: "Method",
        four: "Controller",
      },
      answer: "Controller",
    },
    {
      id: 11,
      question: "What is state in react?",
      option: {
        one: "A prement storage",
        two: "Internal storage of the component",
        three: "Both A and B",
        four: "None of the above",
      },
      answer: "Internal storage of the component ",
    },
    {
      id: 12,
      question: "Everything in react is",
      option: {
        one: "Component",
        two: "Model",
        three: "Method",
        four: "Package",
      },
      answer: "Component",
    },
    {
      id: 13,
      question:
        "At the highest level, React components have lifecycle events that fall into",
      option: {
        one: "Destruction",
        two: "State/Property Updates",
        three: "Initialization",
        four: "All of the above",
      },
      answer: "All of the above",
    },
    {
      id: 14,
      question: "React component can return how many components",
      option: {
        one: "one",
        two: "multiple",
        three: "two",
        four: "three",
      },
      answer: "multiple",
    },
    {
      id: 15,
      question: "Babel is ",
      option: {
        one: "Compiler",
        two: "Transpilar",
        three: "None of the above",
        four: "Both A and B",
      },
      answer: "Both A and B",
    },
    {
      id: 16,
      question: "What is used in ReactJs to increase performance",
      option: {
        one: "original DOM",
        two: "virtual DOM",
        three: "both a and b",
        four: "none of these",
      },
      answer: "virtual DOM",
    },
    {
      id: 17,
      question:
        "Which of the following below act as the input of a class-based component?",
      option: {
        one: "class",
        two: "class",
        three: "render",
        four: "props",
      },
      answer: "props",
    },
    {
      id: 18,
      question: "Default port where webpack-server will run",
      option: {
        one: "8080",
        two: "3333",
        three: "3030",
        four: "6020",
      },
      answer: "8080",
    },
    {
      id: 19,
      question:
        "What is the declarative way to render a dynamic list of components based on values in an array",
      option: {
        one: "Using the reduce array method",
        two: "Using the <Each /> component",
        three: "Using the Array.map() method",
        four: "With a for/while loop",
      },
      answer: "Using the Array.map() method",
    },
    {
      id: 20,
      question: "What is ReactJs?",
      option: {
        one: "Server side framework",
        two: "A Library for building interaction interfaces",
        three: "Client Side Framework",
        four: "None of the above",
      },
      answer: "A Library for building interaction interfaces",
    },
    {
      id: 21,
      question: "Who develop react.js?",
      option: {
        one: "Apple",
        two: "Facebook",
        three: "Twitter",
        four: "Google",
      },
      answer: "Facebook",
    },
    {
      id: 22,
      question: "What are props into other components",
      option: {
        one: "Injected",
        two: "Both A and C",
        three: "Method",
        four: "None of the above",
      },
      answer: "Method",
    },
    {
      id: 23,
      question: "ReactJs cover",
      option: {
        one: "User Interface layer in an application",
        two: "Data layer in an application",
        three: "Both A and B",
        four: "None of the above",
      },
      answer: "User Interface layer in an application",
    },
    {
      id: 24,
      question: "Who is the father of React.js?",
      option: {
        one: "Jordan mike",
        two: "Jordan Walke",
        three: "Nile",
        four: "Nike John",
      },
      answer: "Jordan Walke",
    },
    {
      id: 25,
      question: "React.js in MVC is",
      option: {
        one: "Model",
        two: "Middleware",
        three: "Method",
        four: "Controller",
      },
      answer: "Controller",
    },
    {
      id: 26,
      question: "What is state in react?",
      option: {
        one: "A prement storage",
        two: "Internal storage of the component",
        three: "Both A and B",
        four: "None of the above",
      },
      answer: "Internal storage of the component ",
    },
    {
      id: 27,
      question: "Everything in react is",
      option: {
        one: "Component",
        two: "Model",
        three: "Method",
        four: "Package",
      },
      answer: "Component",
    },
    {
      id: 28,
      question:
        "At the highest level, React components have lifecycle events that fall into",
      option: {
        one: "Destruction",
        two: "State/Property Updates",
        three: "Initialization",
        four: "All of the above",
      },
      answer: "All of the above",
    },
    {
      id: 29,
      question: "React component can return how many components",
      option: {
        one: "one",
        two: "multiple",
        three: "two",
        four: "three",
      },
      answer: "multiple",
    },
    {
      id: 30,
      question: "Babel is ",
      option: {
        one: "Compiler",
        two: "Transpilar",
        three: "None of the above",
        four: "Both A and B",
      },
      answer: "Both A and B",
    },
  ];

  res.send(questions);
});

module.exports = router;
