console.log('modules home');

// levelOne() is called a high-order function because
// it accepts another function as its parameter.
function levelOne(value, callback) {

   	console.log(`=====> x1`);
    var newScore = value + 5;
   	console.log(`=====> x2`);

	setTimeout(() => {       

	    sleep(2000);
	    callback(newScore);

    }, 100);

   	console.log(`=====> x3`);
   	console.log(`=====> x4`);


}




function sleep(milliseconds) {
  var start = new Date().getTime();
  for (var i = 0; i < 1e7; i++) {
    if ((new Date().getTime() - start) > milliseconds){
      break;
    }
  }
}

// Please note that it is not mandatory to reference the callback function (line #3) as callback, it is named so just for better understanding.

function startGame() {
    var currentScore = 5;
    console.log('Game Started! Current score is ' + currentScore);
        // Here the second parameter we're passing to levelOne is the
        // callback function, i.e., a function that gets passed as a parameter.
        levelOne(currentScore, function (levelOneReturnedValue) {
            console.log('Level One reached! New score is ' + levelOneReturnedValue);
        })

	for(let i=0; i<10; i++) {
		// setTimeout(() => {       
			sleep(1000);
	    	console.log(`----> ${i}`);
	    // }, 100);
	}
    console.log('----> two');
	console.log('----> three');

}

startGame();