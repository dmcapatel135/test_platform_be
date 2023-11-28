const Question = require("../models/question.models");


exports.create = function(req, res){
    const {question_text, score, type, options } = req.body;
    const testId = req.params.testId;
    const question = new Question({
        questionText:question_text,
        score:score,
        type:type,
        options:options,
        id:testId,
    })

        question.save(function(err, result){
            if(result){
                res.send(result);
            }else{
                res.send(err);
            }
        })
}

exports.testQuestions = function(req, res){
    const id = req.params.testId;
    Question.find({id}, function(err, result){
        if(result){
           res.send(result);
        }else{
            res.send(err);
        }
    })
}


