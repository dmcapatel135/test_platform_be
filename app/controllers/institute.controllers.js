const Institute = require("../models/institute.models");
const Student = require("../models/student.models");

const JWT = require("jsonwebtoken");
const bcrypt = require("bcrypt");

exports.create = async function (req, res) {
  const { email, password, contact, fullname, institute_name } = req.body;

await Institute.find({ email }, async (err, result) => {
    if (!result) {
      const institute = new Institute({
        email: email,
        password: await bcrypt.hash(password, 10),
        contact: contact,
        fullname: fullname,
        institute_name: institute_name,
        role: "institute",
      });

      institute.save(function (err, data) {
        if (err) {
          console.log("-----error----", err)
          res.status(500).send(err);
        } else {
            console.log("-----data", data)
          res.send(data);
        }
      });
    } else {
      res.send("User is already exist.");
    }
  });
};

exports.institutelist = function (req, res) {
  if (req.user.role === "superadmin") {
    Institute.find({ role: "institute" }, function (err, result) {
      if (result) {
        res.send(result);
      } else {
        res.status(500).send(err);
      }
    });
  } else {
    res.send({
      message: "You have not authorized please provide the valid token.",
    });
  }
};

exports.loign = function (req, res) {
  const { email, password } = req.body;

  Institute.findOne({ email }, function (err, result) {
    if (result) {
      bcrypt.compare(password, result.password, function (err, match) {
        if (match) {
          JWT.sign(
            {
              email: email,
              password: result.password,
              role: result.role,
              id: result._id.valueOf(),
            },
            "mysecretkey",
            function (err, token) {
              if (err) {
                res.status(400).send(err);
              } else {
                res.send({ accessToken: token, data: result });
              }
            }
          );
        } else {
          res
            .status(400)
            .send({ message: "please check your password is incorrect." });
        }
      });
    } else {
      res
        .status(400)
        .send({ message: "No acitve account found with this credentials." });
    }
  });
};

exports.studentList = function (req, res) {
  const inst_id = req.user.id;
  Student.find({ inst_id }, function (err, result) {
    if (result) {
      res.send(result);
    } else {
      res.send(err);
    }
  });
};

