var RENDERING_MODE = 'Canvas';
var GAME_FONT = '"Gorditas", cursive';
var SCREEN_WIDTH = 640,
	SCREEN_HEIGHT = 480,
	FONT_BLUE_BUBBLE = "http://starmelt.github.com/craftyjstut/img/BlueBubbleFont.png",
	world, PTM_RATIO = 32;

var ACTIVE_WIDTH = SCREEN_WIDTH,
	ACTIVE_HEIGHT = SCREEN_HEIGHT*0.75;

var GAME_PROPERTIES = {
	PLANT_TYPES: 		[ 'tomato', 'potato', 'carrot', 'artichoke', 'pepper', 'zuchini', 'corn'],
	BACKPACK_SLOTS:		5,
	MAX_SPELLS:			8,
	ITEM_TYPES: ['sheep','wool','jersey','log','plank','guitar']
//	{
//		wolf: ['sheep','wool','jersey'],
//		door: ['ore', 'iron', 'key']
//	}
}

var g_playerProps = {
	backpack: [],
	selectedItem: 0,
};

window.onload = function(){
	
	Crafty.init(SCREEN_WIDTH,SCREEN_HEIGHT);
	
	Crafty.modules('http://cdn.craftycomponents.com/', { SpriteText: 'dev' }, 
		function () {
   		 Crafty.load([FONT_BLUE_BUBBLE]);
   });
	
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
	
	//pushWolfItem();
	//Load first scene
	console.log("Run scene:main")
	Crafty.scene("main");
}

function pushWolfItem(){
	for (var i=0; i<GAME_PROPERTIES.BACKPACK_SLOTS;i++){
		if(!g_playerProps.backpack[i]){
			g_playerProps.backpack[i] = { type: 'item', itemType: GAME_PROPERTIES.ITEM_TYPES[0], count: 1 };
			reOrderBackpack();
			return;
		}
	}
}

function addItemToBackpack(itemName){
	var icon = g_hud['icon_' + itemName];
	//Check if this item is the invenory to increase the counter
	if (icon.gameProps.loc) { 
		g_playerProps[icon.gameProps.loc][icon.gameProps.slot].count++;
			//plants[0].obj.destroy();
			reOrderBackpack();
			return;								
	}
	
	
	for (var i=0; i<GAME_PROPERTIES.BACKPACK_SLOTS;i++){
		if(!g_playerProps.backpack[i]){
			g_playerProps.backpack[i] = { type: 'item', itemType: itemName, count: 1 };
			reOrderBackpack();
			return;
		}
	}
}
