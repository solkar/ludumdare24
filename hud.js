var g_hud = { 
				visible: false,
				backpackBackgrounds: [],
				backpackCounterbacks: [],
				backpackCounters: [],
				startX: 0,
				startY: 0,
};

function initHUD(){
	var pos = jQuery("#cr-stage").aPosition();
	jQuery("#raphHolder").css( { 
		position: "absolute", top: pos.top, left: pos.left, 
		height: jQuery("#cr-stage").height(), 
		width: jQuery("#cr-stage").width(), "z-index": 1000 });
		
	g_hud.raphPaper = Raphael("raphHolder");
	g_hud.mouseCatcher = g_hud.raphPaper.rect(0, 0, SCREEN_WIDTH, SCREEN_HEIGHT)
							.attr( { fill: '#fff', opacity: 0 } );
								
	g_hud.mouseCatcher.click(function (evt) {
		var spell = g_playerProps.spells[g_playerProps.selectedSpell-1];
		if (spell) {
			var ev = jQuery.event.fix(evt);
			var pos = jQuery('#raphHolder').position();
			var craftyX = ev.pageX - pos.left - Crafty.viewport.x - 2;
			var craftyY = ev.pageY - pos.top - Crafty.viewport.y - 2;


			var bolt = Crafty.e('2D, ' + RENDERING_MODE + ', Collision, ' + spell.name)
				.attr( { x: g_elPlayer.x + 64/2, y: g_elPlayer.y + 64/2, z: g_elPlayer.z } )
				.collision();

			var dx = craftyX- 16/2 - bolt.x;
			var dy = craftyY - 16/2 - bolt.y;
			var angle = Math.atan2(dy, dx);

			moveSpell(bolt, SPELLS[spell.name].speed, SPELLS[spell.name].duration, angle);
		}
	});							
								
								
	//Print backpack inventory	
	g_hud.setBackpack = g_hud.raphPaper.set();
	g_hud.startX = 10;
	g_hud.startY = SCREEN_HEIGHT - 2*64 - 10;
	for (var i=0;i<GAME_PROPERTIES.BACKPACK_SLOTS;i++) {
		var elBackground = g_hud.raphPaper.image('./assets/hud/block_sunken.png', g_hud.startX + 64 * (i%5), g_hud.startY + 64 * Math.floor(i/5), 64, 64);
		var elCounterBack = g_hud.raphPaper.rect(elBackground.attrs.x + 64 - 18, elBackground.attrs.y + 64 - 18, 16, 16, 3)
								.attr( { fill: '#eee' } );
		var elCounter = g_hud.raphPaper.text(elCounterBack.attrs.x + elCounterBack.attrs.width/2, elCounterBack.attrs.y + elCounterBack.attrs.height/2, '0')
							.attr( { "font-family": GAME_FONT, "font-size": 11 } );
		g_hud.backpackBackgrounds.push(elBackground);
		g_hud.backpackCounterbacks.push(elCounterBack);
		g_hud.backpackCounters.push(elCounter);
		g_hud.setBackpack.push(elBackground);	
		g_hud.setBackpack.push(elCounterBack);	
		g_hud.setBackpack.push(elCounter);	
	}
	
	
	g_hud.setInvIcons = g_hud.raphPaper.set(); //Map raphael function to hud object
	for (var i=0;i<GAME_PROPERTIES.PLANT_TYPES.length;i++) {
		var icon = g_hud.raphPaper.image('./assets/items/' + GAME_PROPERTIES.PLANT_TYPES[i] + '.png',0, 0, 64, 64)
					.attr( { title: GAME_PROPERTIES.PLANT_TYPES[i] } );
		g_hud['icon_' + GAME_PROPERTIES.PLANT_TYPES[i]] = icon;
		g_hud.setInvIcons.push(icon);
		icon.hide();
		icon.gameProps = {};
		icon.drag(
			function(dx, dy) {		// dragging
				this.attr( { x: this.ox + dx, y: this.oy + dy } );
			},
			function() {			// start drag
				this.toFront();
				this.ox = this.attrs.x;
				this.oy = this.attrs.y;
			},
			function() {			// end drag
				for (var j=0;j<g_hud.backpackBackgrounds.length;j++) {
					var bbox = g_hud.backpackBackgrounds[j].getBBox();
					if (Raphael.isPointInsideBBox(bbox, this.attrs.x + this.attrs.width/2, this.attrs.y + this.attrs.height/2)) {
						if (!g_playerProps.backpack[j]) {
							g_playerProps.backpack[j] = g_playerProps[this.gameProps.loc][this.gameProps.slot];
							g_playerProps[this.gameProps.loc][this.gameProps.slot] = undefined;
							this.gameProps.loc = 'backpack';
							this.gameProps.slot = j;
							this.attr( { x: bbox.x, y: bbox.y } );
							reOrderBackpack();
							return;
						}
					}
				}

				this.attr( { x: this.ox, y: this.oy } );
			}
		);
	}

	g_hud.itemHighlight = g_hud.raphPaper.rect(g_hud.startX + 64*1, g_hud.startY,64, 64,2).attr( { stroke: '#ff0' });


	//g_hud.setBackpack.hide();
	g_hud.visible = true;
	g_hud.setBackpack.attr( { opacity: 1.0 });

			
}

// fix for Webkit browsers too fast
jQuery.fn.aPosition = function() {
    thisLeft = this.offset().left;
    thisTop = this.offset().top;
    thisParent = this.parent();

    parentLeft = thisParent.offset().left;
    parentTop = thisParent.offset().top;

    return {
        left: thisLeft-parentLeft,
        top: thisTop-parentTop
    };
};

function reOrderBackpack() {


	for (var i=0;i<GAME_PROPERTIES.BACKPACK_SLOTS;i++) {
		if (g_playerProps.backpack[i]) {
			var icon = g_hud['icon_' + g_playerProps.backpack[i].plantType];
			icon.attr( { x: g_hud.backpackBackgrounds[i].attrs.x, y: g_hud.backpackBackgrounds[i].attrs.y } );
			icon.gameProps.loc = 'backpack';
			icon.gameProps.slot = i;
			g_hud.setBackpack.push(icon);
			g_hud.backpackCounters[i].attr( { text: g_playerProps.backpack[i].count } );
			if (g_hud.visible)
				icon.show();
			else
				icon.hide();
		}
		else {
			g_hud.backpackCounters[i].attr( { text: '0' } );			
		}
	}
}
