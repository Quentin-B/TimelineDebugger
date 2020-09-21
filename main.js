function TLDebugger(){
	this.keys = [];
	this.FPS = 60;
	this.FRAME_DURATION = 1 / this.FPS;
	this.ENTER_KEY   = 13;
	this.SPACE_KEY   = 32;
	this.LEFT_ARROW  = 37;
	this.UP_ARROW    = 38;
	this.RIGHT_ARROW = 39;
	this.DOWN_ARROW  = 40;
	this.PLUS_KEY    = 107;
	this.MINUS_KEY   = 109;
	this.ZERO        = 96;
	this.ONE         = 97;
	this.TWO         = 98;
	this.THREE       = 99;
	this.FOUR        = 100;
	this.FIVE        = 101;
	this.SIX         = 102;
	this.SEVEN       = 103;
	this.EIGHT       = 104;
	this.NINE        = 105;

	this.bt_resume     = document.getElementById("bt_resume");
	this.bt_arrow_up   = document.getElementById("bt_arrow_up");       
	this.bt_arrow_left = document.getElementById("bt_arrow_left");         
	this.bt_arrow_down = document.getElementById("bt_arrow_down");         
	this.bt_arrow_right= document.getElementById("bt_arrow_right");   

	this.bt_minus      = document.getElementById("bt_minus");
	this.bt_plus       = document.getElementById("bt_plus");  
	this.bt_end        = document.getElementById("bt_end"); 
	this.bt_repeat     = document.getElementById("bt_repeat");        
	     
	this.bt_9          = document.getElementById("bt_9"); 
	this.bt_8          = document.getElementById("bt_8"); 
	this.bt_7          = document.getElementById("bt_7");  
	this.bt_6          = document.getElementById("bt_6"); 
	this.bt_5          = document.getElementById("bt_5"); 
	this.bt_4          = document.getElementById("bt_4");   
	this.bt_3          = document.getElementById("bt_3"); 
	this.bt_2          = document.getElementById("bt_2"); 
	this.bt_1          = document.getElementById("bt_1"); 
 
	this.TLDContainer  = document.getElementById("TLDContainer");

	this.timelineParent = window.banner;

	gsap.registerPlugin(Draggable);
}

/*

██╗███╗   ██╗██╗████████╗██╗ █████╗ ████████╗ ██████╗ ██████╗ ███████╗
██║████╗  ██║██║╚══██╔══╝██║██╔══██╗╚══██╔══╝██╔═══██╗██╔══██╗██╔════╝
██║██╔██╗ ██║██║   ██║   ██║███████║   ██║   ██║   ██║██████╔╝███████╗
██║██║╚██╗██║██║   ██║   ██║██╔══██║   ██║   ██║   ██║██╔══██╗╚════██║
██║██║ ╚████║██║   ██║   ██║██║  ██║   ██║   ╚██████╔╝██║  ██║███████║
╚═╝╚═╝  ╚═══╝╚═╝   ╚═╝   ╚═╝╚═╝  ╚═╝   ╚═╝    ╚═════╝ ╚═╝  ╚═╝╚══════╝

*/

