
const JWT = require("jsonwebtoken");

module.exports = function(app){
   var student = require("../controllers/student.controllers");
   

   const studentAuthorize = (req, res, next) => {
      const authHeader = req.headers["authorization"]
      const token = authHeader.split(" ")[1]
      //the request header contains the token "Bearer <token>", split the string and use the second value in the split array.
      if (token == null) res.sendStatus(400).send("Token not present")
      JWT.verify(token, "mysecretkey", (err, user) => {
          if (err) { 
              res.status(403).send("Token invalid")
          }
          else {
       req.user = user
       next() //proceed to the next action in the calling function
       }
      }) //end of jwt.verify()
    };

   app.post("/student/api/registration",  student.create);
   app.post("/student/api/login/:institute_name", student.login);
   // app.delete("/student/api/remove-student/:id", student.removeStudent);
   app.get("/student/api/dashboard", studentAuthorize,  student.dashboard);

}
