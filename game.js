var RENDERING_MODE = 'Canvas';
var GAME_FONT = '"Gorditas", cursive';
var SCREEN_WIDTH = 640;
var SCREEN_HEIGHT = 480;
var	world, PTM_RATIO = 32;

var GAME_PROPERTIES = {
	PLANT_TYPES: 		[ 'tomato', 'potato', 'carrot', 'artichoke', 'pepper', 'zuchini', 'corn' ],
	BACKPACK_SLOTS:		5,
	MAX_SPELLS:			8,
}

var g_playerProps = {
	backpack: [],
	spells: new Array(8),
	//spells: [{ type: 'spell', name: 'fireball', count: 1 },{ type: 'spell', name: 'iceball', count: 1 }],
	selectedSpell: 1,
};

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
	
	initHUD();
	
	testInventory();
	//Load first scene
	console.log("Run scene:main")
	Crafty.scene("main");
}

function testInventory(){

	var icon = g_hud['icon_' + GAME_PROPERTIES.PLANT_TYPES[1]];
	//Check if this item is the invenory to increase the counter
	if (icon.gameProps.loc) { 
		g_playerProps[icon.gameProps.loc][icon.gameProps.slot].count++;
			//plants[0].obj.destroy();
			reOrderBackpack();
			return;								
	}

	// put it in inventory
	for (var i=0;i<GAME_PROPERTIES.BACKPACK_SLOTS;i++) {
		if (!g_playerProps.backpack[i]) {
			g_playerProps.backpack[i] = { type: 'plant', plantType: GAME_PROPERTIES.PLANT_TYPES[1], count: 1 };
			//plants[0].obj.destroy();
			reOrderBackpack();
			return;
		}
	}
	alert ('pack full');
}