TLDebugger.prototype.initOverlay = function() {
	// if(typeof temple.banner == "undefined" || typeof temple.banner.banner == "undefined")
	// 	return;

	if(typeof this.timelineParent === "undefined")
		return;

	this.timelineContainer 	= document.querySelector('#timelineContainer');
	this.infoCurrentTL		= document.querySelector('#infoCurrentTL');
	this.infoTimeScale		= document.querySelector('#infoTimeScale');
	this.infoNumberTL		= document.querySelector('#infoNumberTL');
	this.infoCurrentTime	= document.querySelector('#infoCurrentTime');
	this.infoDurationTL		= document.querySelector('#infoDurationTL');

	this.varRemoveListeners	= this.removeListeners.bind(this);
	this.varKeysPressed		= this.keysPressed.bind(this);
	this.varKeysReleased	= this.keysReleased.bind(this);

	this.varBt_resumeHandler 		= this.bt_resumeHandler.bind(this);
	this.varBt_arrow_upHandler 		= this.bt_arrow_upHandler.bind(this);
	this.varBt_arrow_leftHandler 	= this.bt_arrow_leftHandler.bind(this);
	this.varBt_arrow_downHandler 	= this.bt_arrow_downHandler.bind(this);
	this.varBt_arrow_rightHandler 	= this.bt_arrow_rightHandler.bind(this);
	this.varBt_9Handler 			= this.bt_9Handler.bind(this);
	this.varBt_8Handler 			= this.bt_8Handler.bind(this);
	this.varBt_7Handler 			= this.bt_7Handler.bind(this);
	this.varBt_6Handler 			= this.bt_6Handler.bind(this);
	this.varBt_5Handler 			= this.bt_5Handler.bind(this);
	this.varBt_4Handler 			= this.bt_4Handler.bind(this);
	this.varBt_3Handler 			= this.bt_3Handler.bind(this);
	this.varBt_2Handler 			= this.bt_2Handler.bind(this);
	this.varBt_1Handler 			= this.bt_1Handler.bind(this);
	this.varBt_repeatHandler 		= this.bt_repeatHandler.bind(this);
	this.varBt_minusHandler 		= this.bt_minusHandler.bind(this);
	this.varBt_plusHandler 			= this.bt_plusHandler.bind(this);
	this.varBt_endHandler 			= this.bt_endHandler.bind(this);
	this.varTickerHandler			= this.tickerHandler.bind(this);

	window.addEventListener('remove_listeners', this.varRemoveListeners);
	window.addEventListener('keydown', this.varKeysPressed);
	window.addEventListener('keyup', this.varKeysReleased);

	this.bannerTLs = this.getBannerTLs();
	TweenMax.set(TLDContainer,{height: (150+30*this.bannerTLs.length)});

	this.initSliders();

	this.updateCurrentTL();

	this.bt_resume     .addEventListener('click', this.varBt_resumeHandler);
	this.bt_arrow_up   .addEventListener('click', this.varBt_arrow_upHandler);
	this.bt_arrow_left .addEventListener('click', this.varBt_arrow_leftHandler);
	this.bt_arrow_down .addEventListener('click', this.varBt_arrow_downHandler);
	this.bt_arrow_right.addEventListener('click', this.varBt_arrow_rightHandler);

	this.bt_9          .addEventListener('click', this.varBt_9Handler);
	this.bt_8          .addEventListener('click', this.varBt_8Handler);
	this.bt_7          .addEventListener('click', this.varBt_7Handler);
	this.bt_6          .addEventListener('click', this.varBt_6Handler);
	this.bt_5          .addEventListener('click', this.varBt_5Handler);
	this.bt_4          .addEventListener('click', this.varBt_4Handler);
	this.bt_3          .addEventListener('click', this.varBt_3Handler);
	this.bt_2          .addEventListener('click', this.varBt_2Handler);
	this.bt_1          .addEventListener('click', this.varBt_1Handler);

	this.bt_repeat     .addEventListener('click', this.varBt_repeatHandler);
	this.bt_minus      .addEventListener('click', this.varBt_minusHandler);
	this.bt_plus       .addEventListener('click', this.varBt_plusHandler);
	this.bt_end        .addEventListener('click', this.varBt_endHandler);

	

	// gsap.ticker.addEventListener("tick", this.varTickerHandler, this.currentTL, true, 1);
	gsap.ticker.add(this.varTickerHandler);

    // Draggable.create("#TLDContainer", {type:"x,y", edgeResistance:0.65, throwProps:true});
}

