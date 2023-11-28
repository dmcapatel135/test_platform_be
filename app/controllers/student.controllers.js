const Student = require("../models/student.models");
const Institute = require("../models/institute.models");
const Exam = require("../models/exams.models");

const JWT = require("jsonwebtoken");
const bcrypt = require("bcrypt");

exports.create = function (req, res) {
  const { email, password, contact } = req.body;
  const institute_name = req.query.institute_name;

  Institute.findOne({ institute_name }, function (err, result) {
    Student.findOne({ email }, async function (err, studentRes) {
      if (result && studentRes === null) {
        const student = new Student({
          email: email,
          password: await bcrypt.hash(password, 10),
          contact: contact,
          institute_name: institute_name,
          inst_id: result._id.valueOf(),
        });
        student.save(function (err, data) {
          if (err) {
            res.status(500).send(err);
          } else {
            res.send(data);
          }
        });
      } else {
        res.status(400).send({ message: "user is already exist ." });
        console.log("user is already exist .");
      }
    });
  });
};

exports.login = function (req, res) {
  const { email, password } = req.body;
  const institute_name = req.params.institute_name;
  Student.find(
    { email: email, institute_name: institute_name },
    function (err, result) {
      if (result.length > 0) {
        bcrypt.compare(password, result[0].password, function (err, match) {
          if (match) {
            JWT.sign(
              {
                email: result[0].email,
                id: result[0]._id.valueOf(),
                inst_id: result[0].inst_id,
              },
              "mysecretkey",
              function (err, token) {
                if (token) {
                  res.send({ accessToken: token });
                } else {
                  res.send(err);
                }
              }
            );
          } else {
            res.send({ message: "Please check your password is incorrect." });
          }
        });
      } else {
        console.log("this is err", err);
        res.send({
          message: "No active account found with this given credentials.",
        });
      }
    }
  );
};

exports.dashboard = function (req, res) {
  const id = req.user.inst_id;
  Exam.find({ id }, function (err, result) {
    if (result) {
      res.send(result);
    } else {
      res.send(err);
    }
  });
};


