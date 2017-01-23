
var io = require('socket.io-client');
var socket = io('http://sockethooks.garrows.com');

var DEVICE_NAME = '123456789';// Math.floor(Math.random() * 10000);

socket.on('connected', function(data) {
  console.log('Connected', data);
  socket.emit('register', DEVICE_NAME);
});


// =======================
// Derived from the work done by @makenai on the
// SumoBot Jr
// =======================

var five = require("johnny-five");
//var keypress = require('keypress');

var RSTOPVAL = 94;
var LSTOPVAL = 94;

var opts = {};
opts.port = process.argv[2] || "";

//keypress(process.stdin);

var board = new five.Board(opts);

board.on("ready", function() {

    console.log("Control the bot with the arrow keys, and SPACE to stop.")

/*
    var left_wheel  = new five.Servo({ pin:  5, type: 'continuous' });
    var right_wheel = new five.Servo({ pin: 6, type: 'continuous'  });

    process.stdin.resume(); 
    process.stdin.setEncoding('utf8'); 
    process.stdin.setRawMode(true); 
    left_wheel.to(LSTOPVAL);
    right_wheel.to(RSTOPVAL);
  */  

  	var servo = new five.Servo(5);
   
	console.log('setting up the data');
    socket.on('data', function(data) {
    	console.log(data);
      var dir = data.button;
      if(dir === '0'){
      	servo.center();
      	// stop
      	//left_wheel.to(LSTOPVAL);
      	//right_wheel.to(RSTOPVAL);
      }else if(dir === '1'){
      	servo.max();
      	// forward
      	//left_wheel.cw();
      	//right_wheel.ccw();
      }else if(dir === '2'){
      	servo.min();
      	// backward
      	//left_wheel.ccw();
      	//right_wheel.cw();   
      }
    });
});

board.on("error", function(err) {
    console.log(err.message);
    process.exit();
});