TLDebugger.prototype.removeListeners = function removeListeners(e) {
	window.removeEventListener('remove_listeners', this.varRemoveListeners);
	window.removeEventListener('keydown', this.varKeysPressed);
    window.removeEventListener('keyup', this.varKeysReleased);

    this.bt_resume     .removeEventListener('click', this.varBt_resumeHandler);
	this.bt_arrow_up   .removeEventListener('click', this.varBt_arrow_upHandler);
	this.bt_arrow_left .removeEventListener('click', this.varBt_arrow_leftHandler);
	this.bt_arrow_down .removeEventListener('click', this.varBt_arrow_downHandler);
	this.bt_arrow_right.removeEventListener('click', this.varBt_arrow_rightHandler);
	this.bt_9          .removeEventListener('click', this.varBt_9Handler);
	this.bt_8          .removeEventListener('click', this.varBt_8Handler);
	this.bt_7          .removeEventListener('click', this.varBt_7Handler);
	this.bt_6          .removeEventListener('click', this.varBt_6Handler);
	this.bt_5          .removeEventListener('click', this.varBt_5Handler);
	this.bt_4          .removeEventListener('click', this.varBt_4Handler);
	this.bt_3          .removeEventListener('click', this.varBt_3Handler);
	this.bt_2          .removeEventListener('click', this.varBt_2Handler);
	this.bt_1          .removeEventListener('click', this.varBt_1Handler);
	this.bt_repeat     .removeEventListener('click', this.varBt_repeatHandler);
	this.bt_minus      .removeEventListener('click', this.varBt_minusHandler);
	this.bt_plus       .removeEventListener('click', this.varBt_plusHandler);
	this.bt_end        .removeEventListener('click', this.varBt_endHandler);

	gsap.ticker.remove(this.varTickerHandler);

	window.dispatchEvent(new CustomEvent('listeners_removed'));
}

TLDebugger.prototype.initSliders = function(){
	for(var timeline in this.bannerTLs){
		var rowOpenDiv = this.stringToNode("<div class='row-slider' id='rowslider"+this.bannerTLs[timeline].name+"'></div>");
		this.timelineContainer.appendChild(rowOpenDiv);
		
		var nameDiv = this.stringToNode("<div class='name-tl regular'><div class='nameTLSpot'></div>" + this.bannerTLs[timeline].name + "</div>");
		var rowslider = document.querySelector("#rowslider"+this.bannerTLs[timeline].name);
		rowslider.appendChild(nameDiv);

		var tlDiv = this.stringToNode("<div class='custom-slider-container'></div>");
		tlDiv.id="slider"+timeline;
		this.bannerTLs[timeline].sliderID = "slider"+timeline;

		// Make a new scrubber
		var scrubber = new ScrubberView();
		this.bannerTLs[timeline].scrubber = scrubber;
		scrubber.numTL = timeline;
		tlDiv.appendChild(scrubber.elt);
		scrubber.onValueChanged = function (value) {
			tlDebugger.updateCurrentTL(tlDebugger.bannerTLs[this.numTL]);			
			tlDebugger.bannerTLs[this.numTL].progress(value).pause();
		}

		// Insert labels spots
		for(var label in this.bannerTLs[timeline]._labels){
			progressVal = this.bannerTLs[timeline]._labels[label] / this.bannerTLs[timeline].duration() * 100;
	        var labelSpotDiv = this.stringToNode('<div class="label-spot" data-label="'+ label +'" title="' + label + " = " + this.bannerTLs[timeline]._labels[label] + '"></div>');
	        labelSpotDiv.style.marginLeft = "calc("+progressVal+"% - 4px)";
	        tlDiv.appendChild(labelSpotDiv);
		}
		rowslider.appendChild(tlDiv);	
	}

	let nameLT = document.querySelectorAll(".name-tl")
	
	if(nameLT) {
		for(var i = 0 ; i < nameLT.length ; i++){
			nameLT[i].addEventListener("click",this.nameTLClickHandler.bind(this));	
		}
	}

	let labelSpot = document.querySelectorAll(".label-spot")

	if(labelSpot)
		for(var i = 0 ; i < labelSpot.length ; i++){
			labelSpot[i].addEventListener("click",this.labelSpotClickHandler.bind(this));	
		}

	this.updateActiveSpots();
}
/*

██╗      ██████╗  ██████╗ ██╗ ██████╗
██║     ██╔═══██╗██╔════╝ ██║██╔════╝
██║     ██║   ██║██║  ███╗██║██║
██║     ██║   ██║██║   ██║██║██║
███████╗╚██████╔╝╚██████╔╝██║╚██████╗
╚══════╝ ╚═════╝  ╚═════╝ ╚═╝ ╚═════╝

*/
TLDebugger.prototype.updateActiveSpots = function(){
	if(!this.currentTL)
		return;

	let currentRow =  document.querySelector("#rowslider"+this.currentTL.name);
	let currentNameTLSpots = currentRow.querySelectorAll(".nameTLSpot");
	let currentLabelSpots = currentRow.querySelectorAll("div.custom-slider-container div.label-spot");
	let nameTLSpot = document.querySelectorAll(".nameTLSpot")
	let labelSpot = document.querySelectorAll(".labelSpot")

	if(nameTLSpot.length > 0)
		TweenMax.set(".nameTLSpot", { className: "-=active"});
	if(labelSpot.length > 0)
		TweenMax.set(".label-spot", { className: "-=active"});

	if(currentLabelSpots.length > 0)
		TweenMax.set(currentLabelSpots, { className: "+=active"});	
	if(currentNameTLSpots.length > 0)
		TweenMax.set(currentNameTLSpots, { className: "+=active"});	
}

