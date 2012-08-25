var RENDERING_MODE = 'Canvas';
var SCREEN_WIDTH = 800;
var SCREEN_HEIGHT = 600;
var	world, PTM_RATIO = 32;

window.onload = function(){
	
	Crafty.init(SCREEN_WIDTH,SCREEN_HEIGHT);
	
	Crafty.background("#00ffff");
    Crafty.canvas.init();
	//Init the box2d world, gx = 0, gy = 0
	Crafty.box2D.init(0, 0, PTM_RATIO, true);
	world = Crafty.box2D.world;
	console.log("Box2d initialized");
	
	initCraftyComponents();
	initScenes();
	
	//Load initial scene
}
