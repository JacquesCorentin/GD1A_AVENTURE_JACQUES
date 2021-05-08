class Controle extends Phaser.Scene {
    constructor( ) {
        super("Controle");
    }

    

    init ( ){};

    preload(){
        this.load.image('controle', 'assets/menu/option.png',);

    }

    create( ) {

    bg = this.add.image(0, 0, "controle").setOrigin(0, 0);



// bouton //
    cursors = this.input.keyboard.createCursorKeys();
    buttonP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.P);
    buttonO = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.O);  



    }
    update( ){


//Controles // 
this.input.gamepad.once('connected', function (pad){
    paddleConnected=true;
    paddle=pad;
    bg.setVisible(false);
});

if (paddleConnected==true){
      //Inventaire 
      if (paddle.A && lvlun==true)
      {
        lvlun=false;
            this.scene.start("Lvl1");
            this.scene.pause("Menu");

      }
      if (paddle.A==false)
      {
          scene = true ;
      }
    }
//Controle Clavier 
else {
    //Inventaire 
    if (buttonO.isDown && controle==true)
    {
        controle=false;
        this.scene.start("Menu");
        this.scene.pause("Controle");
    }
    if (buttonO.isUp)
    {
        controle = true ;
    }


    }
}
}