TLDebugger.prototype.getBannerTLs = function() {
	this.bannerTLs = new Array();
	for(var propertyName in this.timelineParent) {
		if( (this.timelineParent[propertyName] instanceof TimelineMax) ||
			(this.timelineParent[propertyName] instanceof TimelineLite) ){
			this.timelineParent[propertyName].name = propertyName;
			this.bannerTLs.push(this.timelineParent[propertyName]);
		}
	}   
	return this.bannerTLs;
}

TLDebugger.prototype.updateCurrentTL = function(newTimeline){
	if(!newTimeline){ 
		newTimeline = this.getBannerTLs()[0];
	}	
	this.currentTL = newTimeline;
	this.updateGUI();
	this.updateActiveSpots();
	return this.currentTL;
}

TLDebugger.prototype.updateGUI = function(){
	try {
		this.infoCurrentTL.innerHTML = (this.currentTL.name);
		this.infoTimeScale.innerHTML = (this.currentTL.timeScale());
		this.infoNumberTL.innerHTML = (this.getBannerTLs().length);
		this.infoCurrentTime.innerHTML = (this.round(this.currentTL._time,2));
		this.infoDurationTL.innerHTML = (this.round(this.currentTL.duration(),2));
	} catch(err) {
	    // Can trigger an error if listener are not ready
	    // Can be ignored
	}
}

/*

███████╗██╗   ██╗███████╗███╗   ██╗████████╗    ██╗  ██╗ █████╗ ███╗   ██╗██████╗ ██╗     ███████╗██████╗ ███████╗
██╔════╝██║   ██║██╔════╝████╗  ██║╚══██╔══╝    ██║  ██║██╔══██╗████╗  ██║██╔══██╗██║     ██╔════╝██╔══██╗██╔════╝
█████╗  ██║   ██║█████╗  ██╔██╗ ██║   ██║       ███████║███████║██╔██╗ ██║██║  ██║██║     █████╗  ██████╔╝███████╗
██╔══╝  ╚██╗ ██╔╝██╔══╝  ██║╚██╗██║   ██║       ██╔══██║██╔══██║██║╚██╗██║██║  ██║██║     ██╔══╝  ██╔══██╗╚════██║
███████╗ ╚████╔╝ ███████╗██║ ╚████║   ██║       ██║  ██║██║  ██║██║ ╚████║██████╔╝███████╗███████╗██║  ██║███████║
╚══════╝  ╚═══╝  ╚══════╝╚═╝  ╚═══╝   ╚═╝       ╚═╝  ╚═╝╚═╝  ╚═╝╚═╝  ╚═══╝╚═════╝ ╚══════╝╚══════╝╚═╝  ╚═╝╚══════╝

*/

TLDebugger.prototype.tickerHandler = function(event) {
	for(var timeline in this.bannerTLs){
		try {
		    this.bannerTLs[timeline].scrubber.value(this.bannerTLs[timeline].progress(),false);
		    this.updateGUI();
		}
		catch(err) {
		    // Can trigger an error if listener are not ready
		    // Can be ignored
		}
	}
}

TLDebugger.prototype.endFrame = function(){
	this.currentTL.progress(1, false).pause();
}

