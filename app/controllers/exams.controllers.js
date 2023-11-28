const Exam = require("../models/exams.models");


exports.create = function(req, res){
    const {exam_name} = req.body;
    const {id, email} = req.user;

    const exam = new Exam({
        exam_name:exam_name,
        exam_img :"",
        id:id,
        created_by:email
    })

    exam.save(function(err, data){
        if(data){
            console.log("-----data", data)
            res.send(data);
        }else{
            console.log("----errro --", err)
        }
    })
}

exports.examList = function(req, res){
     const {id} = req.user;
    Exam.find({id}, function(err, result){
        if(result){
            res.send(result);
        }else{
            res.send(err);
        }
    })
}

exports.updateExamName = function(req, res){
    const {exam_name} = req.body;
    const _id = req.params.examId;
    console.log("-----id dfds", _id);
    Exam.findById(req.params.examId, function(err, exam){
        if(err){
            res.status(500).send(err);
        }
        exam.exam_name = exam_name;

        exam.save(function(err, result){
            if(result){
                res.send({message:"Exam name is successfully updated."})
            }else{
                res.send(err);
            }
        })
    })
}
