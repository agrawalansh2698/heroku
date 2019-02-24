var express=require("express");
var router=express.Router();
var mongojs=require("mongojs");
var db=mongojs("mydatabase",["mycollection"]);
router.get("/edit",function(req,res){
	res.render("edit");
});
router.post("/edit",function(req,res){
   var company=req.body.company;
   var category=req.body.category;
   var jobtitle=req.body.jobtitle;
   var description=req.body.description;
   var location=req.body.location;
   var email=req.body.email;
   
//Validation
req.checkBody("company","Company field is required").notEmpty();
req.checkBody("jobtitle","Job field is required").notEmpty();
req.checkBody("location"," Location field is required").notEmpty();
req.checkBody("email","Name field is required").notEmpty();
req.checkBody("email","Invalid Email").isEmail();

//Validation
	var errors = req.validationErrors();
	if (errors) {
		console.log("Form has an error");
		req.flash("error","Please fill all the fields");
		res.render("edit",{
		   errors:errors,
		   company:company,
		   location:location,
		   jobtitle:jobtitle,
		   email:email,
		   category:category,
		   description:description
		});
	}else{
		var newcollection = {
			company: company,
			location: location,
			jobtitle: jobtitle,
			email: email,
			category: category,
			description: description
		};
		db.mycollection.insert(newcollection, function (err, doc) {
			if (err) {
				console.log(err);
			} else {
				
				req.flash("success", "You have successfully updated the data");
				res.location('/');
				res.redirect("/");
			}

		});
	}
});
module.exports = router;