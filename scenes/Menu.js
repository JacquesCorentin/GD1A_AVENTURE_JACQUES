class Menu extends Phaser.Scene {
    constructor( ) {
        super("Menu");
    }

    

    init ( ){};

    preload(){
        this.load.image('bg', 'assets/menu/menu.jpg',);

    }

    create( ) {

    bg = this.add.image(0, 0, "bg").setOrigin(-0, -0);



// bouton //
    cursors = this.input.keyboard.createCursorKeys();
    buttonI = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.I); 



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
    if (buttonI.isDown && lvlun==true)
    {
        lvlun=false;
        this.scene.start("Lvl1");
        this.scene.pause("Menu");
    }
    if (buttonI.isUp)
    {
        lvlun = true ;
    }


    }
}
}