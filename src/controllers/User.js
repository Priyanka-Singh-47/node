const bcrypt = require("bcrypt");

const userModel = require("../models/user");


const signUp = async (req, res) => {
  try {
    console.log("I am inside signup");
    res.render("userSignUp.ejs", { alreadyExist: "", mandatory: "" });
  } catch (error) {
    res.render("unExpected.ejs");
    console.log("unexpected error occured");
    console.log(error);
  }
};
const signUpData = async (req, res) => {
  try {
    var flag = 0;
    console.log("I am inside signup data");

    const {
      name,
      email,
      gender,
      country,
      state,
      city,
      password,
      profilePhoto,
    } = req.body;
    console.log("this is req.body", req.body);

    if (
      name == "" ||
      email == "" ||
      gender == "" ||
      country == "" ||
      state == "" ||
      city == "" ||
      password == ""
    ) {
      var required = "Please fill all fields marked as (*) mandatory";
      flag = 1;
    }

    if (flag == 1) {
      res.render("userSignUp.ejs", {
        mandatory: required,
        alreadyExist: "",
      });
    } else {
      const salt = await bcrypt.genSalt(10);
      let hashedPassword = bcrypt.hashSync(password, salt);

      const userdata = await userModel.findOne({ email: email });
      console.log(userdata, "userdata");
      let profileImage = req.files;
      // console.log(profileImage);
      if (!userdata && profileImage[0] !== undefined) {
        var mydata = new userModel({
          name,
          password: hashedPassword,
          email,
          gender,
          country,
          state,
          city,
          profilePhoto: profileImage[0].filename,
        });
      } else if (!userdata) {
        var mydata = new userModel({
          name,
          password: hashedPassword,
          email,
          gender,
          country,
          state,
          city,
        });
      } else {
        res.render("userSignUp.ejs", {
          alreadyExist:
            "user already exist, kindly go back and try loggin in !",
          mandatory: "",
        });
      }

      await userModel.create(mydata, function (err, user) {
        if (err) {
          console.log(err);
        } else {
          console.log(mydata);
          res.redirect("http://localhost:8010/api/v1/auth/login");
        }
      });
    }
  } catch (error) {
    res.render("unExpected.ejs");
    console.log("unexpected error occured");
    console.log(error);
  }
};
