(function() {
    'use strict';
    var clock = document.getElementById('clock');
    var timebar = document.getElementById('loading-bar');
    var displayHex = false;

    var grad2 = "#ff0000";
    var grad3 = "#00ff00";
    var grad4;
    var grad5;


    function ColorLuminance(hex, lum) {

    	// validate hex string
    	hex = String(hex).replace(/[^0-9a-f]/gi, '');
    	if (hex.length < 6) {
    		hex = hex[0]+hex[0]+hex[1]+hex[1]+hex[2]+hex[2];
    	}
    	lum = lum || 0;

    	// convert to decimal and change luminosity
    	var rgb = "#", c, i;
    	for (i = 0; i < 3; i++) {
    		c = parseInt(hex.substr(i*2,2), 16);
    		c = Math.round(Math.min(Math.max(0, c + (c * lum)), 255)).toString(16);
    		rgb += ("00"+c).substr(c.length);
    	}

    	return rgb;
    }

    function hexClock() {
        var time = new Date();
        var hours = time.getHours().toString();
        var minutes = time.getMinutes().toString();
        var seconds = time.getSeconds().toString();
        var timebar = (seconds/ 60) * 50;
        //
        var hhours = hours.toString(16);
        var hminutes = minutes.toString(16);
        var hseconds = seconds.toString(16);

        //console.log();

        //console.log(time);
        if (hours.length < 2) {
            hours = '0' + hours;
        }
        if (minutes.length < 2) {
            minutes = '0' + minutes;
        }
        if (seconds.length < 2) {
            seconds = '0' + seconds;
        }
        if (hhours.length < 2) {
            hhours = '0' + hhours;
        }
        if (hminutes.length < 2) {
            hminutes = '0' + hminutes;
        }
        if (hseconds.length < 2) {
            hseconds = '0' + hseconds;
        }






        var clockStr = hours + ':' + minutes + ':' + seconds;
        var hexCode = '#' + hhours + hminutes + hseconds;
console.log(hexCode);

        grad2 = ColorLuminance( hexCode, -.25);
        grad3 = ColorLuminance( hexCode, -.40);
        grad4 = ColorLuminance( hexCode, -.50);
        grad5 = ColorLuminance( hexCode, -.65);


console.log("g2 " + grad2);
console.log("g3 " + grad3);

            if (displayHex === false) {
                clock.textContent = clockStr;
            } else {
                clock.textContent = hexCode;
            }
            var cirs = document.getElementById('cirs');
            cirs.style.backgroundImage = "repeating-radial-gradient(circle "+ hexCode +", " + grad2+ " 25% , " + grad3 +" 50%, " + grad4 +" 75%, " + grad5 +" 100%)";



        document.body.style.backgroundColor = hexCode;
        document.getElementById('loading-bar').style.width = timebar + "%";


    }



    clock.addEventListener('mouseover', function(hexClock) {
        displayHex = true
    });
    clock.addEventListener('mouseleave', function(hexClock) {
        displayHex = false
    });

    hexClock();
    setInterval(hexClock, 1000);
}());