TLDebugger.prototype.resumePause = function(){
	if(this.currentTL.reversed() && this.currentTL.time()==0){
		this.currentTL.play();
		console.debug("TimeLine Debugger | ","Resumed");
		return;
	}

	if(!this.currentTL.paused()){
		this.currentTL.pause();
		console.debug("TimeLine Debugger | ","Paused");
	}
	else{
		this.currentTL.resume();
		console.debug("TimeLine Debugger | ","Resumed");
	}
}

TLDebugger.prototype.previousFrame = function(){
	this.currentTL.pause();
	
	if((this.currentTL.time()-this.FRAME_DURATION) > 0)
		this.currentTL.time(this.currentTL.time()-this.FRAME_DURATION);
	else
		this.currentTL.time(0);
}

TLDebugger.prototype.nextFrame = function(){    
	this.currentTL.pause();

	if((this.currentTL.time()+this.FRAME_DURATION) < this.currentTL.duration())
		this.currentTL.time(this.currentTL.time()+this.FRAME_DURATION);
	else
		this.currentTL.time(this.currentTL.duration());
}

TLDebugger.prototype.playForward = function(){
	this.currentTL.play();     
}

TLDebugger.prototype.playBackward = function(){
	this.currentTL.reverse();  
}

TLDebugger.prototype.speedUp = function(){
	var val = this.round(this.currentTL._timeScale+0.1,2);
	this.currentTL.timeScale(val);
}

TLDebugger.prototype.slowDown = function(){
	var val = this.round(this.currentTL._timeScale-0.1,2);
	this.currentTL.timeScale(val);
}

TLDebugger.prototype.keysPressed = function keysPressed(e) {
	// store an entry for every key pressed
	this.keys[e.keyCode] = true;

	if(typeof this.currentTL === 'undefined'){ 
		this.updateCurrentTL();
	}

	// Enter = End screen
	if(this.keys[this.ENTER_KEY]) {
		this.bt_end.classList.add("active");
		this.bt_endHandler();
		e.preventDefault();
	}

	// Space = Pause/Play
	if(this.keys[this.SPACE_KEY]) {
		this.bt_resume.classList.add("active");
		this.bt_resumeHandler();
		e.preventDefault();
	}

	// Left Arrow = -1 Frame
	if(this.keys[this.LEFT_ARROW]) {
		this.bt_arrow_left.classList.add("active");
		this.bt_arrow_leftHandler();
		e.preventDefault(); 
	}

	// Right Arrow = +1 Frame
	if(this.keys[this.RIGHT_ARROW]) {
		this.bt_arrow_right.classList.add("active");
		this.bt_arrow_rightHandler();
		e.preventDefault(); 
	}

	// Up Arrow = Play Forward
	if(this.keys[this.UP_ARROW]) {
		this.bt_arrow_up.classList.add("active");
		this.bt_arrow_upHandler();
		e.preventDefault();
	}

	// Down Arrow = Reverse timeline
	if(this.keys[this.DOWN_ARROW]) {   
		this.bt_arrow_down.classList.add("active");
		this.bt_arrow_downHandler();
		e.preventDefault(); 
	}

	// + Key ( NumPad ) = Speed Up
	if(this.keys[this.PLUS_KEY]) {   
		this.bt_plus.classList.add("active");
		this.bt_plusHandler();
		e.preventDefault(); 
	}

	// - Key ( NumPad ) = Slow Down
	if(this.keys[this.MINUS_KEY]) {
		this.bt_minus.classList.add("active");
		this.bt_minusHandler();
		e.preventDefault(); 
	}

	// 0 Key = Restart
	if (this.keys[this.ZERO]){
		this.bt_repeat.classList.add("active");
		this.bt_repeatHandler();
		e.preventDefault(); 
	}

	// 1-9 Key ( NumPad ) = Advance to X seconds
	if (this.keys[this.ONE]){
		this.bt_1.classList.add("active");
		this.bt_1Handler();
		e.preventDefault();
	}  
	if (this.keys[this.TWO]){
		this.bt_2.classList.add("active");
		this.bt_2Handler();
		e.preventDefault();
	}  
	if (this.keys[this.THREE]){
		this.bt_3.classList.add("active");
		this.bt_3Handler();
		e.preventDefault();
	}  
	if (this.keys[this.FOUR]){
		this.bt_4.classList.add("active");
		this.bt_4Handler();
		e.preventDefault();
	}  
	if (this.keys[this.FIVE]){
		this.bt_5.classList.add("active");
		this.bt_5Handler();
		e.preventDefault();
	}  
	if (this.keys[this.SIX]){
		this.bt_6.classList.add("active");
		this.bt_6Handler();
		e.preventDefault();
	}  
	if (this.keys[this.SEVEN]){
		this.bt_7.classList.add("active");
		this.bt_7Handler();
		e.preventDefault();
	}  
	if (this.keys[this.EIGHT]){
		this.bt_8.classList.add("active");
		this.bt_8Handler();
		e.preventDefault();
	}  
	if (this.keys[this.NINE]){
		this.bt_9.classList.add("active");
		this.bt_9Handler();
		e.preventDefault();
	}    

	this.updateGUI();
}

