class Menu extends Phaser.Scene {
    constructor( ) {
        super("Menu");
    }

    

    init ( ){};

    preload(){
        this.load.image('bg', 'assets/menu/menu.png',);

    }

    create( ) {

    bg = this.add.image(0, 0, "bg").setOrigin(-0, -0);



// bouton //
    cursors = this.input.keyboard.createCursorKeys();
    buttonO = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.O); 
    buttonP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.P); 



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
        this.scene.start("Controle");
        this.scene.pause("Menu");
    }
    else (buttonO.isUp)
    {
        controle = true ;
    }

    if (buttonP.isDown && lvlun==true)
        {
         lvlun=false;
        this.scene.start("Lvl1");
        this.scene.pause("Menu");
            }
     if (buttonP.isUp)
    {
        lvlun = true ;
    }
    
    
    }


    }







}