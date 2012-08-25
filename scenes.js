function initScenes(){
	console.log("Load scenes");
	
	Crafty.scene("main", function () {				
 		createRoomWalls();
 		
 		//Add portals
 		var portal_width = 10;
		var portal_height = 80;
		var westPortal = Crafty.e("2D, Canvas, Box2D, Portal")
			.attr({x: 10, y: 200})
			.box2d({
				bodyType: 'static',
				density: 1.0,
				friction: 10,
				restitution: 0,
				shape:
				[[0,0], [portal_width,0],
				[portal_width, portal_height], [0, portal_height]]
		})
		.targetRoom("dummyRoom");
 		
 		//place player
 		var player =  Crafty.e("Player")
 						.attr({ 
								x: SCREEN_WIDTH/2, 
								y: SCREEN_HEIGHT/2
							});
 		
 		//Place gun charge chamber
 		var chamber = Crafty.e("Chamber")
 						.attr({
 							x: SCREEN_WIDTH*0.25,
 							y: SCREEN_HEIGHT*0.25
 						});
 		
	 });
	 
	 Crafty.scene("dummyRoom", function () {				
 		createRoomWalls();
 		
 		//Add portals
 		var portal_width = 80;
		var portal_height = 10;
		var southPortal = Crafty.e("2D, Canvas, Box2D, Portal")
			.attr({x: SCREEN_WIDTH/2, y: 10})
			.box2d({
				bodyType: 'static',
				density: 1.0,
				friction: 10,
				restitution: 0,
				shape:
				[[0,0], [portal_width,0],
				[portal_width, portal_height], [0, portal_height]]
		})
		.targetRoom("anotherRoom");
 		
 		//place player
 		var player =  Crafty.e("Player")
 						.attr({ 
								x: SCREEN_WIDTH/2, 
								y: SCREEN_HEIGHT/2
							});
 		
 		//Place gun charge chamber
 		
 		
	 });
	 
	  Crafty.scene("anotherRoom", function () {				
 		createRoomWalls();
 		
 		//Add portals
 		var portal_width = 80;
		var portal_height = 10;
		var southPortal = Crafty.e("2D, Canvas, Box2D, Portal")
			.attr({x: SCREEN_WIDTH/2, y: SCREEN_HEIGHT-20})
			.box2d({
				bodyType: 'static',
				density: 1.0,
				friction: 10,
				restitution: 0,
				shape:
				[[0,0], [portal_width,0],
				[portal_width, portal_height], [0, portal_height]]
		})
 		
 		//place player
 		var player =  Crafty.e("Player")
 						.attr({ 
								x: SCREEN_WIDTH-30, 
								y: SCREEN_HEIGHT/2
							});
 		
 		//Place gun charge chamber
 		
 		
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
									[SCREEN_WIDTH, 0],
									[SCREEN_WIDTH, 10],
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
										[10, SCREEN_HEIGHT],
										[0, SCREEN_HEIGHT]
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
										[(SCREEN_WIDTH-10), 0],
										[SCREEN_WIDTH, 0],
										[SCREEN_WIDTH, SCREEN_HEIGHT],
										[(SCREEN_WIDTH-10), SCREEN_HEIGHT],
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
										[0, (SCREEN_HEIGHT-10)],
										[SCREEN_WIDTH, (SCREEN_HEIGHT-10)],
										[SCREEN_WIDTH, SCREEN_HEIGHT],
										[0, SCREEN_HEIGHT],
									]
							
						}
					);  
   
 
    return walls;
}
