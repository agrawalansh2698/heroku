var express=require("express");
var router = express.Router();
var mongojs=require("mongojs");
var db=mongojs("mydatabase",["mycollection"]);
router.get("/",function(req,res){
	db.mycollection.find().sort({_id:-1}).toArray(function(err,result){
		var query=req.query;
		res.render("index",{
			result:result,
			Category:query
		})
	});
})

module.exports = router;