TLDebugger.prototype.keysReleased = function keysReleased(e) {
	// mark keys that were released
	this.keys[e.keyCode] = false;

	// Enter = End screen
	if(!this.keys[this.ENTER_KEY]) {
		this.bt_end.classList.remove("active");
	}

	// Space = Pause/Play
	if(!this.keys[this.SPACE_KEY]) {
		this.bt_resume.classList.remove("active");
	}

	// Left Arrow = -1 Frame
	if(!this.keys[this.LEFT_ARROW]) {
		this.bt_arrow_left.classList.remove("active");
	}

	// Right Arrow = +1 Frame
	if(!this.keys[this.RIGHT_ARROW]) {
		this.bt_arrow_right.classList.remove("active");
	}

	// Up Arrow = Play Forward
	if(!this.keys[this.UP_ARROW]) {
		this.bt_arrow_up.classList.remove("active");
	}

	// Down Arrow = Reverse timeline
	if(!this.keys[this.DOWN_ARROW]) {   
		this.bt_arrow_down.classList.remove("active");
	}

	// + Key ( NumPad ) = Speed Up
	if(!this.keys[this.PLUS_KEY]) {   
		this.bt_plus.classList.remove("active");
	}

	// - Key ( NumPad ) = Slow Down
	if(!this.keys[this.MINUS_KEY]) {
		this.bt_minus.classList.remove("active");
	}

	// 0 Key = Restart
	if (!this.keys[this.ZERO]){
		this.bt_repeat.classList.remove("active");
	}

	// 1-9 Key ( NumPad ) = Advance to X seconds
	if (!this.keys[this.ONE]){
		this.bt_1.classList.remove("active");
	}  
	if (!this.keys[this.TWO]){
		this.bt_2.classList.remove("active");
	}  
	if (!this.keys[this.THREE]){
		this.bt_3.classList.remove("active");
	}  
	if (!this.keys[this.FOUR]){
		this.bt_4.classList.remove("active");
	}  
	if (!this.keys[this.FIVE]){
		this.bt_5.classList.remove("active");
	}  
	if (!this.keys[this.SIX]){
		this.bt_6.classList.remove("active");
	}  
	if (!this.keys[this.SEVEN]){
		this.bt_7.classList.remove("active");
	}  
	if (!this.keys[this.EIGHT]){
		this.bt_8.classList.remove("active");
	}  
	if (!this.keys[this.NINE]){
		this.bt_9.classList.remove("active");
	}
}

TLDebugger.prototype.bt_resumeHandler = function(){
	this.resumePause();
}

TLDebugger.prototype.bt_arrow_upHandler = function(){
	this.playForward();
	console.debug("TimeLine Debugger | ","Play");
}

TLDebugger.prototype.bt_arrow_leftHandler = function(){
	this.previousFrame(); 
	console.debug("TimeLine Debugger | ","Previous Frame");
}

TLDebugger.prototype.bt_arrow_downHandler = function(){
	this.playBackward(); 
	console.debug("TimeLine Debugger | ","Reverse");
}

