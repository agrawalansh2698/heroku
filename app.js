var bodyparser=require("body-parser");
var express=require("express");
var mongojs=require("mongojs");
var expressValidator = require("express-validator");
var passport=require("passport");
var localstrategy=require("passport-local").Strategy;
var path=require("path");
var session=require("express-session");
var flash=require("connect-flash");
var app=express();
var port=2988;
//Routes 
var routes=require("./routes/index");
var editor=require("./routes/editor");

app.set("views",path.join(__dirname,"views"));
app.set("view engine","ejs");


//Public File
app.use(express.static(path.join(__dirname,"public")));
//Bootstrap file
app.use('/css', express.static(__dirname + '/node_modules/bootstrap/dist/css'));



//BodyParser Middleware
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: false }));


//Session Middleware
app.use(session({
  secret: 'secret',
  resave: true,
  saveUninitialized: true
}));

// Middleware passport
app.use(passport.initialize());
app.use(passport.session());


//Flash Middleware
app.use(flash());
app.use(function(req,res,next){
	res.locals.messages=require("express-messages")(req,res);
	next();
});

//Express-Validator Middleware
app.use(expressValidator({
	errorFormatter:function(param,msg,value){
		var namespace=param.split(".")
		,root =namespace.shift()
		,formParam=root;
	while(namespace.length){
		formParam+="["+namespace.shift()+"]";

	}
	return {
		param:formParam,
		msg:msg,
		value:value
	};
  }
}));

//Routes Function
app.use("/",routes);
app.use("/editor",editor);

//Callback the server
app.listen(port,function(err,result){
	if(err){
          console.log(err);
	}
	else{
		console.log("Server is running on the port"+port);
	}
});