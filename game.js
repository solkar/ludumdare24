var RENDERING_MODE = 'Canvas';
var SCREEN_WIDTH = 640;
var SCREEN_HEIGHT = 480;
var	world, PTM_RATIO = 32;

window.onload = function(){
	
	Crafty.init(SCREEN_WIDTH,SCREEN_HEIGHT);
	
	Crafty.background("#00ffff");
    Crafty.canvas.init();
	//Init the box2d world, gx = 0, gy = 0
	Crafty.box2D.init(0, 0, PTM_RATIO, true);
	world = Crafty.box2D.world;
	Crafty.box2D.showDebugInfo();   	//Start the Box2D debugger
	console.log("Box2d initialized");
	
	initCraftyComponents();
	initScenes();
	
	//Load first scene
	console.log("Run scene:main")
	Crafty.scene("main");
}
