var boton;

var Menu = {
    
    preload: function(){
        juego.stage.backgroundColor = "009900";
        juego.load.image('botons', 'img/boton.png');
    },
    
    create: function(){
        
  		boton = this.add.button(juego.width/2, juego.height/2, 'botons', 
            this.iniciarJuego, this);
        boton.anchor.setTo(0.5);
        boton.scale.setTo(0.5,0.5);

        var txtTitle =juego.add.text(juego.width/2, juego.height/2-100, 
            "Speed Racer", {font:"30px Arial", fill:"#FFF", aling: "center"});
        txtTitle.anchor.setTo(0.5);
    },

    iniciarJuego: function(){
        this.state.start('Juego');
    }
    
   
};