    var canvas, ctx, flag = false,
        prevX = 0,
        currX = 0,
        prevY = 0,
        currY = 0,
        dot_flag = false;

    var x = "black",
        y = 0.5,
        w, h,
        colorWell,
        defaultColor = "#000000",
        showing = true;
    
    function init() {
    	g = document.createElement('canvas');
		g.setAttribute("id", "can");
    	document.body.appendChild(g);
		$("#can").css("height", "75%");
		$("#can").css("width", "75%");    	
        canvas = document.getElementById('can');
        // Change this based on window size...
        var displayWidth  = canvas.clientWidth;
 		var displayHeight = canvas.clientHeight;
        canvas.width = displayWidth;
        canvas.height = displayHeight;
        ctx = canvas.getContext("2d");
        w = canvas.width;
        h = canvas.height;
    
        canvas.addEventListener("mousemove", function (e) {
            findxy('move', e)
        }, false);
        canvas.addEventListener("mousedown", function (e) {
        	i = 0;
            findxy('down', e)
        }, false);
        canvas.addEventListener("mouseup", function (e) {
            findxy('up', e)
        }, false);
        canvas.addEventListener("mouseout", function (e) {
            findxy('out', e)
        }, false);
        
        $("body").keydown(function(e){
        	 if(e.which==72){
        	 	if(showing){
   				$("#color_container").css("display","none");
   				showing = false;
   				} else {
   				$("#color_container").css("display","block");
   				showing = true;
   				}
   			}
        });
        
        colorWell = document.querySelector("#colorPicker");
  		colorWell.value = defaultColor;
  		colorWell.addEventListener("input", color(), false);
  		colorWell.addEventListener("change", color(), false);
  		colorWell.select();
    }
    
    function resize(){
    	var userHeight = document.getElementById("usrHgt").value;
    	var userWidth = document.getElementById("usrWdth").value;
		$("#can").css("height", userHeight);
		$("#can").css("width", userWidth);
		var displayWidth  = canvas.clientWidth;
 		var displayHeight = canvas.clientHeight;
        canvas.width = displayWidth;
        canvas.height = displayHeight; 	
        w = canvas.width;
        h = canvas.height;
    }
    
    function resizeToWindow(){
		$("#can").css("height", "80%");
		$("#can").css("width", "80%");
		var displayWidth  = canvas.clientWidth;
 		var displayHeight = canvas.clientHeight;
        canvas.width = displayWidth;
        canvas.height = displayHeight; 	
        w = canvas.width;
        h = canvas.height;
    }
    
	function color(){
		x = colorWell.value;
	}

	function getRandomColor() {
  		var letters = '0123456789ABCDEF';
  		var color = '#';
  		for (var i = 0; i < 6; i++) {
  		  	color += letters[Math.floor(Math.random() * 16)];
  			}
  		return color;
	}
var symmetry = true;
	function symmetryOnOff(){
		if($('#symmetryMode:checked').val()=="on"){
			symmetry = true;
		} else {
			symmetry = false;
		}
	}

    
    function draw() {
    	// Mouse path
        ctx.beginPath();
	        ctx.moveTo(prevX, prevY);
	        ctx.lineTo(currX, currY);
	        ctx.strokeStyle = x;
	        ctx.lineWidth = y;
	        ctx.stroke();
        ctx.closePath();
        
        if(symmetry){
        
         // Opposite X
        ctx.beginPath();
	        ctx.moveTo(w-prevX, prevY);
	        ctx.lineTo(w-currX, currY);
	        ctx.strokeStyle = x;
	        ctx.lineWidth = y;
	        ctx.stroke();
        ctx.closePath();
        
         // Opposite Y
        ctx.beginPath();
	        ctx.moveTo(prevX, h-prevY);
	        ctx.lineTo(currX, h-currY);
	        ctx.strokeStyle = x;
	        ctx.lineWidth = y;
	        ctx.stroke();
        ctx.closePath();
        
        // Opposite X, Opposite Y
        ctx.beginPath();
	        ctx.moveTo(w-prevX, h-prevY);
	        ctx.lineTo(w-currX, h-currY);
	        ctx.strokeStyle = x;
	        ctx.lineWidth = y;
	        ctx.stroke();
        ctx.closePath();
        
        }
    }
    
    function drawPoints() {
    	// Mouse path
        ctx.fillRect(currX, currY, y, y);
        
        if(symmetry){
        
         // Opposite X
        ctx.fillRect(w-currX, currY, y, y);
        
         // Opposite Y
        ctx.fillRect(currX, h-currY, y, y);
        
        // Opposite X, Opposite Y
        ctx.fillRect(w-currX, h-currY, y, y);
        
        }
    }
    
    function erase() {
        ctx.clearRect(0, 0, w, h);
        clearInterval(timer);
    }
    
    
    function save(){
	var img = canvas.toDataURL("image/png");
	var win = window.open();
    win.document.write('<iframe src="' + img  + '" frameborder="0" style="border:0; top:0px; left:0px; bottom:0px; right:0px; width:100%; height:100%;" allowfullscreen></iframe>');
}
    
    function changeY(){
    	y = 0.5*document.getElementById("lineWidth").value;
    }
    
    function findxy(res, e) {
        if (res == 'down') {
            prevX = currX;
            prevY = currY;
            currX = e.pageX - canvas.offsetLeft;
            currY = e.pageY - canvas.offsetTop;
            if(!randColors){
            	color();
            }
    
            flag = true;
            dot_flag = true;
            if (dot_flag) {
                ctx.beginPath();
                ctx.fillStyle = x;
                ctx.fillRect(currX, currY, 2, 2);
                ctx.closePath();
                dot_flag = false;
            }
        }
        if (res == 'up' || res == "out") {
            flag = false;
        }
        if (res == 'move') {
            if (flag) {
                prevX = currX;
                prevY = currY;
                currX = e.pageX - canvas.offsetLeft;
                currY = e.pageY - canvas.offsetTop;
                if(randColors){
                	x = getRandomColor();
                }
                draw();
            }
        }
    }

