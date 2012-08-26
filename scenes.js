function initScenes(){
	console.log("Load scenes");
	
	Crafty.scene("main", function () {				
 		createRoomWalls();
 		
 		//Add portals
 		var portal_width = 10;
		var portal_height = 80;
		var westPortal = Crafty.e("2D, Canvas, Box2D, Portal")
			.attr({x: ACTIVE_WIDTH - 20, y: ACTIVE_HEIGHT*0.5})
			.box2d({
				bodyType: 'static',
				density: 1.0,
				friction: 10,
				restitution: 0,
				shape:
				[[0,0], [portal_width,0],
				[portal_width, portal_height], [0, portal_height]]
		})
		.targetRoom("wolfRoom");
 		
 		//place player
 		var player =  Crafty.e("Player");
 		
 		//Place gun charge chamber
 		var chamber = Crafty.e("Chamber, dragon");
 		
 		
 		
	 });
	 
	 Crafty.scene("wolfRoom", function () {				
 		createRoomWalls();
 		
 		//Add portals
 		var portal_width = 10;
		var portal_height = 80;
		var westPortal = Crafty.e("2D, Canvas, Box2D, Portal")
			.attr({x: 10, y: ACTIVE_HEIGHT/2})
			.box2d({
				bodyType: 'static',
				density: 1.0,
				friction: 10,
				restitution: 0,
				shape:
				[[0,0], [portal_width,0],
				[portal_width, portal_height], [0, portal_height]]
		})
		.targetRoom("main");
		
		var eastPortal = Crafty.e("2D, Canvas, Box2D, Portal")
			.attr({x: ACTIVE_WIDTH - 20, y: ACTIVE_HEIGHT/2})
			.box2d({
				bodyType: 'static',
				density: 1.0,
				friction: 10,
				restitution: 0,
				shape:
				[[0,0], [portal_width,0],
				[portal_width, portal_height], [0, portal_height]]
		})
		.targetRoom("nexRoom");
 		
 		//place player
 		var player =  Crafty.e("Player");
 						
 		
 		//TextBox
 		var textSize = 16,
        	initX = SCREEN_WIDTH*0.1,
            initY = SCREEN_HEIGHT - 40;
 		var shoutBox1 = Crafty.e("2D, Canvas, SpriteText")
 										.attr({x: initX, y: initY, w: 48*textSize, h: textSize})
										.registerFont("BlueBubble", textSize, FONT_BLUE_BUBBLE);
		var shoutBox2 = Crafty.e("2D, Canvas, SpriteText")
 										.attr({x: initX, y: initY+5+textSize*1, w: 48*textSize, h: textSize})
										.registerFont("BlueBubble", textSize, FONT_BLUE_BUBBLE);
								
		var shoutBox3 = Crafty.e("2D, Canvas, SpriteText")
 										.attr({x: initX, y: initY+5+textSize*2, w: 48*textSize, h: textSize})
										.registerFont("BlueBubble", textSize, FONT_BLUE_BUBBLE);

 		
 		//Add log item
		var sheep = Crafty.e("2D, Canvas, Color, Box2D, sheepSprite")
 					.color("#00a")
 					.attr({
 						x: ACTIVE_WIDTH*0.3,
 						y: ACTIVE_HEIGHT*0.8,
 						w: 80,
 						h: 80		
 					})
 					.box2d({
						bodyType: 'static',
						density : 1.0,
						friction : 2,
						restitution : 0.2,
						shape:
							[[0,0], [80,0],
							[80, 80], [0, 80]],
						//Filtering data
						categoryBits: 0x0001,
						maskBits: 0xfffd,
						//groupIndex: 0,							
					})
					.onContact("Player", 
								function(data){

									//Add log to player backpack
									var player = data[0].obj;
									addItemToBackpack('sheep');
								
                        			shoutBox1.text("You picked a sheep");
                        			
                        			//Remove log from the map
                        			world.DestroyBody(this.body);
                        			this.destroy();
                        		
					});
					
 		//Place wolf
 		var wolf = Crafty.e("2D, Canvas, Color, Box2D, wolf")
 					.color("#0000ff")
 					.attr({
 						x: ACTIVE_WIDTH*0.80,
 						y: 10,
 						w: 80,
 						h: 80		
 					})
 					.box2d({
						bodyType: 'static',
						density : 1.0,
						friction : 2,
						restitution : 0.2,
						shape:
							[[0,0], [160,0],
							[160, ACTIVE_HEIGHT], [0, ACTIVE_HEIGHT]],
						//Filtering data
						categoryBits: 0x0001,
						maskBits: 0xfffd,
						//groupIndex: 0,							
					})
					.onContact("Player", 
								function(data){

									//Repel player
									var player = data[0].obj;

									//Show wolf dialog requesting a tribute
                        			shoutBox1.text("Wolf: Show me a nice tribute or");
                        			shoutBox2.text("you won't make it into next room!");

									shoutBox1.delay(function(){
										this.text("...");
									}, 5000);
									shoutBox2.delay(function(){
										this.text("...");
									}, 5000);
					})
					.bind("UseItem",function(itemName)
					{
						//shoutBox.text("");
						if(itemName == 'sheep'){
							shoutBox1.text("Wolf: Why should I want a sheep for?");
							shoutBox2.text("I'm a vegetarian!");
						}else if(itemName == 'wool'){
							shoutBox1.text("Wolf: It's cold in here");
							shoutBox2.text("but I can't wear that.");
						}else if(itemName == 'jersey'){
							shoutBox1.text("Wolf: Wow, that's just what I need!");
							shoutBox2.text("You can come in.");
							this.trigger("DestroyForceField");
						}else{
							//Get random silly quote
							shoutBox1.text("Lame");
							shoutBox2.text("...try again.");
						}
						
					})
					.bind("DestroyForceField", function(){
						world.DestroyBody(this.body);
					});
 		
	 });
	 
	  Crafty.scene("nexRoom", function () {				
 		createRoomWalls();
 		//place player
 		var player =  Crafty.e("Player");
 		
 		
 		
 		//Add portals
 		var portal_width = 80;
		var portal_height = 10;
		var northPortal = Crafty.e("2D, Canvas, Box2D, Portal")
			.attr({x: ACTIVE_WIDTH/2, y: 10})
			.box2d({
				bodyType: 'static',
				density: 1.0,
				friction: 10,
				restitution: 0,
				shape:
				[[0,0], [portal_width,0],
				[portal_width, portal_height], [0, portal_height]]
		}).targetRoom("logRoom");
		
		var portal_width = 10;
		var portal_height = 80;
		var eastPortal = Crafty.e("2D, Canvas, Box2D, Portal")
			.attr({x: ACTIVE_WIDTH-20, y: ACTIVE_HEIGHT/2})
			.box2d({
				bodyType: 'static',
				density: 1.0,
				friction: 10,
				restitution: 0,
				shape:
				[[0,0], [portal_width,0],
				[portal_width, portal_height], [0, portal_height]]
		}).targetRoom("petrozzaRoom");
 		
	 });
	 
	 Crafty.scene("logRoom", function () {				
 		createRoomWalls();
 		//place player
 		var player =  Crafty.e("Player");
 		
 		//TextBox
 		var textSize = 16,
        	initX = SCREEN_WIDTH*0.1,
            initY = SCREEN_HEIGHT - 40;
 		var shoutBox1 = Crafty.e("2D, Canvas, SpriteText")
 										.attr({x: initX, y: initY, w: 48*textSize, h: textSize})
										.registerFont("BlueBubble", textSize, FONT_BLUE_BUBBLE);
 		
 		//Add portals
 		var portal_width = 80;
		var portal_height = 10;
		var northPortal = Crafty.e("2D, Canvas, Box2D, Portal")
			.attr({x: ACTIVE_WIDTH/2, y: ACTIVE_HEIGHT-20})
			.box2d({
				bodyType: 'static',
				density: 1.0,
				friction: 10,
				restitution: 0,
				shape:
				[[0,0], [portal_width,0],
				[portal_width, portal_height], [0, portal_height]]
		}).targetRoom("nexRoom");
		
		//Add log item
		var log = Crafty.e("2D, Canvas, Color, Box2D, logSprite")
 					.color("#00a")
 					.attr({
 						x: ACTIVE_WIDTH*0.30,
 						y: ACTIVE_HEIGHT*0.2,
 						w: 80,
 						h: 80		
 					})
 					.box2d({
						bodyType: 'static',
						density : 1.0,
						friction : 2,
						restitution : 0.2,
						shape:
							[[0,0], [80,0],
							[80, 80], [0, 80]],
						//Filtering data
						categoryBits: 0x0001,
						maskBits: 0xfffd,
						//groupIndex: 0,							
					})
					.onContact("Player", 
								function(data){

									//Add log to player backpack
									var player = data[0].obj;
									addItemToBackpack('log');
								
                        			shoutBox1.text("You picked a log");
                        			
                        			//Remove log from the map
                        			world.DestroyBody(this.body);
                        			this.destroy();
                        		
					});
		
	 });
	 
	 Crafty.scene("petrozzaRoom", function () {				
 		createRoomWalls();
 		//place player
 		var player =  Crafty.e("Player");
 		
 		//TextBox
 		var textSize = 16,
        	initX = SCREEN_WIDTH*0.1,
            initY = SCREEN_HEIGHT - 40;
 		var shoutBox1 = Crafty.e("2D, Canvas, SpriteText")
 										.attr({x: initX, y: initY, w: 48*textSize, h: textSize})
										.registerFont("BlueBubble", textSize, FONT_BLUE_BUBBLE);
		var shoutBox2 = Crafty.e("2D, Canvas, SpriteText")
 										.attr({x: initX, y: initY+5+textSize*1, w: 48*textSize, h: textSize})
										.registerFont("BlueBubble", textSize, FONT_BLUE_BUBBLE);
 		
 		//Add portals		
		var portal_width = 10;
		var portal_height = 80;
		var westPortal = Crafty.e("2D, Canvas, Box2D, Portal")
			.attr({x: 10, y: ACTIVE_HEIGHT/2})
			.box2d({
				bodyType: 'static',
				density: 1.0,
				friction: 10,
				restitution: 0,
				shape:
				[[0,0], [portal_width,0],
				[portal_width, portal_height], [0, portal_height]]
		}).targetRoom("nexRoom");
 		
 		var eastPortal = Crafty.e("2D, Canvas, Box2D, Portal")
			.attr({x: ACTIVE_WIDTH-20, y: ACTIVE_HEIGHT/2})
			.box2d({
				bodyType: 'static',
				density: 1.0,
				friction: 10,
				restitution: 0,
				shape:
				[[0,0], [portal_width,0],
				[portal_width, portal_height], [0, portal_height]]
		}).targetRoom("finalRoom");
 		
 		var mille = Crafty.e("2D, Canvas, Color, Box2D, petrozzaSprite")
 					.color("#0000ff")
 					.attr({
 						x: ACTIVE_WIDTH*0.80,
 						y: 10,
 						w: 160,
 						h: 160		
 					})
 					.box2d({
						bodyType: 'static',
						density : 1.0,
						friction : 2,
						restitution : 0.2,
						shape:
							[[0,0], [160,0],
							[160, ACTIVE_HEIGHT], [0, ACTIVE_HEIGHT]],
						//Filtering data
						categoryBits: 0x0001,
						maskBits: 0xfffd,
						//groupIndex: 0,							
					})
					.onContact("Player", 
								function(data){

									//Show wolf dialog requesting a tribute
                        			shoutBox1.text("Mille: My life feels empty");
                        			shoutBox2.text("...");

									shoutBox1.delay(function(){
										this.text("...");
									}, 5000);
									shoutBox2.delay(function(){
										this.text("...");
									}, 5000);
					})
					.bind("UseItem",function(itemName)
					{
						//shoutBox.text("");
						if(itemName == 'log'){
							shoutBox1.text("Mille: what are you plannig..");
							shoutBox2.text("a bbq?");
						}else if(itemName == 'plank'){
							shoutBox1.text("Mille: hitting this...");
							shoutBox2.text("sounds weird.");
						}else if(itemName == 'guitar'){
							shoutBox1.text("Mille: I feel complete!");
							shoutBox2.text("Go on, brother.");
							this.trigger("DestroyForceField");
						}else{
							//Get random silly quote
							shoutBox1.text("Mille: Agggh...");
							shoutBox2.text("All I see is pain.");
						}
						
					})
					.bind("DestroyForceField", function(){
						world.DestroyBody(this.body);
					});
 		
 		
 		
	 });
	 
	  Crafty.scene("finalRoom", function () {				
 		createRoomWalls();
 		//place player
 		var player =  Crafty.e("Player");
 		
 		//TextBox
 		var textSize = 16,
        	initX = SCREEN_WIDTH*0.1,
            initY = SCREEN_HEIGHT - 40;
 		var shoutBox1 = Crafty.e("2D, Canvas, SpriteText")
 										.attr({x: initX, y: initY, w: 48*textSize, h: textSize})
										.registerFont("BlueBubble", textSize, FONT_BLUE_BUBBLE);
 		
 		var shoutBox2 = Crafty.e("2D, Canvas, SpriteText")
 										.attr({x: initX, y: initY+5+textSize*1, w: 48*textSize, h: textSize})
										.registerFont("BlueBubble", textSize, FONT_BLUE_BUBBLE);
		
		//Add log item
		var prize = Crafty.e("2D, Canvas, Color, Box2D, chest")
 					.color("#00a")
 					.attr({
 						x: ACTIVE_WIDTH*0.8,
 						y: ACTIVE_HEIGHT*0.8,
 						w: 32,
 						h: 32		
 					})
 					.box2d({
						bodyType: 'static',
						density : 1.0,
						friction : 2,
						restitution : 0.2,
						shape:
							[[0,0], [32,0],
							[32, 32], [0, 32]],
						//Filtering data
						categoryBits: 0x0001,
						maskBits: 0xfffd,
						//groupIndex: 0,							
					})
					.onContact("Player", 
								function(data){

									//Add log to player backpack
									var player = data[0].obj;
									//addItemToBackpack('log');
								
                        			shoutBox1.text("You picked the final prize");
                        			shoutBox2.text("Victory is yours!");
                        			
                        		
                        			//Remove log from the map
                        			world.DestroyBody(this.body);
                        			this.destroy();
                        		
					});
		
	 });
	 
}

