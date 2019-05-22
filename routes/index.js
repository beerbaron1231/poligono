var express = require('express');
var router = express.Router();
var five = require("johnny-five");
var board = new five.Board();
const { exec } = require('child_process');


router.get('/',  function(req, res, next){
  res.sendfile('views/index.html');
})

router.get('/reset', function(req, res, next){
  exec('pm2 restart 0', (err, stdout, stderr) => {
    if (err) {
      console.error(err);
      return;
    }
    console.log(stdout);
    res.send('doreset')
  });
})
router.get('/update', function(req, res, next){
  exec('', (err, stdout, stderr) => {
    if (err) {
      console.error(err);
      return;
    }
    console.log(stdout);
    res.send('doreset')
  });
})

router.get('/apagar', function(req, res, next){
  exec('sudo shutdown now', (err, stdout, stderr) => {
    if (err) {
      console.error(err);
      return;
    }
    console.log(stdout);
    res.send('doreset')
  });
})


router.get('/cargar/:cargar', function(req, res, next) {
  var relay = new five.Relay({
    type: "NC",
    pin: 11
  });
  var relay2 = new five.Relay({
    type: "NC",
    pin: 12
  });
  // If NC wasn't specified above, this would
  // actually turn OFF the relay. Since it has been
  // specified, the relay will turn ON.
  relay.off();
  relay2.off();
function docargar() {
 
 let count = 0;
 const cargar = setInterval(() => {
    //do A
    
    count += 1;
    console.log('cargar timer ', count );
    
    if (count === parseInt(req.params.cargar)) {
      clearInterval(cargar);
      res.send('doA');
    }


  }, 1000);
}


docargar();


});

router.get('/tiro/:green/:red/:expo', function(req, res, next) {
 
  var relay = new five.Relay({
    type: "NC",
    pin: 11
  });
  var relay2 = new five.Relay({
    type: "NC",
    pin: 12
  });
  // If NC wasn't specified above, this would
  // actually turn OFF the relay. Since it has been
  // specified, the relay will turn ON.
  relay.off();
  relay2.off();
  

counttotal = 0;




function doA() {
  if(counttotal !== parseInt(req.params.expo)){
  
  relay2.on();
  relay.off();
  let count = 0;
  const a = setInterval(() => {
    //do A
    
    count += 1;
    console.log('Tiempo Rojo ', count);
    if (count === parseInt(req.params.red)) {
      clearInterval(a);
      doB();
    }
  }, 1000);
}else{
  relay2.off();
  relay.off();
  res.send("descargar");
}
}
function doB() {
 
  relay2.off();
  relay.on();
  let count = 0;
  
  const a = setInterval(() => {
    //do A
    
    relay2.off();
    relay.on();
    count += 1;
    console.log('tiempo Verde', count);
    if (count === parseInt(req.params.green)) {
      clearInterval(a);
      doA();
    }
  }, 1000);
  console.log(counttotal)
  counttotal ++;  
  
  
}

doA() 
});


module.exports = router;
