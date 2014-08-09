$(document).ready(function() {

    var threads_canvas = document.getElementById("gravity-layer");
//    var threads_width = parseInt(threads_canvas.style.width);
//    var threads_height = parseInt(threads_canvas.style.height);
//    alert(threads_height)
//    var threads_dpr = window.devicePixelRatio || 1;
//    threads_canvas.width = threads_width*threads_dpr;
//    threads_canvas.height = threads_height*threads_dpr;
    threads_canvas.getContext("2d");
    threads_height = 1000;
    threads_width = 1300;
    // simulation
    var threads_sim = new VerletJS(threads_width, threads_height, threads_canvas);
    threads_sim.friction = 0.4;
    threads_sim.gravity = new Vec2(0,0.55);

    var threads_points = [];
    var threads_pin_pos = new Vec2(0,0);
    var thread_active = false;
    var current_thread = [];
    var thread_color = "0,0,0"


    function make_point(startX,startY) {
	match = false;
	x = startX + Math.floor((Math.random()*13));
	y = startY + Math.floor((Math.random()*13));
	for(xx in threads_points) {
	    if(threads_points[xx].x == x && threads_points[xx].y == y) {
		match = true;
	    };
	};
	if(match==false) {
	    threads_points.push(new Vec2(x,y))
	} else {
	    make_point(startX,startY);
	};
    };

    function create_thread(startX,startY,type) {
	threads_points = [];
	i = 0;
	if(type=='start') {
	    alert("start")
	    while(i<40) {
		make_point(startX,startY);
		i = i +1;
	    };
	    anchor = ["#start-knot"];
	} else if (type=='tangled') {
	    alert("tangled")
	    while(i<40) {
		make_point(startX,startY);
		i = i +1;
		anchor = ["#landing-anchor"];
	    };
	} else {
	    alert("")
	    while(i<40) {
		threads_points.push(new Vec2(startX+i,startY));
		i = i +1;
	    };
	    anchor = [];
	};

	threads_segment = threads_sim.lineSegments(threads_points, 0.6, [thread_color,1]);
	threads_pin = threads_segment.pin(0, new Vec2(startX,startY));
	i = 0;
	thread_pin_2 = threads_segment.pin(1, new Vec2(startX+1,startY+1));
	current_thread = {"line":threads_segment, "pins":[threads_pin, thread_pin_2], "anchors":anchor};
	threads_points = [];
    };

    create_thread(500,0,'none');

    var loop = function() {	    
	threads_sim.frame(16);
	threads_sim.draw();
	requestAnimFrame(loop);
    };
    
    loop();
});