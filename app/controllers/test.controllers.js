const Test = require("../models/test.models");

exports.createTest = function (req, res) {
  const examId = req.params.examId;
  const { test_name, test_duration } = req.body;
  const test = new Test({
    test_name: test_name,
    test_duration: test_duration,
    id: examId,
  });

  test.save(function (err, result) {
    if (result) {
      res.send(result);
    }else{
        res.send(err);
    }
  });
};


exports.testList = function(req, res){
  const id = req.params.examId;
  Test.find({id}, function(err, result){
       if(result){
         res.send(result);
       }else{
         res.send(err);
       }
  })
}

