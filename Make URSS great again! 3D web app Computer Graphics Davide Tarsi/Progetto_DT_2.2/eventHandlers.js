
//*****************************************************************************************************************
// MOUSE EVENTS
//*****************************************************************************************************************

var mouseDown=function(e) {
	drag=true;
	cameraLibera = true;
	old_x=e.pageX, old_y=e.pageY;
	e.preventDefault();
	return false;
};

var mouseUp=function(e){
	drag=false;
	cameraLibera = false;
};

var mouseMove=function(e) {
	if (!drag) return false; 
	dX=-(e.pageX-old_x)*2*Math.PI/canvas.width; 
	dY=-(e.pageY-old_y)*2*Math.PI/canvas.height; 
	
	settings.THETA+=dX;
	settings.PHI+=dY;
	old_x=e.pageX, old_y=e.pageY; 
	e.preventDefault();
	
	render(time);
	
};

//*****************************************************************************************************************
// KEYBOARD EVENTS
//*****************************************************************************************************************

function doKeyDown(e){
	if (e.keyCode == 87){
		key[0]=true; 	// THE W KEY
	} 
	if (e.keyCode == 83){
		key[2]=true; 	// THE S KEY
	} 
	if (e.keyCode == 65){
		key[1]=true; 	// THE A KEY	
	} 
	if (e.keyCode == 68){
		key[3]=true; 	// THE D KEY
	} 
	if (e.keyCode == 32){
		key[4]=true; 	// THE BAR SPACE	
	} 
}

function doKeyUp(e){
	if (e.keyCode == 87){
		key[0]=false; 	// THE W KEY
	} 
	if (e.keyCode == 83){
		key[2]=false; 	// THE S KEY	
	} 
	if (e.keyCode == 65){
		key[1]=false; 	// THE A KEY
	} 
	if (e.keyCode == 68){
		key[3]=false; 	// THE D KEY	
	} 
	if (e.keyCode == 32){
		key[4]=false; 	// THE BAR SPACE	
	}
}


//*****************************************************************************************************************
// MOBILE EVENTS
//*****************************************************************************************************************


function doTouchstart(e){
    console.log(e);
    if (pressed === "ButtonW"){
        key[0]=true;    // THE W KEY
    } 
    if (pressed === "ButtonS"){
        key[2]=true;    // THE S KEY  
    } 
    if (pressed === "ButtonA"){
        key[1]=true;    // THE A KEY   
    } 
    if (pressed === "ButtonD"){
        key[3]=true;    // THE D KEY  
    } 
}
function doTouchend(e){
    if (pressed === "ButtonW"){
		pressed = "";
        key[0]=false;   // THE W KEY
    } 
    if (pressed === "ButtonS"){
		pressed = "";
        key[2]=false;   // THE S KEY    
    } 
    if (pressed === "ButtonA"){
		pressed = "";
        key[1]=false;   // THE A KEY
    } 
    if (pressed === "ButtonD"){
		pressed = "";
        key[3]=false;   // THE D KEY    
    } 
	if (pressed === "ButtonDelivery"){
		pressed = "";
        key[4]=false;    // THE BAR SPACE	
    }
}
