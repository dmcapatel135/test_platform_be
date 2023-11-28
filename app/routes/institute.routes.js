const JWT = require("jsonwebtoken");

  module.exports = function(app){
    var institute = require("../controllers/institute.controllers");
    var exam  = require("../controllers/exams.controllers");
    var test  = require("../controllers/test.controllers");
    var question = require("../controllers/question.controllers");

    const instituteAuth = require("../middleware/institueAuthorize.middleware");

    const instituteAuthorize = instituteAuth.instituteAuthorize;

    const authorize = (req, res, next) => {
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

    app.post("/institute/api/registration",  institute.create);

    app.post("/institute/api/login", institute.loign);
   
    app.get("/administrator/api/institutelist", authorize,  institute.institutelist);

    app.get("/institute/api/student-list", instituteAuthorize, institute.studentList);

    app.post("/institute/api/create-exam", instituteAuthorize, exam.create);

    app.get("/institute/api/exams", instituteAuthorize, exam.examList);

    app.put("/institute/api/update-exam/:examId", instituteAuthorize, exam.updateExamName);

    app.post("/institute/api/create-test/:examId", instituteAuthorize, test.createTest);

    app.get("/institute/api/test-list/:examId", instituteAuthorize,  test.testList);

    app.post("/institute/api/create-question/:testId", instituteAuthorize, question.create);

    app.get("/institute/api/test/questions/:testId", instituteAuthorize, question.testQuestions)
    
}


