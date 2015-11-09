var SpaceHipster = SpaceHipster || {};
// title screen

SpaceHipster.Game = function() {};

SpaceHipster.Game.prototype = {
	create: function(){
		// configuramos las dimensiones de nuestro juego
		this.game.world.setBounds(0,0,1920,1920);

		// generamos la repetición del sprite
		this.background = this.game.add.tileSprite(0,0, this.game.world.width, this.game.world.height, "space");

		// create player
		this.player = this.game.add.sprite(this.game.world.centerX, this.game.world.centerY, "playership");
		this.player.scale.setTo(2);

		this.player.animations.add("fly", [0,1,2,3], 5, true);
		this.player.animations.play("fly");
		
		// the camera will follow the player in the world
		this.game.camera.follow(this.player);

		this.generateAsteroids();

		// initial score
		this.playerScore = 0;

		// enable the physics
		this.game.physics.arcade.enable(this.player);
		this.playerSpeed = 120;
		this.player.body.collideWorldBounds= true;

		// sounds
		this.explosionSound = this.game.add.audio("explosion");
		this.collectSound = this.game.add.audio("collect");


	},
	update: function(){
		if (this.game.input.activePointer.justPressed()) {
			// move on direction of the input
			this.game.physics.arcade.moveToPointer(this.player, this.playerSpeed);
		};
			// colisión entre el jugador y los asteroides
			this.game.physics.arcade.collide(this.player, this.asteroids, this.hitAsteroid, null, this);
	},
	generateAsteroids: function (){
		this.asteroids = this.game.add.group();

		// activando la física para los asteroides
		this.asteroids.enableBody = true;
		this.asteroids.physicsBodyType = Phaser.Physics.ARCADE;

		// phaser's random number generator
		var numAsteroids = this.game.rnd.integerInRange(150,200);
		var asteroid;

		for(var i = 0; i < numAsteroids; i++){
			// add sprite
			asteroid = this.asteroids.create(this.game.world.randomX, this.game.world.randomY, "rock");
			asteroid.scale.setTo(this.game.rnd.integerInRange(10,40)/10);
			
			// physics properties
			asteroid.body.velocity.x = this.game.rnd.integerInRange(-20,20);
			asteroid.body.velocity.y = this.game.rnd.integerInRange(-20,20);
			asteroid.body.immovable = true;
			asteroid.body.collideWorldBounds = true;
		};
	},
	hitAsteroid: function(player, asteroid){
		// reproduccion del sonido
		this.explosionSound.play();

		// Hacemos explotar al jugador
		var emitter = this.game.add.emitter(this.player.x, this.player.y, 100);
		emitter.makeParticles("playerParticle");
		emitter.minParticleSpeed.setTo(-200,-200);
		emitter.maxParticleSpeed.setTo(200,200);
		emitter.gravity=0;
		emitter.start(true, 1000, null,100);

		// destruimos al jugador
		this.player.kill();

		this.game.time.events.add(800, this.gameOver,this);
	},
};