TLDebugger.prototype.bt_arrow_rightHandler = function(){
	this.nextFrame(); 
	console.debug("TimeLine Debugger | ","Next Frame");
}

TLDebugger.prototype.bt_minusHandler = function(){
	this.slowDown();
	console.debug("TimeLine Debugger | ","Time Scale : " + this.currentTL._timeScale); 
}

TLDebugger.prototype.bt_9Handler = function(){
	this.currentTL.progress(0.9);
	console.debug("TimeLine Debugger | ", "Go to 90% in the timeline");
}

TLDebugger.prototype.bt_8Handler = function(){
	this.currentTL.progress(0.8);
	console.debug("TimeLine Debugger | ", "Go to 80% in the timeline");    
}

TLDebugger.prototype.bt_7Handler = function(){
	this.currentTL.progress(0.7);
	console.debug("TimeLine Debugger | ", "Go to 70% in the timeline");
}

TLDebugger.prototype.bt_plusHandler = function(){
	this.speedUp(); 
	console.debug("TimeLine Debugger | ","Time Scale : " + this.currentTL._timeScale);
}

TLDebugger.prototype.bt_6Handler = function(){
	this.currentTL.progress(0.6);
	console.debug("TimeLine Debugger | ", "Go to 60% in the timeline");
}

TLDebugger.prototype.bt_5Handler = function(){
	this.currentTL.progress(0.5);
	console.debug("TimeLine Debugger | ", "Go to 50% in the timeline");
}

TLDebugger.prototype.bt_4Handler = function(){
	this.currentTL.progress(0.4);
	console.debug("TimeLine Debugger | ", "Go to 40% in the timeline");
}

TLDebugger.prototype.bt_endHandler = function(){
	this.endFrame();
	console.debug("TimeLine Debugger | ","Last frame");
}

TLDebugger.prototype.bt_3Handler = function(){
	this.currentTL.progress(0.3);
	console.debug("TimeLine Debugger | ", "Go to 30% in the timeline");
}

TLDebugger.prototype.bt_2Handler = function(){
	this.currentTL.progress(0.2);
	console.debug("TimeLine Debugger | ", "Go to 20% in the timeline");
}

TLDebugger.prototype.bt_1Handler = function(){
	this.currentTL.progress(0.1);
	console.debug("TimeLine Debugger | ", "Go to 10% in the timeline");
}

TLDebugger.prototype.bt_repeatHandler = function(){
	this.currentTL.restart();
	console.debug("TimeLine Debugger | ","Restart"); 
}

TLDebugger.prototype.labelSpotClickHandler = function(event){
	for(var timeline in this.bannerTLs){
		if(this.bannerTLs[timeline].sliderID === event.currentTarget.offsetParent.id){
			this.updateCurrentTL(this.bannerTLs[timeline]);
			this.currentTL.seek(event.currentTarget.dataset.label);
		}
	}
}

TLDebugger.prototype.nameTLClickHandler = function(event){
	this.updateCurrentTL(this.timelineParent[event.currentTarget.innerText]);
}

TLDebugger.prototype.round = function(value, exp) {
	if (typeof exp === 'undefined' || +exp === 0)
		return Math.round(value);

	value = +value;
	exp = +exp;

	if (isNaN(value) || !(typeof exp === 'number' && exp % 1 === 0))
		return NaN;

	// Shift
	value = value.toString().split('e');
	value = Math.round(+(value[0] + 'e' + (value[1] ? (+value[1] + exp) : exp)));

	// Shift back
	value = value.toString().split('e');
	return +(value[0] + 'e' + (value[1] ? (+value[1] - exp) : -exp));
}

TLDebugger.prototype.stringToNode = function(string){
	var div = document.createElement('div');
	div.innerHTML = string;
	return div.childNodes[0];
}

var tlDebugger = new TLDebugger();
if(typeof DC != "undefined")
	DC.addEventListener( DC.events.CUSTOM_READY, tlDebugger.initOverlay.bind(tlDebugger), false );
// else
// 	temple.banner.addEventListener( temple.events.SHOW, tlDebugger.initOverlay.bind(tlDebugger), false );

tlDebugger.initOverlay();