function createRoomWalls(){
	      var walls = Crafty.e("2D, Canvas, Box2D, Wall")
				.attr({ x: 0, y: 0})
				.box2d({
						bodyType: 'static',
						density : 1.0,
						friction : 10,
						restitution : 0,
						shape: [
									[0, 0],
									[ACTIVE_WIDTH, 0],
									[ACTIVE_WIDTH, 10],
									[0, 10]
								]
						});	
	
		walls.addFixture(
						{
							bodyType: 'static',
							density : 1.0,
							friction : 10,
							restitution : 0,
							shape: [
										[0, 0],
										[10, 0],
										[10, ACTIVE_HEIGHT],
										[0, ACTIVE_HEIGHT]
									]
							
						}
					);
					
		walls.addFixture(
						{
							bodyType: 'static',
							density : 1.0,
							friction : 10,
							restitution : 0,
							shape: [
										[(ACTIVE_WIDTH-10), 0],
										[ACTIVE_WIDTH, 0],
										[ACTIVE_WIDTH, ACTIVE_HEIGHT],
										[(ACTIVE_WIDTH-10), ACTIVE_HEIGHT],
									]
							
						}
					);
					
		walls.addFixture(
						{
							bodyType: 'static',
							density : 1.0,
							friction : 10,
							restitution : 0,
							shape: [
										[0, (ACTIVE_HEIGHT-10)],
										[ACTIVE_WIDTH, (ACTIVE_HEIGHT-10)],
										[ACTIVE_WIDTH, ACTIVE_HEIGHT],
										[0, ACTIVE_HEIGHT],
									]
							
						}
					);  
   
 
    return walls;
}
