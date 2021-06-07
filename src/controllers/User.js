const bcrypt = require("bcrypt");

const userModel = require("../models/user");

const signUp = async (req, res) => {
  try {
    console.log("I am inside signup data");

    const { name, email, gender, city, password } = req.body;
    console.log("this is req.body", req.body);

    const salt = await bcrypt.genSalt(10);
    let hashedPassword = bcrypt.hashSync(password, salt);

    const userdata = await userModel.findOne({ email: email });
    console.log(userdata, "userdata");
    // let profileImage = req.files;
    // console.log(profileImage);
    if (!userdata) {
      var mydata = new userModel({
        name,
        password: hashedPassword,
        email,
        gender,
        city,
      });
    } else {
      res.status(500).json("User already exist");
    }

    await userModel.create(mydata, function (err, user) {
      if (err) {
        console.log(err);
      } else {
        console.log(mydata);
        res.status(200).json("User is registered successfully");
      }
    });
  } catch (error) {
    res.status(400).json("unexpected error occured");
    console.log(error);
  }
};

const userLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log(req.body);
    const userdata = await userModel.findOne({ email: email });
    console.log(userdata.password);
    const match = await bcrypt.compare(password, userdata.password);
    if (match) {
      res.status(200).json("you are signed in successfully");
    } else {
      res.status(500).json("invalid login credentials");
    }
  } catch (error) {
    res.status(400).json("unexpected error occured");
    console.log(error);
  }
};

const viewProfile = async (req, res) => {
  try {
    const id = req.params.id;
    console.log(id);

    const userdata = await userModel.findOne({ _id: id });
    // console.log(userdata);
    res.status(200).json(userdata);
  } catch (error) {
    res.status(400).json("unexpected error occured");
    console.log(error);
  }
};

module.exports = { signUp, userLogin, viewProfile };