var newErase=true;
var animate = true;
	function checkErase(){
		if($('#checkErase:checked').val()=="on"){
			newErase = true;
		} else {
			newErase = false;
		}
	}
	function checkAnimate(){
	if($('#checkAnimate:checked').val()=="on"){
			animate = true;
		} else {
			animate = false;
		}
	}
	
var randColors=false;
var timer;
var i;


	function checkRandomColors(){
		if($('#checkRandomColors:checked').val()=="on"){
			randColors = true;
		} else {
			randColors = false;
		}
	}
	

	function timedRandLines(){
		if(animate){
			i = 0;
			var rate = document.getElementById("drawRate").value;
    		timer = setInterval(randTimed, rate);
		
			function randTimed() {
			  if(i==cnt) {
			    clearInterval(timer);
			    return;
			  	}
			  
		    var xPos = Math.random()*w;
		    var yPos = Math.random()*h;
		    
		    prevX = currX;
		    prevY = currY;
		 	currX = xPos;
	       	currY = yPos;
	       	if(randColors){
		       	if(i % Q ==0){
    	   		x = getRandomColor();
        			}
        	} else {
	        	color();
	        	}
	        draw();
        	i++;
		    }
		} else {
	   		for(i=0; i<cnt; i++){
	   			var xPos = Math.random()*w;
	    		var yPos = Math.random()*h;
	    				    		
		    	prevX = currX;
		    	prevY = currY;
	        	currX = xPos;
	        	currY = yPos;
	        	if(randColors){
		        	if(i % Q ==0){
    		    		x = getRandomColor();
    	    			}
    	    		} else {
		        		color();
		        	}
		        draw();
		    	}
		    }
		}
    	
    function timedRandWalk(){
    
      if(animate){
    	i = 0;
    	var rate = document.getElementById("drawRate").value;
    	timer = setInterval(randWalkTimed, rate);
    	
    	function randWalkTimed(){
    		if(i==cnt) {
		    clearInterval(timer);
		    return;
		  	}
    	    	var xPos = Math.round(Math.random());
    			var yPos = Math.round(Math.random());   
    			if(xPos!==1){
    				xPos = -1;
    			}
    			if(yPos!==1){
    				yPos = -1;
    			}
    			prevX = currX;
    	    	prevY = currY;
    	    	currX = prevX + xPos*walkSize;
    	    	currY = prevY + yPos*walkSize;
    	    	if(randColors){
		        	if(i % Q ==0){
    	    		x = getRandomColor();
        				}
        		} else {
	        		color();
	        		}
    	    	draw();
    	    	i++;
    	
    		}
		} else {
		for(i=0; i<cnt; i++){
			var xPos = Math.round(Math.random());
    		var yPos = Math.round(Math.random());   
    		if(xPos!==1){
    			xPos = -1;
			}
			if(yPos!==1){
   				yPos = -1;
   			}
   			prevX = currX;
   	    	prevY = currY;
   	    	currX = prevX + xPos*walkSize;
   	    	currY = prevY + yPos*walkSize;
   	    	if(randColors){
	        	if(i % Q ==0){
 	  	    		x = getRandomColor();
       				}
        	} else {
	        	color();
	        	}
    	    draw();
			}
		}
	}
	function timedRandScatter(){
		if(animate){
			i = 0;
			var rate = document.getElementById("drawRate").value;
    		timer = setInterval(randTimed, rate);
		
			function randTimed() {
			  if(i==cnt) {
			    clearInterval(timer);
			    return;
			  	}
			  
		    var xPos = Math.random()*w;
		    var yPos = Math.random()*h;
		    
		    prevX = currX;
		    prevY = currY;
		 	currX = xPos;
	       	currY = yPos;
	       	if(randColors){
		       	if(i % Q ==0){
    	   		x = getRandomColor();
        			}
        	} else {
	        	color();
	        	}
	        drawPoints();
        	i++;
		    }
		} else {
	   		for(i=0; i<cnt; i++){
	   			var xPos = Math.random()*w;
	    		var yPos = Math.random()*h;
	    				    		
		    	prevX = currX;
		    	prevY = currY;
	        	currX = xPos;
	        	currY = yPos;
	        	if(randColors){
		        	if(i % Q ==0){
    		    		x = getRandomColor();
    	    			}
    	    		} else {
		        		color();
		        	}
		        drawPoints();
		    	}
		    }
		}

var cnt;
   
    function randomLines(){
    	if(newErase){
    		erase();
    		}
    	cnt = document.getElementById("randomCnt").value;
    	timedRandLines();
    }
    
    function randomScatter(){
    	if(newErase){
    		erase();
    		}
    	cnt = document.getElementById("randomCnt").value;
    	timedRandScatter();
    }
    
    function randomWalk(){
    	currX = w/2;
    	currY = h/2;
    	walkSize = document.getElementById("randomStep").value;
    		if(newErase){
    			erase();
    			}
    		cnt = document.getElementById("randomCnt").value;
			timedRandWalk();    	
    		}
    
var Q = 10;

	function colorLength(){
		Q = document.getElementById("colorLength").value;
	}   
