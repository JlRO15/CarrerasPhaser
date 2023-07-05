var fondo;
var carro;
var cursores;
var enemigos;
var timer;
var puntos;
var txtPuntos;
var vidas;
var txtVidas;
var timerBorrar;
var musicaFondo
var choqueBa;
var choqueCa;

var gasolinas;
var timerGasolina;

var Juego ={
	preload: function(){
		juego.load.image('bg', 'img/bg.png');
		juego.load.image('carro', 'img/carro.png');
		juego.load.image('carroMalo', 'img/carroMalo.png');
		juego.load.image('carroMalo1', 'img/carroMalo1.png');
		juego.load.image('gasolina', 'img/gas.png');
		juego.load.audio('mfondo', 'sounds/land1.mp3');
		juego.load.audio('choqueB', 'sounds/getB.wav');
		juego.load.audio('choqueC', 'sounds/getC.wav');
		juego.forceSingleUpdate=true;
	},

	create: function() {
		fondo = juego.add.tileSprite(0,0,290,540,'bg');

		carro=juego.add.sprite(juego.width/2, 496, 'carro');
		juego.physics.arcade.enable(carro, true);
		carro.enableBody = true;
		carro.anchor.setTo(0.5);

		enemigos = juego.add.group();
		juego.physics.arcade.enable(enemigos, true);
		enemigos.enableBody = true;
		enemigos.createMultiple(20, 'carroMalo');
		enemigos.setAll('anchor.x',0.5);
		enemigos.setAll('anchor.y',0.5);
		enemigos.setAll('checkWorldBounds',true);
		enemigos.setAll('outOfBoundsKill',true);

		gasolinas=juego.add.group();
		juego.physics.arcade.enable(gasolinas, true);
		gasolinas.enableBody=true;
		gasolinas.createMultiple(50, 'gasolina');
		gasolinas.setAll('anchor.x',0.5);
		gasolinas.setAll('anchor.y',0.5);
		gasolinas.setAll('checkWorldBounds',true);
		gasolinas.setAll('outOfBoundsKill',true);

		timer = juego.time.events.loop(1500, this.crearCarroMalo, this);

		timerGasolina=juego.time.events.loop(2000,this.crearGasolina,this);

		cursores = juego.input.keyboard.createCursorKeys();

		puntos=0;
		juego.add.text(20,20,"Puntos: ",{font:"20px Arial", fill:"#FFF"});
		txtPuntos=juego.add.text(90,20, "0",{font:"20px Arial", fill:"#FFF"});

		vidas=3;
		juego.add.text(20,40,"Vidas: ",{font:"20px Arial", fill:"#FFF"});
		txtVidas=juego.add.text(90,40, "3",{font:"20px Arial", fill:"#FFF"});

		musicaFondo = juego.add.audio('mfondo');
		musicaFondo.play();
	},

	update: function() {
		if (puntos >= 5) {
			fondo.tilePosition.y +=5;	
		}
		
		fondo.tilePosition.y +=3;

		if (cursores.right.isDown && carro.position.x<245) 
		{
			carro.position.x +=5;
		}
		else if (cursores.left.isDown && carro.position.x>45) 
		{
			carro.position.x -=5;
		}

		juego.physics.arcade.overlap(carro,gasolinas,this.colisionG,null,this);
		juego.physics.arcade.overlap(carro,enemigos,this.colisionE,null,this);
		
		if (vidas==0) {
			musicaFondo.stop();
			juego.state.start('Terminado');
		}

		
		
		if (puntos == 5) {
            var textoNivel = juego.add.text(juego.width/2, juego.height/2, "¡Nivel 2!", { font: "24px Arial", fill: "red" });
    		textoNivel.anchor.setTo(0.5);
			timerBorrar = juego.time.events.add(1000, function(){
				textoNivel.destroy();
			}, this);
        }

		if (puntos==10) {
			musicaFondo.stop();
			juego.state.start('Ganador');
		}

	},

	crearCarroMalo: function(){
		var posicion = Math.floor(Math.random()*3)+1;
		var enemigo = enemigos.getFirstDead();
		enemigo.physicsBodyType = Phaser.Physics.ARCADE;
		enemigo.reset(posicion*73,0);
		enemigo.anchor.setTo(0.5);
		enemigo.body.velocity.y = 200;

		if (puntos >= 5) {
			enemigo.loadTexture('carroMalo1');
			enemigo.body.velocity.y = 300;	
		}
	},

	crearGasolina: function(){
		var posicion = Math.floor(Math.random()*3)+1;
		var gasolina = gasolinas.getFirstDead();
		gasolina.physicsBodyType = Phaser.Physics.ARCADE;
		gasolina.reset(posicion*73,0);
		gasolina.anchor.setTo(0.5);
		gasolina.body.velocity.y = 200;
		
	},

	colisionG: function(b, m){
		m.kill();
		choqueBa = juego.add.audio('choqueB');
		choqueBa.play();
		puntos++;
		txtPuntos.text = puntos;
	},

	colisionE: function(b, m){
		m.kill();
		choqueCa = juego.add.audio('choqueC');
		choqueCa.play();
		vidas--;
		txtVidas.text = vidas;
	}
}