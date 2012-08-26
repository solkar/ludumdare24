function initCraftyComponents(){
	console.log("Load crafty components");
	
	Crafty.c("PlayerControls", {
		init: function() {
		  this.requires("Keyboard");		  
		  return this.speed = 3;
		},
		playerControls: function(speed) {			
		  if (speed) {
			this.speed = speed;
		  }
		  this.bind("EnterFrame", function() {			
			if (this.disableControls) {
			  return;
			}
			var dx = 0;
			var dy = 0;
			
			if (this.isDown("D")) {
			  //this.x += this.speed;
			  dx = this.speed;
			}
			if (this.isDown("A")) {
			  //this.x -= this.speed;
			  dx = -1 * this.speed;
			}
			if (this.isDown("S")) {
			  //this.x += this.speed;
			  dy = this.speed;
			}
			if (this.isDown("W")) {
			  //this.x -= this.speed;
			  dy = -1 * this.speed;
			}
			
			if (dx !== 0 || dy !== 0) {
			  return this.body.ApplyImpulse(new b2Vec2(dx/PTM_RATIO, dy/PTM_RATIO), this.body.GetWorldCenter());			  
			}
		  });
		  return this;
		}
	  });//end_of_componet PLAYER CONTROLS
	
	
	Crafty.c("Player", {
		_spawnX: ACTIVE_WIDTH*0.5,
		_spawnY: ACTIVE_HEIGHT*0.5,
		init: function(){
			this.addComponent("2D, Canvas, Color, Box2D, Keyboard, PlayerControls")
			.playerControls(5)
			//.origin("center")
			.color("#fff")
			.attr({ 
				x: ACTIVE_WIDTH*0.5, 
				y: ACTIVE_HEIGHT*0.5, 
				h: 64, 
				w: 64
			})
			.box2d({
					bodyType: 'dynamic',
					density : 1.0,
					friction : 2,
					restitution : 0.2,
					shape: 'circle',
					//Filtering data
					categoryBits: 0x0001,
					maskBits: 0xfffd,
					//groupIndex: 0,							
			})
			.bind("EnterFrame",function() {
							var maxSpeed = 10;							
 
							var velocity = this.body.GetLinearVelocity();
							var speed = velocity.Length();							
							if (speed > maxSpeed) {
								this.body.SetLinearDamping(5.0);
							} else if (speed < maxSpeed) {
								this.body.SetLinearDamping(0.5);
							}
				})
				.onContact("Portal", 
								function(data){

									destroyAllBodies();
									//Get the name of the new room from the Portal object
									var portal = data[0].obj;		
									console.log("Move to room:"+portal.nextRoom);							
									Crafty.scene(portal.nextRoom);
				})
				.bind('KeyDown', function(e) {
						if (e.keyCode == Crafty.keys['1']) {
							g_hud.itemHighlight.attr( { x: g_hud.startX + 64*0 } );
							g_playerProps.selectedItem = 0;
							evolveItem(g_playerProps.selectedItem);
						}
						else if (e.keyCode == Crafty.keys['2']) {
							g_hud.itemHighlight.attr( { x: g_hud.startX  + 64*1 } );
							g_playerProps.selectedItem = 1;
							evolveItem(g_playerProps.selectedItem);
						}
						else if (e.keyCode == Crafty.keys['3']) {
							g_hud.itemHighlight.attr( { x: g_hud.startX  + 64*2 } );
							g_playerProps.selectedItem = 2;
							evolveItem(g_playerProps.selectedItem);
						}
						else if (e.keyCode == Crafty.keys['4']) {
							g_hud.itemHighlight.attr( { x: g_hud.startX  + 64*3 } );
							g_playerProps.selectedItem = 3;
							evolveItem(g_playerProps.selectedItem);
						}
						else if (e.keyCode == Crafty.keys['5']) {
							g_hud.itemHighlight.attr( { x: g_hud.startX  + 64*4 } );
							g_playerProps.selectedItem = 4;
							evolveItem(g_playerProps.selectedItem);
						}
						else if(e.keyCode == Crafty.keys['SPACE']){
							//Trigger "UseItem" event
							//Crafty.trigger("UseItem",'wool');
							Crafty.trigger("UseItem",g_playerProps.backpack[g_playerProps.selectedItem].itemType);
						}
					
						
				});
	}});//end_of_component Player
		
		
	Crafty.c("Chamber", {	
		init: function(){
			this.addComponent("2D, Canvas, Color, Box2D")
			.color("#ff0000")
			.attr({ 		
 				x: ACTIVE_WIDTH*0.25,
 				y: ACTIVE_HEIGHT*0.25,
				h: 64, 
				w: 64
			})
			.box2d({
					bodyType: 'static',
					density : 1.0,
					friction : 2,
					restitution : 0.2,
					shape: 'box',
					//Filtering data
					//categoryBits: 0x0001,
					//maskBits: 0xfffd,
					//groupIndex: 0,							
			})

		}
	});//end_of_component Chamber
	
	Crafty.c("Portal",{
		nextRoom: "undeterminedRoom",
		targetRoom: function(room) {	
			this.nextRoom = room;
		 },
		   
	});//end_of_component Portal
	
	Crafty.c("ShoutBox",{
		printShoutBox: function(text)
		{
			this.text = text;
			
			var textSize = 16,
        	initX = 250,
            initY = 36;
            var component;
                        			
			for(var i=0;i<this.text.length;i++){
				component = Crafty.e("2D, Canvas, SpriteText")
			 	.attr({x: initX, y: initY+5+i*textSize, w: this.text[i].length*textSize, h: textSize})
				.registerFont("BlueBubble", textSize, FONT_BLUE_BUBBLE)
				.text(this.text[i])
				.delay(function() {
	             	//this.text("...");
					}, 2000)
						
			}
			
			return component;
		}
	});
}

destroyAllBodies = function()
{
	for(var b = world.GetBodyList(); b; b=b.GetNext()) {    
				world.DestroyBody(b);								
	}
}
