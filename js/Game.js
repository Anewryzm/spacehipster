var SpaceHipster = SpaceHipster || {};
// title screen

SpaceHipster.Game = function() {};

SpaceHipster.Game.prototype = {
	create: function(){
		// configuramos las dimensiones de nuestro juego
		this.game.world.setBounds(0,0,1920,1920);

		// generamos la repetición del sprite
		this.background = this.game.add.tileSprite(0,0, this.game.width, this.game.height, "space");

		// create player
		this.player = this.game.add.sprite(this.game.world.centerX, this.game.world.centerY, "playership");
		this.player.scale.setTo(2);

		this.player.animations.add("fly", [0,1,2,3], 5, true);
		this.player.animations.play("fly");
		
		// the camera will follow the player in the world
		this.game.camera.follow(this.player);

		// initial score
		this.playerScore = 0;

		// enable the physics
		this.game.physics.arcade.enable(this.player);
		this.playerSpeed = 120;
		this.player.body.collideWorldBounds= true;


	},
	update: function(){
		if (this.game.input.activePointer.justPressed()) {
			// move on direction of the input
			this.game.physics.arcade.moveToPointer(this.player, this.playerSpeed);
		};
	},
};