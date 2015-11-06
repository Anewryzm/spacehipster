var SpaceHipster = SpaceHipster || {};

// Cargando las assets
SpaceHipster.Preload = function(){};

SpaceHipster.Preload.prototype = {
	preload: function(){
		// mostrando el logo en la página de carga
		this.splash = this.add.sprite(this.game.world.centerX, this.game.world.centerY, 'logo');
		this.splash.anchor.setTo(0.5);
		this.splash.scale.setTo(0.08);

		this.preloadBar = this.add.sprite(this.game.world.centerX, this.game.world.centerY + 128, "preloadbar");
		this.preloadBar.anchor.setTo(0.5);

		this.load.setPreloadSprite(this.preloadBar);

		// load game assets
		// this.load.image("space", "")
	},
	create: function(){
		this.state.start("MainMenu");
	},
};